'use client'

import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import { DeliveryStep } from '@/app/(app)/checkout/DeliveryStep'
import { PaymentStep } from '@/app/(app)/checkout/PaymentStep'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CartStep } from './CartStep'
import { CheckoutOrderSummary, type CheckoutOrderSummaryCart } from './CheckoutOrderSummary'
import { ReceiverStep } from './ReceiverStep'
import { ReviewStep } from './ReviewStep'
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
        <InnerSection className="grid gap-layout-gap-1 max-w-5xl mx-auto min-w-0">
          <header className="grid gap-space-05 min-w-0">
            <h1 id="checkout-title" className="m-0 pobut-H2 text-sys-text">
              Оформлення замовлення
            </h1>
            <p className="m-0 pobut-body text-sys-text-muted max-w-xl">
              Заповніть дані одержувача, оберіть спосіб доставки та зручний варіант оплати. Ви
              зможете оформити замовлення як гість або через особистий кабінет.
            </p>
          </header>

          <div className="mt-space-15 grid gap-layout-gap-1 min-w-0">
            {/* Unified checkout container: steps on top, forms inside; box-border + overflow to prevent layout crash on small screens */}
            <div className="rounded-radius-primary border border-sys-border bg-sys-surface shadow-shadow-sm min-w-0 overflow-hidden box-border flex flex-col">
              {/* Steps navigation (top, connected nodes) */}
              <header
                aria-label="Кроки оформлення"
                className="px-space-20 py-space-15 border-b border-sys-border shrink-0"
              >
                <h2 className="m-0 mb-space-10 pobut-H4 text-sys-text">Кроки оформлення</h2>
                <div className="relative">
                  {/* Base road */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 right-0 top-4 h-[2px] -translate-y-1/2 rounded-full bg-sys-border"
                  />
                  {/* Active road */}
                  <div
                    aria-hidden="true"
                    style={{ width: `${progressPercent}%` }}
                    className="pointer-events-none absolute left-0 top-4 h-[2px] -translate-y-1/2 rounded-full bg-sys-accent transition-[width] duration-300 ease-out"
                  />

                  <ol className="relative z-10 flex items-center justify-between gap-space-10">
                    {CHECKOUT_STEPS.map((step, index) => {
                      const isActive = step.id === currentStep
                      const isCompleted = index < currentStepIndex
                      const isDisabled = !canGoToStep(step.id)
                      const stepFilled =
                        step.id === 'cart'
                          ? !cartIsEmpty
                          : step.id === 'delivery'
                            ? deliveryStepComplete
                            : step.id === 'receiver'
                              ? receiverStepComplete
                              : step.id === 'review'
                                ? canPreparePayment
                                : true
                      const nodeFilled = isCompleted || (isActive && stepFilled)

                      return (
                        <li key={step.id} className="flex-1 min-w-0 flex flex-col items-center">
                          <Button
                            type="button"
                            variant="ghost"
                            disabled={isDisabled}
                            aria-current={isActive ? 'step' : undefined}
                            onClick={() => {
                              if (canGoToStep(step.id)) setCurrentStep(step.id)
                            }}
                            className={[
                              'group flex min-w-0 flex-col items-center gap-space-05 text-center transition-colors',
                              'bg-transparent hover:bg-transparent px-0 py-0 h-auto',
                              isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                            ].join(' ')}
                          >
                            <span
                              className={[
                                'flex h-8 w-8 items-center justify-center rounded-radius-full border text-[12px] font-semibold',
                                nodeFilled
                                  ? 'border-sys-accent bg-sys-accent text-sys-text-on-accent shadow-shadow-sm'
                                  : isActive
                                    ? 'border-sys-accent bg-sys-surface text-sys-accent'
                                    : 'border-sys-border bg-sys-surface text-sys-text-muted',
                              ].join(' ')}
                            >
                              {isCompleted ? '✓' : index + 1}
                            </span>

                            <p className="m-0 min-w-0 text-[10px] font-semibold uppercase tracking-widest text-sys-text tablet:text-[11px] tablet:tracking-[0.12em]">
                              <span className="tablet:hidden">{step.shortTitle}</span>
                              <span className="hidden tablet:inline">{step.title}</span>
                            </p>
                          </Button>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </header>

              {/* Main content: steps - padding so focused inputs and focus rings stay visible */}
              <section className="px-space-20 py-space-20 flex flex-col gap-layout-gap-1 min-w-0 overflow-x-hidden box-border">
                {/* Step 1: Cart management */}
                {currentStep === 'cart' && !cartIsEmpty && (
                  <CartStep cart={cart as any} onNext={goToNextStep} />
                )}

                {/* Step 2: Delivery & addresses */}
                {currentStep === 'delivery' && (
                  <DeliveryStep
                    user={user}
                    email=""
                    emailEditable={false}
                    paymentData={paymentData}
                    deliveryStepComplete={deliveryStepComplete}
                    deliveryMethod={deliveryMethod}
                    checkoutForm={checkoutForm}
                    onBackToReceiver={() => setCurrentStep('cart')}
                    onNextToPayment={goToNextStep}
                  />
                )}

                {/* Step 3: Receiver */}
                {currentStep === 'receiver' && (
                  <ReceiverStep
                    user={user}
                    checkoutForm={checkoutForm}
                    onContinueToDelivery={goToNextStep}
                    onBack={() => setCurrentStep('delivery')}
                    receiverStepComplete={receiverStepComplete}
                  />
                )}

                {/* Step 4: Review */}
                {currentStep === 'review' && (
                  <ReviewStep
                    user={user}
                    cart={cart as CheckoutOrderSummaryCart}
                    deliveryMethod={deliveryMethod}
                    checkoutForm={checkoutForm}
                    onBackToReceiver={() => setCurrentStep('receiver')}
                    onBackToDelivery={() => setCurrentStep('delivery')}
                    onContinueToPayment={goToNextStep}
                  />
                )}

                {/* Step 5: Payment */}
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
                    onBackToDelivery={() => setCurrentStep('review')}
                    onProcessingPaymentStart={() => setProcessingPayment(true)}
                  />
                )}
              </section>

              {/* Order summary: separate component; on Review step it is shown inside the step as part of the report */}
              {currentStep !== 'cart' && currentStep !== 'review' && !cartIsEmpty && (
                <div className="mt-space-20 min-w-0 shrink-0">
                  <CheckoutOrderSummary
                    cart={cart as CheckoutOrderSummaryCart}
                    hint="Склад кошика змінюється на першому кроці «Товари»."
                  />
                </div>
              )}
            </div>
          </div>
        </InnerSection>
      </Container>
    </Section>
  )
}

