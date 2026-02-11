import { LOCALE_COOKIE_NAME, normalizeLocale } from '@/utilities/locale'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs'

async function getLocaleFromCookies(): Promise<'ua' | 'ru'> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(LOCALE_COOKIE_NAME)?.value
  return normalizeLocale(raw)
}

async function proxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const locale = await getLocaleFromCookies()

  const resolvedParams = await context.params
  const path = Array.isArray(resolvedParams.path) ? resolvedParams.path : []
  const targetURL = new URL(`/api/${path.join('/')}`, request.nextUrl.origin)

  request.nextUrl.searchParams.forEach((value, key) => {
    targetURL.searchParams.set(key, value)
  })

  // Ensure Payload localization is applied for relationship/populated fields.
  if (!targetURL.searchParams.has('locale')) {
    targetURL.searchParams.set('locale', locale)
  }

  const headers = new Headers(request.headers)

  // Avoid leaking hop-by-hop headers.
  headers.delete('host')
  headers.delete('content-length')

  // Forward cookies explicitly (Next's fetch won't automatically forward).
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) headers.set('cookie', cookieHeader)

  const method = request.method.toUpperCase()
  const hasBody = method !== 'GET' && method !== 'HEAD'

  const body = hasBody ? await request.arrayBuffer() : undefined

  const response = await fetch(targetURL, {
    method,
    headers,
    body,
    cache: 'no-store',
    redirect: 'manual',
  })

  // Stream through response as-is.
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  })
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context)
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context)
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context)
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context)
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context)
}
