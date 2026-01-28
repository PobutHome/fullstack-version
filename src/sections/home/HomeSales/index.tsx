import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import type { SaleSlide } from '@/components/SalesCarousel'
import { SalesCarouselWrapper } from '@/components/SalesCarousel/Wrapper.client'
import { Section } from '@/components/Section'
import { DiscountIcon } from '@/components/icons/offers/DiscountIcon'
import { PaymentIcon } from '@/components/icons/offers/PaymentIcon'
import { PeopleIcon } from '@/components/icons/offers/PeopleIcon'
import { WarehouseIcon } from '@/components/icons/offers/WarehouseIcon'
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
    icon: <DiscountIcon  />,
  },
  {
    title: 'Відстрочка платежу для партнерів',
    icon: <PaymentIcon  />,
  },
  {
    title: 'Широкий асортимент продукції на складі',
    icon: <WarehouseIcon  />,
  },
  {
    title: 'Індивідуальний підхід до кожного замовлення',
    icon: <PeopleIcon />,
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
      <InnerSection className="py-layout-gap-3 bg-sys-accent w-full">
        <Container>
              <ul className="list-none m-0 p-0 grid gap-space-10 tabet:gap-space-20 tablet:grid-cols-2 wide:grid-cols-4 ">
                {offers.map((offer) => (
                  <li key={offer.title} className="min-w-0">
                    <article className="box-border min-w-0 bg-sys-surface rounded-xl p-space-20 tablet:p-space-30 min-h-fit h-full">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] h-full relative ">
                        <h2
                          className={[
                            'm-0 text-sys-accent box-border overflow-hidden break-all',
                            'box-border min-w-0 max-w-full',
                            'whitespace-normal wrap-anywhere',
                          ].join(' ')}
                        >
                          {offer.title}
                        </h2>

                        <div
                          aria-hidden="true"
                          className={[
                            'flex items-end self-end shrink-0',
                            'w-[52px] h-[52px]',
                            'text-sys-accent',
                          ].join(' ')}
                        >
                          {offer.icon}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
              </Container>
            </InnerSection>
    </Section>
  )
}

