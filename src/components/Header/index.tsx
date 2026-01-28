import { HeaderClient } from './index.client'

import { getRequestLocale } from '@/utilities/locale'

export async function Header() {
  const locale = await getRequestLocale()

  return <HeaderClient locale={locale} />
}
