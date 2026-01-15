import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type GoogleUserInfo = {
  sub: string
  email?: string
  email_verified?: boolean
  name?: string
}

type UserSession = {
  id: string
  createdAt?: unknown
  expiresAt: unknown
}

type UserDoc = Record<string, unknown> & {
  id: string
  email?: string
  googleId?: string | null
  sessions?: UserSession[] | null
  updatedAt?: unknown
}

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function signHS256JWT(args: { payload: Record<string, unknown>; secret: string }) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = base64url(JSON.stringify(header))
  const encodedPayload = base64url(JSON.stringify(args.payload))
  const data = `${encodedHeader}.${encodedPayload}`
  const signature = crypto.createHmac('sha256', args.secret).update(data).digest()
  return `${data}.${base64url(signature)}`
}

function safeRedirectPath(value: string | null) {
  if (!value) return '/account'
  if (value.startsWith('/')) return value
  return '/account'
}

function removeExpiredSessions<T extends { expiresAt?: unknown }>(sessions?: T[] | null) {
  const now = new Date()
  return (sessions || []).filter((s) => {
    const rawExpiresAt = s?.expiresAt
    const expiresAt = rawExpiresAt instanceof Date ? rawExpiresAt : new Date(String(rawExpiresAt))
    return expiresAt > now
  })
}

async function exchangeCodeForTokens(args: {
  code: string
  redirectURI: string
  clientId: string
  clientSecret: string
}) {
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: args.code,
      client_id: args.clientId,
      client_secret: args.clientSecret,
      redirect_uri: args.redirectURI,
      grant_type: 'authorization_code',
    }),
  })

  if (!tokenRes.ok) {
    const body = await tokenRes.text().catch(() => '')
    throw new Error(`Google token exchange failed: ${tokenRes.status} ${body}`)
  }

  const tokenJSON = (await tokenRes.json()) as {
    access_token?: string
    id_token?: string
    expires_in?: number
    token_type?: string
    scope?: string
  }

  if (!tokenJSON.access_token) {
    throw new Error('Google token exchange did not return access_token')
  }

  return {
    ...tokenJSON,
    access_token: tokenJSON.access_token,
  } as { access_token: string } & typeof tokenJSON
}

async function fetchUserInfo(accessToken: string) {
  const userRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  if (!userRes.ok) {
    const body = await userRes.text().catch(() => '')
    throw new Error(`Google userinfo failed: ${userRes.status} ${body}`)
  }

  return (await userRes.json()) as GoogleUserInfo
}

export async function GET(req: NextRequest) {
  const stateQuery = req.nextUrl.searchParams.get('state')
  const code = req.nextUrl.searchParams.get('code')

  const stateCookie = req.cookies.get('google_oauth_state')?.value
  const redirectCookie = req.cookies.get('google_oauth_redirect')?.value

  const redirectTo = safeRedirectPath(redirectCookie || req.nextUrl.searchParams.get('redirect'))

  if (!code || !stateQuery || !stateCookie || stateQuery !== stateCookie) {
    return NextResponse.redirect(new URL(`/login?error=google_oauth`, req.url))
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/login?error=google_oauth_env', req.url))
  }

  const redirectURI = `${req.nextUrl.origin}/api/auth/google/callback`

  try {
    const tokens = await exchangeCodeForTokens({
      code,
      redirectURI,
      clientId,
      clientSecret,
    })

    const userInfo = await fetchUserInfo(tokens.access_token)

    if (!userInfo.sub) {
      throw new Error('Google userinfo missing sub')
    }

    const email = (userInfo.email || '').toLowerCase().trim()

    if (!email) {
      throw new Error('Google account has no email')
    }

    if (userInfo.email_verified === false) {
      throw new Error('Google email is not verified')
    }

    const payload = await getPayload({ config })

    const payloadReq = await createLocalReq(
      {
        req: {
          headers: req.headers,
        },
      },
      payload,
    )

    // Find user (prefer googleId, fallback to email)
    const existingByGoogle = await payload.db.findOne<UserDoc>({
      collection: 'users',
      req: payloadReq,
      where: { googleId: { equals: userInfo.sub } },
    })

    const existingByEmail =
      existingByGoogle ||
      (await payload.db.findOne<UserDoc>({
        collection: 'users',
        req: payloadReq,
        where: { email: { equals: email } },
      }))

    let userID: string | number

    if (existingByEmail) {
      userID = existingByEmail.id

      if (!existingByEmail.googleId) {
        await payload.update({
          collection: 'users',
          id: existingByEmail.id,
          data: {
            googleId: userInfo.sub,
          },
          overrideAccess: true,
          req: payloadReq,
        })
      }
    } else {
      const password = crypto.randomBytes(32).toString('hex')

      const created = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          name: userInfo.name || email,
          roles: ['customer'],
          googleId: userInfo.sub,
        },
        overrideAccess: true,
        req: payloadReq,
      })

      userID = created.id
    }

    // Load raw doc (including sessions), add a session, then sign a JWT with sid.
    const userDoc = await payload.db.findOne<UserDoc>({
      collection: 'users',
      req: payloadReq,
      where: { id: { equals: userID } },
    })

    if (!userDoc) {
      throw new Error('Failed to load user after upsert')
    }

    const usersCollection = payload.collections['users']
    const tokenExpiration = usersCollection.config.auth?.tokenExpiration || 1209600

    const sid = crypto.randomUUID()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + tokenExpiration * 1000)

    const nextSessions = removeExpiredSessions(userDoc.sessions)
    nextSessions.push({ id: sid, createdAt: now, expiresAt })

    await payload.db.updateOne({
      id: userDoc.id,
      collection: 'users',
      data: {
        ...userDoc,
        sessions: nextSessions,
        updatedAt: null,
      },
      req: payloadReq,
      returning: false,
    })

    const issuedAt = Math.floor(Date.now() / 1000)
    const exp = issuedAt + tokenExpiration

    const token = signHS256JWT({
      secret: payload.secret,
      payload: {
        id: userDoc.id,
        collection: 'users',
        email,
        sid,
        iat: issuedAt,
        exp,
      },
    })

    const cookiePrefix = payload.config.cookiePrefix || 'payload'

    const res = NextResponse.redirect(new URL(redirectTo, req.url))

    // Prefer Next's cookie API to ensure Set-Cookie is correctly emitted on redirects.
    const expires = new Date(Date.now() + tokenExpiration * 1000)
    const rawSameSite = usersCollection.config.auth?.cookies?.sameSite
    const sameSite =
      typeof rawSameSite === 'string'
        ? rawSameSite.toLowerCase()
        : rawSameSite
          ? 'strict'
          : 'lax'

    const secure =
      Boolean(usersCollection.config.auth?.cookies?.secure) ||
      sameSite === 'none' ||
      process.env.NODE_ENV === 'production'

    res.cookies.set(`${cookiePrefix}-token`, token, {
      httpOnly: true,
      path: '/',
      expires,
      sameSite: sameSite as 'lax' | 'strict' | 'none',
      secure,
      domain: usersCollection.config.auth?.cookies?.domain || undefined,
    })

    // Cleanup temporary OAuth cookies
    res.cookies.set('google_oauth_state', '', { path: '/', maxAge: 0 })
    res.cookies.set('google_oauth_redirect', '', { path: '/', maxAge: 0 })

    return res
  } catch (_err) {
    return NextResponse.redirect(new URL(`/login?error=google_oauth`, req.url))
  }
}
