import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Page } from '@/components/Page'
import { Section } from '@/components/Section'
import { Benefits } from '@/sections/home/Benefits'
import { FeaturedProducts } from '@/sections/home/FeaturedProducts'
import { HomeBanner } from '@/sections/home/HomeBanner'
import { HomeCatalog, type HomeCatalogCategory } from '@/sections/home/HomeCatalog'

type Props = {
  categories: HomeCatalogCategory[]
}

// Hardcoded home page layout that reads dynamic data (categories, etc.)
// Uses the same layout + tokens as the design system page.
export function HomePage({ categories }: Props) {
  return (
    <Page
      data-app="frontend"
      background
      sectionsMargin
      className="pt-space-20 pb-space-50"
    >
      <HomeBanner />{/*implement homebanner fetching banners from cms, and enable creation of those banners */}
      <Benefits />
      <FeaturedProducts />

      {/* Catalog / categories from CMS */}
      <HomeCatalog categories={categories} />

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
