import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import type { SaleSlide } from '@/components/SalesCarousel'
import { SalesCarouselWrapper } from '@/components/SalesCarousel/Wrapper.client'
import { Section } from '@/components/Section'
import { DiscountIcon } from '@/components/icons/offers/DiscountIcon'
import { PaymentIcon } from '@/components/icons/offers/PaymentIcon'
import { WarehouseIcon } from '@/components/icons/offers/WarehouseIcon'
import { PeopleIcon } from '@/components/icons/offers/PeopleIcon'
import React from 'react'

type Offer = {
  title: string
  icon: React.ReactNode
}

const defaultSlides: SaleSlide[] = [
  {
    id: 'sale-1',
    imageUrl: '/images/sale-banner-1.svg',
    imageAlt: 'Акція тижня',
    href: '/shop',
  },
  {
    id: 'sale-2',
    imageUrl: '/images/sale-banner-2.svg',
    imageAlt: 'Оптові умови для партнерів',
    href: '/shop',
  },
  {
    id: 'sale-3',
    imageUrl: '/images/sale-banner-3.svg',
    imageAlt: 'Новинки на складі',
    href: '/shop',
  },
]

const offers: Offer[] = [
  {
    title: 'Лояльні ціни та гнучка система знижок для постійних клієнтів',
    icon: <DiscountIcon className="w-full h-full" />,
  },
  {
    title: 'Відстрочка платежу для партнерів',
    icon: <PaymentIcon className="w-full h-full" />,
  },
  {
    title: 'Широкий асортимент продукції на складі',
    icon: <WarehouseIcon className="w-full h-full" />,
  },
  {
    title: 'Індивідуальний підхід до кожного замовлення',
    icon: <PeopleIcon className="w-full h-full" />,
  },
]

export function HomeSales() {
  return (
    <Section id="offers" aria-labelledby="home-offers-title">
      <Container>
        <InnerSection>
          <div className="grid gap-layout-gap-2">
            <header>
              <h2 id="home-offers-title">Акції і пропозиції</h2>
            </header>

            <SalesCarouselWrapper slides={defaultSlides} />

           
          </div>
        </InnerSection>
      </Container>
      <div className="p-layout-gap-3 bg-sys-accent">
        <Container>
              <ul className="list-none m-0 p-0 grid gap-layout-gap-2 md:grid-cols-2  lg:grid-cols-4">
                {offers.map((offer) => (
                  <li key={offer.title} className="min-w-0">
                    <article className="relative box-border min-w-0 bg-sys-surface rounded-xl p-space-20 md:p-space-30 min-h-fit h-full">
                      <h2
                        className={[
                          'm-0 text-sys-accent',
                          // Allow the title to fully wrap (no clamping), even in flex row layout.
                          'box-border min-w-0 max-w-full',
                          'whitespace-normal wrap-break-word',
                          // Reserve space so text "responds" to the bottom-right icon.
                          'pr-[88px] md:pr-[96px]',
                          'pb-[36px] md:pb-[44px]',
                        ].join(' ')}
                      >
                        {offer.title}
                      </h2>

                      <div
                        aria-hidden="true"
                        className={[
                          // Always bottom-right and consistent visual size.
                          'absolute right-[20px] bottom-[20px] md:right-[30px] md:bottom-[30px]',
                          'w-[52px] h-[52px]',
                          'text-sys-accent',
                        ].join(' ')}
                      >
                        {offer.icon}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
              </Container>
            </div>
    </Section>
  )
}

