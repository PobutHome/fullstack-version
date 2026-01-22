import { Container } from '@/components/Container'
import { HomeBanner } from '@/components/HomeBanner'
import { InnerSection } from '@/components/InnerSection'
import { Page } from '@/components/Page'
import { Section } from '@/components/Section'
import type { Category } from '@/payload-types'

type Props = {
  categories: Category[]
}

// Hardcoded home page layout that reads dynamic data (categories, etc.)
// Uses the same layout + tokens as the design system page.
export function HomePage({ categories }: Props) {
  return (
    <Page
      data-app="frontend"
      style={{
        paddingTop: 'var(--space-20)',
        paddingBottom: 'var(--space-50)',
      }}
    >
      {/* Hero / banner */}
      <HomeBanner />
      {/* Benefits for wholesale clients */}
      <Section
        id="benefits"
        aria-labelledby="home-benefits-title"
        style={{ background: 'var(--sys-surface)' }}
      >
        <Container>
          <InnerSection>
            <div
              style={{
                display: 'grid',
                gap: 'var(--layout-gap-2)',
              }}
            >
              <h2 id="home-benefits-title" className="pobut_H2">
                Переваги для оптових клієнтів
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 'var(--layout-gap-2)',
                }}
              >
                <div className="fe-card fe-card--soft">
                  <div
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      padding: 'var(--space-20)',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        width: '7rem',
                        height: '7rem',
                        borderRadius: '9999px',
                        border: '2px solid var(--sys-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--sys-accent)',
                        fontSize: '2.5rem',
                      }}
                    >
                      %
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0 var(--space-20) var(--space-20)',
                      display: 'grid',
                      gap: 'var(--layout-gap-1)',
                    }}
                  >
                    <p className="pobut_body">
                      Індивідуальні знижки для бізнесу
                    </p>
                    <p className="pobut_caption">
                      Узгоджені умови для постійних клієнтів та великих замовлень.
                    </p>
                  </div>
                </div>

                <div className="fe-card fe-card--soft">
                  <div
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      padding: 'var(--space-20)',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        width: '7rem',
                        height: '7rem',
                        borderRadius: '9999px',
                        border: '2px solid var(--sys-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--sys-accent)',
                        fontSize: '2.5rem',
                      }}
                    >
                      ↗
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0 var(--space-20) var(--space-20)',
                      display: 'grid',
                      gap: 'var(--layout-gap-1)',
                    }}
                  >
                    <p className="pobut_body">
                      Швидка доставка по Україні
                    </p>
                    <p className="pobut_caption">
                      Склади та партнери доставки дозволяють отримати замовлення без затримок.
                    </p>
                  </div>
                </div>

                <div className="fe-card fe-card--soft">
                  <div
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      padding: 'var(--space-20)',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        width: '7rem',
                        height: '7rem',
                        borderRadius: '9999px',
                        border: '2px solid var(--sys-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--sys-accent)',
                        fontSize: '2.5rem',
                      }}
                    >
                      ⌂
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0 var(--space-20) var(--space-20)',
                      display: 'grid',
                      gap: 'var(--layout-gap-1)',
                    }}
                  >
                    <p className="pobut_body">
                      Персональний менеджер
                    </p>
                    <p className="pobut_caption">
                      Виділений контакт, який знає ваші потреби та допоможе з кожним замовленням.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </InnerSection>
        </Container>
      </Section>

      {/* Catalog / categories from CMS */}
      <Section id="catalog" aria-labelledby="home-catalog-title">
        <Container>
          <InnerSection>
            <div
              style={{
                display: 'grid',
                gap: 'var(--layout-gap-2)',
              }}
            >
              <header>
                <h2 id="home-catalog-title" className="pobut_H2">
                  Каталог
                </h2>
                <p
                  className="pobut_caption"
                  style={{ color: 'var(--sys-text-muted)', marginTop: 'var(--space-10)' }}
                >
                  Основні розділи асортименту. Оберіть потрібну категорію, щоб перейти до
                  товарів.
                </p>
              </header>

              <div
                className="fe-card"
                style={{
                  padding: 'var(--space-20)',
                  display: 'grid',
                  gap: 'var(--layout-gap-2)',
                  background: 'var(--sys-surface)',
                }}
              >
                <ul
                  aria-label="Категорії товарів"
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 'var(--layout-gap-2)',
                  }}
                >
                  {categories.map((category) => (
                    <li key={category.id}>
                      <a
                        href={`/shop/${category.slug}`}
                        className="fe-card"
                        style={{
                          display: 'grid',
                          gap: 'var(--layout-gap-1)',
                          padding: 'var(--space-20)',
                          textDecoration: 'none',
                          color: 'var(--sys-text)',
                        }}
                      >
                        <span className="pobut_body">{category.title}</span>
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
        style={{ background: 'var(--sys-surface-accent)' }}
      >
        <Container>
          <InnerSection>
            <div
              style={{
                display: 'grid',
                gap: 'var(--layout-gap-2)',
              }}
            >
              <h2
                id="home-offers-title"
                className="pobut_H2"
                style={{ color: 'var(--sys-text-on-accent)' }}
              >
                Акції і пропозиції
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 'var(--layout-gap-2)',
                }}
              >
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
                    className="fe-card"
                    style={{
                      background: 'var(--sys-surface)',
                      display: 'grid',
                      gap: 'var(--layout-gap-1)',
                      padding: 'var(--space-20)',
                    }}
                  >
                    <h3 className="pobut_H3">{card.title}</h3>
                    <p className="pobut_body">{card.body}</p>
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
