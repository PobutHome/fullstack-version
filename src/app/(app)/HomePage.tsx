import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Page } from '@/components/Page'
import { Section } from '@/components/Section'
import type { Category } from '@/payload-types'

type Props = {
  categories: Category[]
}

// Hardcoded home page layout that reads dynamic data (categories, etc.)
export function HomePage({ categories }: Props) {
  return (
    <Page data-app="frontend">
      {/* Hero / banner - layout fixed in code */}
      <Section>
        <Container>
          <InnerSection>
            <h1 className="pobut_H1">
              Інтернет-магазин
            </h1>
            <p className="pobut_body">
              Ласкаво просимо до нашого магазину. Переглядайте категорії, товари та акції —
              контент надходить з CMS, але вигляд контролюється кодом.
            </p>
          </InnerSection>
        </Container>
      </Section>

      {/* Categories from CMS, server-side rendered */}
      <Section>
        <Container>
          <InnerSection>
            <h2 className='pobut_H2'>Категорії</h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="rounded-lg border px-4 py-3 hover:bg-muted transition-colors"
                >
                  <a href={`/shop/${category.slug}`} className="block">
                    <p >{category.title}</p>
                  </a>
                </li>
              ))}
            </ul>
          </InnerSection>
        </Container>
      </Section>
    </Page>
  )
}
