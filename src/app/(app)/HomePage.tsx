import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Page } from '@/components/Page'
import { Section } from '@/components/Section'
import type { Category } from '@/payload-types'
import { Benefits } from '@/sections/home/Benefits'
import { FeaturedProducts } from '@/sections/home/FeaturedProducts'
import { HomeBanner } from '@/sections/home/HomeBanner'

type Props = {
  categories: Category[]
}

// Hardcoded home page layout that reads dynamic data (categories, etc.)
// Uses the same layout + tokens as the design system page.
export function HomePage({ categories }: Props) {
  return (
    <Page
      data-app="frontend"
      className="sections-margin page-background pt-space-20 pb-space-50"
    >
      <HomeBanner />{/*implement homebanner fetching banners from cms, and enable creation of those banners */}
      <Benefits />
      <FeaturedProducts />

      {/* Catalog / categories from CMS */}
      <Section id="catalog" aria-labelledby="home-catalog-title">
        <Container>
          <InnerSection>
            <div className="grid gap-layout-gap-2">
              <header>
                <h2 id="home-catalog-title">
                  Каталог
                </h2>
                <p className="text-sys-text-muted mt-space-10">
                  Основні розділи асортименту. Оберіть потрібну категорію, щоб перейти до
                  товарів.
                </p>
              </header>

              <div className="fe-card p-space-20 grid gap-layout-gap-2 bg-sys-surface">
                <ul
                  aria-label="Категорії товарів"
                  className="list-none m-0 p-0 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-layout-gap-2"
                >
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`/shop/${category.slug}`}
                        className="fe-card grid gap-layout-gap-1 p-space-20 no-underline text-sys-text"
                      >
                        <span>{category.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Promotions & additional offers (static marketing section) */}
      <Section
        id="offers"
        aria-labelledby="home-offers-title"
        className="bg-sys-surface-accent"
      >
        <Container>
          <InnerSection>
            <div className="grid gap-layout-gap-2">
              <h2
                id="home-offers-title"
                className="text-sys-text-on-accent"
              >
                Акції і пропозиції
              </h2>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-layout-gap-2">
                {[
                  {
                    title: 'Лояльні ціни та система знижок',
                    body: 'Накопичувальні знижки та персональні умови для постійних клієнтів.',
                  },
                  {
                    title: 'Відстрочка платежу',
                    body: 'Гнучкі варіанти оплати для партнерів з регулярними відправками.',
                  },
                  {
                    title: 'Широкий асортимент на складі',
                    body: 'Популярні позиції завжди доступні, щоб не зупиняти вашу роботу.',
                  },
                  {
                    title: 'Індивідуальний підхід',
                    body: 'Підбираємо рішення під ваш бізнес та формат замовлень.',
                  },
                ].map((card) => (
                  <article
                    key={card.title}
                    className="fe-card bg-sys-surface grid gap-layout-gap-1 p-space-20"
                  >
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}
