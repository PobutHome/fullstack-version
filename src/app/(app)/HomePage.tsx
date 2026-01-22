import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Page } from '@/components/Page'
import { Section } from '@/components/Section'
import type { Category } from '@/payload-types'
import { Benefits } from '@/sections/home/Benefits'
import { HomeBanner } from '@/sections/home/HomeBanner'
import './HomePage.css'

type Props = {
  categories: Category[]
}

// Hardcoded home page layout that reads dynamic data (categories, etc.)
// Uses the same layout + tokens as the design system page.
export function HomePage({ categories }: Props) {
  return (
    <Page
      data-app="frontend"
      className="home-page"
    >
      <HomeBanner />{/*implement homebanner fetching banners from cms, and enable creation of those banners */}
      <Benefits />
      

      {/* Catalog / categories from CMS */}
      <Section id="catalog" aria-labelledby="home-catalog-title">
        <Container>
          <InnerSection>
            <div className="home-section-grid">
              <header>
                <h2 id="home-catalog-title">
                  Каталог
                </h2>
                <p className="home-catalog-header-caption">
                  Основні розділи асортименту. Оберіть потрібну категорію, щоб перейти до
                  товарів.
                </p>
              </header>

              <div className="fe-card home-catalog-card">
                <ul
                  aria-label="Категорії товарів"
                  className="home-catalog-list"
                >
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`/shop/${category.slug}`}
                        className="fe-card home-catalog-item-link"
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
        className="home-offers-section"
      >
        <Container>
          <InnerSection>
            <div className="home-section-grid">
              <h2
                id="home-offers-title"
                className="home-offers-title"
              >
                Акції і пропозиції
              </h2>

              <div className="home-offers-grid">
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
                    className="fe-card home-offer-card"
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
