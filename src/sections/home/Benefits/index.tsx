import { Container } from '@/components/Container'
import { PercentIcon } from '@/components/icons/PercentIcon'
import { SpeedIcon } from '@/components/icons/SpeedIcon'
import { TrayIcon } from '@/components/icons/TrayIcon'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import './benefits.css'

export const Benefits = () => {
  return (
    <Section
      id="benefits"
      aria-labelledby="home-benefits-title"
    >
      <Container>
        <InnerSection>
          <div className="benefits-header">
            <h1 id="home-benefits-title">
              Оптовим клієнтам
            </h1>
            <p>
              Отримайте спеціальні ціни при замовленні від 50 одиниць товару
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon-circle">
                <PercentIcon
                  aria-hidden="true"
                  className="benefit-icon"
                />
              </div>
              <p className="benefit-text">
                Індивідуальні знижки для бізнесу
              </p>
            </div>

            <div className="benefit-dot" aria-hidden="true"></div>

            <div className="benefit-item">
              <div className="benefit-icon-circle">
                <SpeedIcon
                  aria-hidden="true"
                  className="benefit-icon"
                />
              </div>
              <p className="benefit-text">
                Швидка доставка по Україні
              </p>
            </div>

            <div className="benefit-dot" aria-hidden="true"></div>

            <div className="benefit-item">
              <div className="benefit-icon-circle">
                <TrayIcon
                  aria-hidden="true"
                  className="benefit-icon"
                />
              </div>
              <p className="benefit-text">
                Персональний менеджер для оптових клієнтів
              </p>
            </div>
          </div>
        </InnerSection>
      </Container>
    </Section>
  )
}