import { Container } from '@/components/Container'
import { PercentIcon } from '@/components/icons/PercentIcon'
import { SpeedIcon } from '@/components/icons/SpeedIcon'
import { TrayIcon } from '@/components/icons/TrayIcon'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'

export const Benefits = () => {
  return (
    <Section
      id="benefits"
      aria-labelledby="home-benefits-title"
    >
      <Container>
        <InnerSection>
          <div className="grid gap-layout-gap-1 mb-layout-gap-2">
            <h1 id="home-benefits-title">
              Оптовим клієнтам
            </h1>
            <p>
              Отримайте спеціальні ціни при замовленні від 50 одиниць товару
            </p>
          </div>

          <div className="grid grid-cols-3 gap-layout-gap-2 items-start w-full min-w-0 max-sm:gap-space-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <div className="grid gap-layout-gap-1 justify-items-center text-center min-w-0">
              <div className="w-full max-w-[3.125rem] aspect-square rounded-full bg-sys-surface border border-sys-accent flex items-center justify-center shrink-0 transition-all duration-300 md:max-w-[9.375rem] lg:max-w-[18.75rem]">
                <PercentIcon
                  aria-hidden="true"
                  className="w-[60%] h-auto aspect-square shrink-0 transition-all duration-300"
                />
              </div>
              <p className="text-sys-accent">
                Індивідуальні знижки для бізнесу
              </p>
            </div>

            <div className="hidden w-[25px] h-[25px] bg-sys-accent rounded-full self-center justify-self-center shrink-0 lg:block" aria-hidden="true"></div>

            <div className="grid gap-layout-gap-1 justify-items-center text-center min-w-0">
              <div className="w-full max-w-[3.125rem] aspect-square rounded-full bg-sys-surface border border-sys-accent flex items-center justify-center shrink-0 transition-all duration-300 md:max-w-[9.375rem] lg:max-w-[18.75rem]">
                <SpeedIcon
                  aria-hidden="true"
                  className="w-[60%] h-auto aspect-square shrink-0 transition-all duration-300"
                />
              </div>
              <p className="text-sys-accent">
                Швидка доставка по Україні
              </p>
            </div>

            <div className="hidden w-[25px] h-[25px] bg-sys-accent rounded-full self-center justify-self-center shrink-0 lg:block" aria-hidden="true"></div>

            <div className="grid gap-layout-gap-1 justify-items-center text-center min-w-0">
              <div className="w-full max-w-[3.125rem] aspect-square rounded-full bg-sys-surface border border-sys-accent flex items-center justify-center shrink-0 transition-all duration-300 md:max-w-[9.375rem] lg:max-w-[18.75rem]">
                <TrayIcon
                  aria-hidden="true"
                  className="w-[60%] h-auto aspect-square shrink-0 transition-all duration-300"
                />
              </div>
              <p className="text-sys-accent">
                Персональний менеджер для оптових клієнтів
              </p>
            </div>
          </div>
        </InnerSection>
      </Container>
    </Section>
  )
}
