import React from 'react'

import { Button } from '@/components/ui/button'
import type { CheckoutForm, DeliveryMethod } from './checkoutTypes'
import { CheckoutOrderSummary, type CheckoutOrderSummaryCart } from './CheckoutOrderSummary'

interface ReviewStepProps {
  user: { email?: string | null } | null | undefined
  cart: CheckoutOrderSummaryCart | null | undefined
  deliveryMethod: DeliveryMethod
  checkoutForm: CheckoutForm
  onBackToReceiver: () => void
  onBackToDelivery: () => void
  onContinueToPayment: () => void
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  user,
  cart,
  deliveryMethod,
  checkoutForm,
  onBackToReceiver,
  onBackToDelivery,
  onContinueToPayment,
}) => {
  const values = checkoutForm.getValues()

  const receiverFullName = [values.receiverFirstName, values.receiverLastName]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(' ')

  const email = user?.email || values.email

  const deliverySummary =
    deliveryMethod === 'nova-poshta'
      ? values.novaCity && values.novaBranch
        ? `Нова Пошта, ${values.novaCity.trim()}, відділення: ${values.novaBranch.trim()}`
        : null
      : values.ukrCity && values.ukrStreet && values.ukrBuilding
        ? [
            'Укрпошта',
            values.ukrRegion?.trim(),
            values.ukrCity?.trim(),
            `${values.ukrStreet.trim()}, ${values.ukrBuilding.trim()}`,
            values.ukrPostcode?.trim(),
          ]
            .filter(Boolean)
            .join(', ')
        : null

  return (
    <section className="grid w-full max-w-3xl gap-space-20 mx-auto min-w-0 box-border overflow-hidden">
      <header className="grid gap-space-05 min-w-0">
        <h2 className="m-0 pobut-H3 text-sys-text">Перевірка даних</h2>
        <p className="m-0 pobut-body text-sys-text-muted wrap-break-word">
          Перегляньте дані одержувача, спосіб доставки та склад замовлення перед тим, як перейти до оплати. Щоб змінити будь-який пункт, натисніть «Змінити» або поверніться на відповідний крок.
        </p>
        <p className="m-0 block w-full min-w-0 rounded-radius-primary bg-sys-danger/10 px-space-10 py-space-08 text-[11px] leading-relaxed text-sys-danger box-border wrap-break-word">
          Увага: вартість доставки не входить у вартість товарів і оплачується окремо за тарифами
          обраної поштової служби.
        </p>
      </header>

      {/* Report-style blocks */}
      <div className="flex flex-col gap-space-15 min-w-0">
        <section className="rounded-radius-primary border border-sys-border bg-sys-surface-2 p-space-15 flex flex-col gap-space-10 min-w-0 box-border">
          <header className="flex flex-wrap items-center justify-between gap-space-10">
            <h3 className="m-0 text-sm font-semibold text-sys-text">Одержувач</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px] text-sys-text-muted hover:text-sys-text shrink-0"
              onClick={onBackToReceiver}
            >
              Змінити
            </Button>
          </header>

          <dl className="grid gap-space-05 text-sm min-w-0">
            {receiverFullName && (
              <div className="flex flex-wrap justify-between gap-x-space-10 gap-y-space-05">
                <dt className="text-sys-text-muted shrink-0">ПІБ</dt>
                <dd className="m-0 text-sys-text text-right wrap-break-word min-w-0">{receiverFullName}</dd>
              </div>
            )}
            {values.receiverPhone && (
              <div className="flex flex-wrap justify-between gap-x-space-10 gap-y-space-05">
                <dt className="text-sys-text-muted shrink-0">Телефон</dt>
                <dd className="m-0 text-sys-text text-right wrap-break-word min-w-0">{values.receiverPhone}</dd>
              </div>
            )}
            {email && (
              <div className="flex flex-wrap justify-between gap-x-space-10 gap-y-space-05">
                <dt className="text-sys-text-muted shrink-0">Email</dt>
                <dd className="m-0 text-sys-text text-right wrap-break-word min-w-0">{email}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className="rounded-radius-primary border border-sys-border bg-sys-surface-2 p-space-15 flex flex-col gap-space-10 min-w-0 box-border">
          <header className="flex flex-wrap items-center justify-between gap-space-10">
            <h3 className="m-0 text-sm font-semibold text-sys-text">Доставка</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px] text-sys-text-muted hover:text-sys-text shrink-0"
              onClick={onBackToDelivery}
            >
              Змінити
            </Button>
          </header>

          <dl className="grid gap-space-05 text-sm min-w-0">
            <div className="flex flex-wrap justify-between gap-x-space-10 gap-y-space-05">
              <dt className="text-sys-text-muted shrink-0">Служба</dt>
              <dd className="m-0 text-sys-text text-right wrap-break-word min-w-0">
                {deliveryMethod === 'nova-poshta' ? 'Нова Пошта' : 'Укрпошта'}
              </dd>
            </div>
            {deliverySummary && (
              <div className="flex flex-wrap justify-between gap-x-space-10 gap-y-space-05">
                <dt className="text-sys-text-muted shrink-0">Адреса</dt>
                <dd className="m-0 text-sys-text text-right wrap-break-word min-w-0 max-w-full">{deliverySummary}</dd>
              </div>
            )}
          </dl>
        </section>

        <CheckoutOrderSummary
          cart={cart}
          hint="Склад кошика змінюється на першому кроці «Товари». Поверніться на крок «Товари», щоб змінити склад замовлення."
        />
      </div>

      <footer className="pt-space-15 flex flex-col-reverse tablet:flex-row tablet:items-center tablet:justify-between gap-space-10 min-w-0">
        <Button
          type="button"
          variant="back"
          size="lg"
          className="rounded-radius-full px-space-20"
          onClick={onBackToReceiver}
        >
          Назад
        </Button>
        <Button
          type="button"
          size="lg"
          className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active tablet:ml-auto"
          onClick={onContinueToPayment}
        >
          Далі
        </Button>
      </footer>
    </section>
  )
}

