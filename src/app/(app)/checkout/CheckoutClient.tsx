'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CartStep } from './CartStep'
import { DeliveryStep } from '@/app/(app)/checkout/DeliveryStep'
import { PaymentStep } from '@/app/(app)/checkout/PaymentStep'
import { ReceiverStep } from './ReceiverStep'
import { CHECKOUT_STEPS, useCheckoutController } from './useCheckoutController'

export const CheckoutClient: React.FC = () => {
  const router = useRouter()

  const {
    user,
    cart,
    error,
    setError,
    paymentData,
    setPaymentData,
    deliveryMethod,
    isProcessingPayment,
    setProcessingPayment,
    paymentMethod,
    currentStep,
    setCurrentStep,
    checkoutForm,
    canSubmitPayment,
    cartIsEmpty,
    receiverStepComplete,
    deliveryStepComplete,
    canPreparePayment,
    canGoToStep,
    goToNextStep,
    initiatePaymentIntent,
    handleCashOnDelivery,
  } = useCheckoutController()

  if (cartIsEmpty && isProcessingPayment) {
    return (
      <Section aria-labelledby="checkout-processing-title" className="pb-space-50">
        <Container>
          <InnerSection className="flex flex-col items-center justify-center gap-space-20 py-space-50">
            <div className="text-center grid gap-space-10">
              <h1
                id="checkout-processing-title"
                className="m-0 pobut-H3 text-sys-text text-balance"
              >
                Обробка платежу
              </h1>
              <p className="m-0 pobut-body text-sys-text-muted">
                Зачекайте кілька секунд — ми підтверджуємо оплату вашого замовлення.
              </p>
            </div>

            <LoadingSpinner className="w-12 h-6" />
          </InnerSection>
        </Container>
      </Section>
    )
  }

  if (cartIsEmpty) {
    return (
      <Section aria-labelledby="checkout-empty-title" className="pb-space-50">
        <Container>
          <InnerSection className="py-space-50 flex flex-col items-center text-center gap-space-20">
            <div className="grid gap-space-10 max-w-xl">
              <h1 id="checkout-empty-title" className="m-0 pobut-H3 text-sys-text">
                Кошик порожній
              </h1>
              <p className="m-0 pobut-body text-sys-text-muted">
                Додайте товари до кошика, щоб перейти до оформлення замовлення.
              </p>
            </div>

            <Button
              asChild
              className="rounded-radius-full px-6 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
            >
              <Link href="/catalog">Перейти до каталогу</Link>
            </Button>
          </InnerSection>
        </Container>
      </Section>
    )
  }

  const currentStepIndex = CHECKOUT_STEPS.findIndex((step) => step.id === currentStep)
  const totalStepTransitions = Math.max(CHECKOUT_STEPS.length - 1, 1)
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentStepIndex / totalStepTransitions) * 100),
  )

  return (
    <Section aria-labelledby="checkout-title" className="pb-space-50">
      <Container>
        <InnerSection className="grid gap-layout-gap-2 max-w-5xl mx-auto">
          <header className="grid gap-space-10">
            <h1 id="checkout-title" className="m-0 pobut-H2 text-sys-text">
              Оформлення замовлення
            </h1>
            <p className="m-0 pobut-body text-sys-text-muted max-w-208">
              Заповніть дані одержувача, оберіть спосіб доставки та зручний варіант оплати. Ви
              зможете оформити замовлення як гість або через особистий кабінет.
            </p>
          </header>

          <div className="mt-space-20 grid gap-layout-gap-2">
            {/* Unified checkout container: steps on top, forms inside */}
            <div className="rounded-radius-primary border border-sys-border bg-sys-surface shadow-shadow-sm">
              {/* Steps navigation (top, only bottom border) */}
              <header
                aria-label="Кроки оформлення"
                className="px-space-20 py-space-15 border-b border-sys-border"
              >
                <h2 className="m-0 mb-space-10 pobut-H4 text-sys-text">Кроки оформлення</h2>
                <div className="relative">
                  {/* Base progress line */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 right-0 top-3.5 h-px bg-sys-border"
                  />
                  {/* Active progress line */}
                  <div
                    aria-hidden="true"
                    style={{ width: `${progressPercent}%` }}
                    className="pointer-events-none absolute left-0 top-3.5 h-px bg-sys-accent transition-[width] duration-300 ease-out"
                  />

                  <ol className="relative z-10 flex items-center justify-between gap-space-10">
                    {CHECKOUT_STEPS.map((step, index) => {
                      const isActive = step.id === currentStep
                      const isCompleted = index < currentStepIndex
                      const isDisabled = !canGoToStep(step.id)

                      return (
                        <li key={step.id} className="flex-1 min-w-0">
                          <Button
                            type="button"
                            variant="ghost"
                            disabled={isDisabled}
                            aria-current={isActive ? 'step' : undefined}
                            onClick={() => {
                              if (canGoToStep(step.id)) setCurrentStep(step.id)
                            }}
                            className={[
                              'group w-full flex flex-col items-center gap-space-05 text-center transition-colors',
                              'bg-transparent hover:bg-transparent px-0 py-0 h-auto',
                              isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                            ].join(' ')}
                          >
                            <span
                              className={[
                                'flex h-8 w-8 items-center justify-center rounded-radius-full border text-[12px] font-semibold bg-sys-surface',
                                isCompleted
                                  ? 'border-sys-accent bg-sys-accent text-sys-text-on-accent'
                                  : isActive
                                    ? 'border-sys-accent text-sys-accent'
                                    : 'border-sys-border text-sys-text-muted',
                              ].join(' ')}
                            >
                              {isCompleted ? '✓' : index + 1}
                            </span>

                            <p className="m-0 text-xs font-semibold text-sys-text truncate">
                              {step.title}
                            </p>
                          </Button>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </header>

              {/* Main content: steps */}
              <section className="px-space-20 py-space-20 flex flex-col gap-layout-gap-1">
                {/* Step 1: Cart review */}
                {currentStep === 'cart' && !cartIsEmpty && (
                  <CartStep cart={cart as any} onNext={goToNextStep} />
                )}

                {/* Step 2: Receiver */}
                {currentStep === 'receiver' && (
                  <ReceiverStep
                    user={user}
                    checkoutForm={checkoutForm}
                    onContinueToDelivery={goToNextStep}
                    receiverStepComplete={receiverStepComplete}
                  />
                )}

                {/* Step 3: Delivery & addresses */}
                {currentStep === 'delivery' && (
                  <DeliveryStep
                    user={user}
                    email=""
                    emailEditable={false}
                    paymentData={paymentData}
                    deliveryStepComplete={deliveryStepComplete}
                    deliveryMethod={deliveryMethod}
                    checkoutForm={checkoutForm}
                    onBackToReceiver={() => setCurrentStep('receiver')}
                    onNextToPayment={goToNextStep}
                  />
                )}

                {/* Step 4: Payment */}
                {currentStep === 'payment' && (
                  <PaymentStep
                    checkoutForm={checkoutForm}
                    canPreparePayment={canPreparePayment}
                    paymentData={paymentData}
                    error={error}
                    canSubmitPayment={canSubmitPayment}
                    deliveryMethod={deliveryMethod}
                    onInitiatePaymentIntent={() => {
                      void initiatePaymentIntent('liqpay')
                    }}
                    onCashOnDelivery={handleCashOnDelivery}
                    onRetry={() => {
                      router.refresh()
                    }}
                    onCancelPayment={() => setPaymentData(null)}
                    onBackToDelivery={() => setCurrentStep('delivery')}
                    onProcessingPaymentStart={() => setProcessingPayment(true)}
                  />
                )}
              </section>

              {/* Compact order summary shown at the bottom on steps 2–4 */}
              {currentStep !== 'cart' && !cartIsEmpty && (
                <section className="mt-space-20 rounded-radius-primary border border-sys-border bg-sys-surface-2 p-space-15 grid gap-space-10">
                  <header className="grid gap-[2px]">
                    <h2 className="m-0 text-sm font-semibold text-sys-text">Замовлення</h2>
                    <p className="m-0 text-[11px] text-sys-text-muted">
                      Склад кошика змінюється на першому кроці &quot;Товари&quot;.
                    </p>
                  </header>

                  <div className="grid gap-space-10">
                    {cart?.items?.map((item, index) => {
                      if (typeof item.product === 'object' && item.product) {
                        const {
                          product,
                          product: { meta, title, gallery },
                          quantity,
                          variant,
                        } = item

                        if (!quantity) return null

                        let image = gallery?.[0]?.image || meta?.image
                        let price = product?.priceInUAH

                        const isVariant = Boolean(variant) && typeof variant === 'object'

                        if (isVariant) {
                          price = variant?.priceInUAH

                          const imageVariant = product.gallery?.find((galleryItem) => {
                            if (!galleryItem.variantOption) return false
                            const variantOptionID =
                              typeof galleryItem.variantOption === 'object'
                                ? galleryItem.variantOption.id
                                : galleryItem.variantOption

                            const hasMatch = variant?.options?.some((option) => {
                              if (typeof option === 'object') return option.id === variantOptionID
                              return option === variantOptionID
                            })

                            return hasMatch
                          })

                          if (imageVariant && typeof imageVariant.image !== 'string') {
                            image = imageVariant.image
                          }
                        }

                        return (
                          <div className="flex items-start gap-space-10" key={index}>
                            <div className="h-14 w-14 rounded-radius-lg border border-sys-border bg-sys-surface flex items-center justify-center overflow-hidden">
                              <div className="relative w-full h-full">
                                {image && typeof image !== 'string' && (
                                  <Media
                                    className=""
                                    fill
                                    imgClassName="rounded-radius-lg object-contain"
                                    resource={image}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="flex grow justify-between items-center gap-space-10">
                              <div className="flex flex-col gap-px min-w-0">
                                <p className="m-0 text-[13px] font-medium text-sys-text line-clamp-2">
                                  {title}
                                </p>
                                <small className="m-0 text-[11px] text-sys-text-muted">
                                  Кількість: {quantity}
                                </small>
                              </div>

                              {typeof price === 'number' && (
                                <Price
                                  amount={price}
                                  className="text-sm font-semibold text-sys-text whitespace-nowrap"
                                />
                              )}
                            </div>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>

                  <footer className="border-t border-sys-border pt-space-10 flex justify-between items-center gap-space-10">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-sys-text-muted">
                      Всього
                    </span>
                    <Price
                      className="text-lg font-semibold text-sys-text"
                      amount={cart.subtotal || 0}
                    />
                  </footer>
                </section>
              )}
            </div>
          </div>
        </InnerSection>
      </Container>
    </Section>
  )
}

