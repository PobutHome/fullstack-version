import { cookies } from 'next/headers'

export type AppLocale = 'ua' | 'ru'

export const DEFAULT_LOCALE: AppLocale = 'ua'
export const LOCALE_COOKIE_NAME = 'pobut_locale'

export function normalizeLocale(value: unknown): AppLocale {
  if (value === 'ru') return 'ru'
  if (value === 'ua') return 'ua'

  // Common variants
  if (value === 'uk' || value === 'uk-UA' || value === 'ua-UA') return 'ua'
  if (value === 'ru-RU') return 'ru'

  return DEFAULT_LOCALE
}

export async function getRequestLocale(): Promise<AppLocale> {
  const cookieStore = await cookies()

  const raw =
    cookieStore.get(LOCALE_COOKIE_NAME)?.value ??
    cookieStore.get('locale')?.value ??
    cookieStore.get('NEXT_LOCALE')?.value ??
    cookieStore.get('lng')?.value

  return normalizeLocale(raw)
}

export function toHtmlLang(locale: AppLocale): 'uk' | 'ru' {
  return locale === 'ru' ? 'ru' : 'uk'
}
