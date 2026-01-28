import { Cart as CartType } from '@/payload-types'
import type { AppLocale } from '@/utilities/locale'
import { CartModal } from './CartModal'

export type CartItem = NonNullable<CartType['items']>[number]

export function Cart({ locale }: { locale?: AppLocale }) {
  return <CartModal locale={locale} />
}
