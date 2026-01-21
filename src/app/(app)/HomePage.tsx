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
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
              Інтернет-магазин
            </h1>
            <p className="text-muted-foreground max-w-xl">
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
            <h2 className="text-2xl font-semibold mb-4">Категорії</h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="rounded-lg border px-4 py-3 hover:bg-muted transition-colors"
                >
                  <a href={`/shop/${category.slug}`} className="block">
                    <p className="font-medium">{category.title}</p>
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
