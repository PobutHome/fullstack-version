'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { LOCALE_COOKIE_NAME, normalizeLocale } from '@/utilities/locale'

export async function setLocaleAction(formData: FormData) {
  const locale = normalizeLocale(formData.get('locale'))
  const redirectTo = (formData.get('redirectTo') as string | null) || '/'

  const cookieStore = await cookies()

  cookieStore.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  redirect(redirectTo)
}
