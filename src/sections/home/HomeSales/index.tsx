import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import type { SaleSlide } from '@/components/SalesCarousel'
import { SalesCarouselWrapper } from '@/components/SalesCarousel/Wrapper.client'
import { Section } from '@/components/Section'
import Image from 'next/image'

type Offer = {
  title: string
  iconSrc: string
  iconAlt: string
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
    iconSrc: '/images/Group (1).svg',
    iconAlt: 'Знижки',
  },
  {
    title: 'Відстрочка платежу для партнерів',
    iconSrc: '/images/material-symbols-light_add-card-outline.svg',
    iconAlt: 'Оплата',
  },
  {
    title: 'Широкий асортимент продукції на складі',
    iconSrc: '/images/streamline-ultimate_warehouse-storage-2.svg',
    iconAlt: 'Склад',
  },
  {
    title: 'Індивідуальний підхід до кожного замовлення',
    iconSrc: '/images/fluent_people-28-regular.svg',
    iconAlt: 'Підхід',
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
      <div className="rounded-xl p-layout-gap-3 bg-sys-accent">
        <Container>
              <ul className="list-none m-0 p-0 grid gap-layout-gap-2 md:grid-cols-2  lg:grid-cols-4">
                {offers.map((offer) => (
                  <li key={offer.title} className="min-w-0">
                    <article className="bg-sys-surface rounded-xl p-space-20 md:p-space-30 min-h-fit h-full flex items-center justify-between gap-layout-gap-1">
                      <h2
                        className={[
                          'm-0 text-sys-accent',
                          'overflow-hidden [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]',
                        ].join(' ')}
                      >
                        {offer.title}
                      </h2>

                      <Image
                        src={offer.iconSrc}
                        alt={offer.iconAlt}
                        width={64}
                        height={64}
                        className="shrink-0 w-[44px] h-[44px] tablet:w-[52px] tablet:h-[52px]"
                      />
                    </article>
                  </li>
                ))}
              </ul>
              </Container>
            </div>
    </Section>
  )
}

