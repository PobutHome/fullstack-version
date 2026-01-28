import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import { LazyLeafletMap } from './LazyLeafletMap'

// Pobut Home, Khmelnytskyi (approx). Adjust if you want exact coordinates.
const OFFICE_CENTER: [number, number] = [49.4227, 26.9875]

export function HomeAboutMap() {
  return (
    <Section id="about" aria-labelledby="home-about-title">
      <Container>
        <InnerSection>
          <div className="grid gap-layout-gap-2">
            {/* Section title (H1 centered) */}
            <h1
              id="home-about-title"
              className={[
                'm-0 text-center text-sys-text',
                'pobut-H1',
                'text-balance',
              ].join(' ')}
            >
              Ми реалізуємо ретельно відібрані товари для дому та бізнесу, орієнтуючись на стабільну
              якість і комфорт наших клієнтів
            </h1>

            {/* Content card */}
            <div
              className={[
                'rounded-radius-xl',
                'border border-sys-accent',
                'bg-sys-surface',
                'p-ds-inner-section-pad-sm',
              ].join(' ')}
            >
              <div className="grid gap-layout-gap-2 desktop:grid-cols-[minmax(0,1fr)_800px] desktop:items-start">
                {/* Text column */}
                <div className="min-w-0 grid gap-layout-gap-2">
                  <div className="min-w-0 grid gap-space-10">
                    <h1 className="m-0 text-sys-text pobut-H2">Про нас</h1>
                    <p className="m-0 text-sys-text pobut-body">
                      Компанія &quot;Pobut Home&quot; працює на ринку з 2010 року. Ми пропонуємо
                      широкий асортимент побутової хімії, пакувальних та витратних матеріалів,
                      господарських товарів, одноразового посуду, серветок, туалетного паперу та
                      продукції для дому, офісу, магазинів, кафе, ресторанів і медичних закладів.
                    </p>
                    <p className="m-0 text-sys-text pobut-body">
                      У нашому каталозі представлені вироби від провідних світових брендів та
                      продукція власної торгової марки &quot;Pobut Home&quot;, що поєднує високу
                      якість і доступну ціну. Наша місія — зробити побут зручнішим, приємнішим і
                      ефективнішим, забезпечуючи кожного клієнта надійними товарами для щоденного
                      використання.
                    </p>
                    <p className="m-0 text-sys-text pobut-body">
                      Доставляємо замовлення по всій Україні власним транспортом або через кур&apos;єрські
                      служби: Нова Пошта, Делівері, Укрпошта та інші.
                    </p>
                  </div>

                  <div className="grid gap-layout-gap-2 sm:grid-cols-2">
                    <div className="min-w-0 grid gap-space-10">
                      <h1 className="m-0 text-sys-text pobut-H2">Контакти</h1>
                      <p className="m-0 text-sys-text pobut-body">
                        <a className="underline" href="tel:+380680000000">
                          +38 (068) XXX XX XX
                        </a>
                      </p>
                      <p className="m-0 text-sys-text pobut-body">
                        <a className="underline" href="tel:+380660000000">
                          +38 (066) XXX XX XX
                        </a>
                      </p>
                    </div>

                    <div className="min-w-0 grid gap-space-10">
                      <h1 className="m-0 text-sys-text pobut-H2">Адреса</h1>
                      <p className="m-0 text-sys-text pobut-body">
                        ТОВ &quot;Pobut Home&quot;, 29000, Хмельницька обл., м. Хмельницький,
                        вул. Деповська, 19/2
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map column (lazy-loaded) */}
                <div
                  className={[
                    'overflow-hidden',
                    'rounded-radius-lg',
                    'bg-sys-surface-2',
                    // Size requirements:
                    // - Mobile: full width x 310px
                    // - Tablet: full width x 310px
                    // - Desktop: 800px x 680px
                    'w-full h-[310px] desktop:h-[680px]',
                  ].join(' ')}
                >
                  <LazyLeafletMap
                    center={OFFICE_CENTER}
                    zoom={14}
                    markerTitle='ТОВ "Pobut Home"'
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </InnerSection>
      </Container>
    </Section>
  )
}

