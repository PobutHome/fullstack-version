import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'

import { CheckoutClient } from './CheckoutClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Checkout() {
  return (
    <Section aria-labelledby="checkout-page-title" className="pb-space-50">
      <Container>
        <InnerSection className="grid gap-space-20">
          {(!process.env.LIQPAY_PUBLIC_KEY || !process.env.LIQPAY_PRIVATE_KEY) && (
            <div className="px-4 py-3 text-sm">
              {'Щоб увімкнути оплату через LiqPay, додайте у env змінні '}
              <code>LIQPAY_PUBLIC_KEY</code>
              {' та '}
              <code>LIQPAY_PRIVATE_KEY</code>
              {'.'}
            </div>
          )}

          <h1 id="checkout-page-title" className="sr-only">
            Checkout
          </h1>

          <CheckoutClient />
        </InnerSection>
      </Container>
    </Section>
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
