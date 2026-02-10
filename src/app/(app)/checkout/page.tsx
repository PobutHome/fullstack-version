import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { CheckoutPage } from '@/components/checkout/CheckoutPage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Checkout() {
  return (
    <>
      {(!process.env.LIQPAY_PUBLIC_KEY || !process.env.LIQPAY_PRIVATE_KEY) && (
        <div className="px-4 py-3 text-sm">
          {'Щоб увімкнути оплату через LiqPay, додайте у env змінні '}
          <code>LIQPAY_PUBLIC_KEY</code>
          {' та '}
          <code>LIQPAY_PRIVATE_KEY</code>
          {'.'}
        </div>
      )}

      <h1 className="sr-only">Checkout</h1>

      <CheckoutPage />
    </>
  )
}

export const metadata: Metadata = {
  description: 'Checkout.',
  openGraph: mergeOpenGraph({
    title: 'Checkout',
    url: '/checkout',
  }),
  title: 'Checkout',
}
