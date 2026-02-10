import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function safeRedirectPath(value: string | null) {
  if (!value) return '/account'
  if (value.startsWith('/')) return value
  return '/account'
}

function getRequestOrigin(req: NextRequest) {
  const forwardedProto = req.headers.get('x-forwarded-proto')
  const forwardedHost = req.headers.get('x-forwarded-host')

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`
  }

  return req.nextUrl.origin
}

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID

  if (!clientId) {
    return NextResponse.redirect(new URL('/login?error=google_oauth_env', req.url))
  }

  const baseURL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    getRequestOrigin(req)

  const url = new URL(req.url)
  const redirect = safeRedirectPath(url.searchParams.get('redirect'))

  const state = crypto.randomUUID()
  const redirectURI = `${baseURL}/api/auth/google/callback`

  const authURL = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  authURL.searchParams.set('client_id', clientId)
  authURL.searchParams.set('redirect_uri', redirectURI)
  authURL.searchParams.set('response_type', 'code')
  authURL.searchParams.set('scope', 'openid email profile')
  authURL.searchParams.set('state', state)
  authURL.searchParams.set('access_type', 'offline')
  authURL.searchParams.set('prompt', 'select_account')

  const res = NextResponse.redirect(authURL)

  const secure = process.env.NODE_ENV === 'production'
  const domain = process.env.AUTH_COOKIE_DOMAIN || undefined

  res.cookies.set('google_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    domain,
    path: '/',
    maxAge: 60 * 10,
  })

  res.cookies.set('google_oauth_redirect', redirect, {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    domain,
    path: '/',
    maxAge: 60 * 10,
  })

  return res
}
