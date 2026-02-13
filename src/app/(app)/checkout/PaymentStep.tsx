import React from 'react'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'

import type { CheckoutForm, DeliveryMethod, LiqPayPaymentData } from './checkoutTypes'

interface PaymentStepProps {
  checkoutForm: CheckoutForm
  canPreparePayment: boolean
  paymentData: LiqPayPaymentData | null
  error: string | null
  canSubmitPayment: boolean
  deliveryMethod: DeliveryMethod
  onInitiatePaymentIntent: () => void
  onCashOnDelivery: (event: React.MouseEvent<HTMLButtonElement>) => void
  onRetry: () => void
  onCancelPayment: () => void
  onBackToDelivery: () => void
  onProcessingPaymentStart: () => void
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  checkoutForm,
  canPreparePayment,
  paymentData,
  error,
  canSubmitPayment,
  deliveryMethod,
  onInitiatePaymentIntent,
  onCashOnDelivery,
  onRetry,
  onCancelPayment,
  onBackToDelivery,
  onProcessingPaymentStart,
}) => {
  const { setValue, watch } = checkoutForm
  const paymentMethod = watch('paymentMethod')
  const codDisabled = deliveryMethod === 'ukrposhta'

  return (
    <section className="grid w-full max-w-3xl gap-space-20 mx-auto min-w-0 box-border overflow-hidden">
      <header className="grid gap-space-05 min-w-0">
        <h2 className="m-0 pobut-H3 text-sys-text">Спосіб оплати</h2>
        <p className="m-0 pobut-body text-sys-text-muted wrap-break-word">
          Оберіть зручний спосіб оплати. Для оплати карткою використовується LiqPay.
        </p>
        <p className="m-0 block w-full min-w-0 rounded-radius-primary bg-sys-danger/10 px-space-10 py-space-08 text-[11px] leading-relaxed text-sys-danger box-border wrap-break-word">
          Увага: вартість доставки не входить у вартість товарів і оплачується окремо за тарифами
          обраної поштової служби.
        </p>
      </header>

      <div className="grid gap-space-20 min-w-0">
        <section className="flex flex-col tablet:flex-row gap-space-10 min-w-0">
          <Button
            type="button"
            onClick={() => setValue('paymentMethod', 'card', { shouldValidate: true })}
            variant={paymentMethod === 'card' ? 'outline' : 'ghost'}
            className={[
              'flex flex-col items-start gap-space-05 rounded-radius-primary border px-space-15 py-space-15 text-left transition-colors min-w-0 flex-1 box-border',
              paymentMethod === 'card'
                ? 'border-sys-accent bg-sys-surface-2'
                : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
            ].join(' ')}
          >
            <p className="m-0 text-sm font-semibold text-sys-text wrap-break-word">Оплата карткою (LiqPay)</p>
            <small className="m-0 text-[11px] text-sys-text-muted wrap-break-word leading-snug">
              Миттєва онлайн-оплата банківською карткою через захищений платіжний шлюз LiqPay.
            </small>
          </Button>

          <Button
            type="button"
            onClick={() => setValue('paymentMethod', 'cod', { shouldValidate: true })}
            disabled={codDisabled}
            variant={paymentMethod === 'cod' ? 'outline' : 'ghost'}
            className={[
              'flex flex-col items-start gap-space-05 rounded-radius-primary border px-space-15 py-space-15 text-left transition-colors min-w-0 flex-1 box-border',
              paymentMethod === 'cod'
                ? 'border-sys-accent bg-sys-surface-2'
                : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
            ].join(' ')}
          >
            <p className="m-0 text-sm font-semibold text-sys-text wrap-break-word">Накладений платіж</p>
            <small className="m-0 text-[11px] text-sys-text-muted wrap-break-word leading-snug">
              Оплата при отриманні на відділенні поштового оператора (Нова Пошта, Укрпошта) або
              кур&apos;єру.
              {codDisabled && (
                <span className="block text-[11px] text-sys-danger mt-1">
                  Для Укрпошти доступна лише оплата карткою.
                </span>
              )}
            </small>
          </Button>
        </section>

        {paymentMethod === 'card' && !paymentData && (
          <section className="grid gap-space-10">
            <p className="m-0 pobut-body text-sys-text-muted">
              Натисніть кнопку нижче, щоб сформувати платіж через LiqPay. Після цього ви перейдете на
              сторінку банку для завершення оплати.
            </p>
            <div>
              <Button
                className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
                disabled={!canPreparePayment}
                onClick={(e) => {
                  e.preventDefault()
                  onInitiatePaymentIntent()
                }}
              >
                Перейти до оплати карткою
              </Button>
            </div>
            {!canPreparePayment && (
              <p className="m-0 text-xs text-sys-text-muted">
                Заповніть дані одержувача та адресу доставки, щоб продовжити.
              </p>
            )}
          </section>
        )}

        {paymentMethod === 'cod' && (
          <section className="grid gap-space-10">
            <p className="m-0 pobut-body text-sys-text-muted">
              Замовлення з накладеним платежем буде підтверджено менеджером. Оплату ви здійсните при
              отриманні.
            </p>
            <div>
              <Button
                className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
                disabled={!canPreparePayment}
                onClick={onCashOnDelivery}
              >
                Підтвердити замовлення з післяплатою
              </Button>
            </div>
            {!canPreparePayment && (
              <p className="m-0 text-xs text-sys-text-muted">
                Спочатку вкажіть коректні контактні дані та адресу доставки.
              </p>
            )}
          </section>
        )}

        {error && (
          <section className="grid gap-space-10">
            <Message error={error} />

            <Button
              onClick={(e) => {
                e.preventDefault()
                onRetry()
              }}
              className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
            >
              Спробувати ще раз
            </Button>
          </section>
        )}

        {paymentData && (
          <section className="grid gap-space-10">
            <h3 className="m-0 text-sm font-semibold tracking-[0.12em] uppercase text-sys-text">
              Підтвердження оплати
            </h3>

            <form
              method="POST"
              action={paymentData.checkoutURL}
              acceptCharset="utf-8"
              className="flex flex-col gap-space-10"
            >
              <input type="hidden" name="data" value={paymentData.data} />
              <input type="hidden" name="signature" value={paymentData.signature} />

              <Button
                type="submit"
                className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
                disabled={!canSubmitPayment}
                onClick={onProcessingPaymentStart}
              >
                Перейти до LiqPay
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="self-start text-xs px-0 text-sys-text-muted hover:text-sys-text hover:bg-transparent active:bg-transparent underline-offset-4 hover:underline"
                onClick={onCancelPayment}
              >
                Скасувати оплату
              </Button>
            </form>
          </section>
        )}
      </div>

      <footer className="pt-space-15 flex flex-col-reverse tablet:flex-row tablet:items-center tablet:justify-between gap-space-10 min-w-0">
        <Button
          type="button"
          variant="back"
          size="lg"
          className="rounded-radius-full px-space-20"
          onClick={onBackToDelivery}
        >
          Назад
        </Button>
      </footer>
    </section>
  )
}


