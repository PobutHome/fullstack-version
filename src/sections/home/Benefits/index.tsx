import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import './Benefits.css'
import { BenefitsScroll } from './BenefitsScroll'

export const Benefits = () => {
  return (
    <Section
      id="benefits"
      aria-labelledby="home-benefits-title"
    >
      <Container>
        <InnerSection className="grid gap-layout-gap-1 mb-layout-gap-2">
          
          <h1 id="home-benefits-title">
            Оптовим клієнтам
          </h1>
          <p>
            Отримайте спеціальні ціни при замовленні від 50 одиниць товару
          </p>

          <BenefitsScroll />
        </InnerSection>
      </Container>
    </Section>
  )
}
