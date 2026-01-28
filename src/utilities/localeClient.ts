import type { AppLocale } from '@/utilities/locale'

const LOCALE_COOKIE_NAME = 'pobut_locale'

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined

  const cookies = document.cookie ? document.cookie.split('; ') : []
  for (const cookie of cookies) {
    const eqIndex = cookie.indexOf('=')
    const key = eqIndex >= 0 ? cookie.slice(0, eqIndex) : cookie
    if (key === name) {
      const value = eqIndex >= 0 ? cookie.slice(eqIndex + 1) : ''
      try {
        return decodeURIComponent(value)
      } catch {
        return value
      }
    }
  }

  return undefined
}

export function getClientLocale(): AppLocale {
  const raw = readCookie(LOCALE_COOKIE_NAME)
  if (raw === 'ru') return 'ru'
  return 'ua'
}
