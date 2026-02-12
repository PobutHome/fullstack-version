import React from 'react'

import { Button } from '@/components/ui/button'
import type { CheckoutForm, DeliveryMethod } from './checkoutTypes'

interface ReviewStepProps {
  user: { email?: string | null } | null | undefined
  deliveryMethod: DeliveryMethod
  checkoutForm: CheckoutForm
  onBackToReceiver: () => void
  onBackToDelivery: () => void
  onContinueToPayment: () => void
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  user,
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
    <section className="grid gap-space-20 max-w-3xl">
      <header className="grid gap-space-05">
        <h2 className="m-0 pobut-H3 text-sys-text">Перевірка даних</h2>
        <p className="m-0 pobut-body text-sys-text-muted">
          Перегляньте дані одержувача, спосіб доставки та адресу перед тим, як перейти до оплати.
        </p>
        <p className="m-0 text-xs text-sys-text-muted">
          Увага: вартість доставки <span className="font-semibold">не входить</span> у вартість
          товарів і оплачується окремо за тарифами обраної поштової служби.
        </p>
      </header>

      <div className="grid gap-space-15">
        <section className="rounded-radius-primary border border-sys-border bg-sys-surface-2 p-space-15 grid gap-space-05">
          <header className="flex items-center justify-between gap-space-10">
            <h3 className="m-0 text-sm font-semibold text-sys-text">Одержувач</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px] text-sys-text-muted hover:text-sys-text"
              onClick={onBackToReceiver}
            >
              Змінити
            </Button>
          </header>

          <dl className="grid gap-[2px] text-sm">
            {receiverFullName && (
              <div className="flex justify-between gap-space-10">
                <dt className="text-sys-text-muted">ПІБ</dt>
                <dd className="m-0 text-sys-text text-right">{receiverFullName}</dd>
              </div>
            )}
            {values.receiverPhone && (
              <div className="flex justify-between gap-space-10">
                <dt className="text-sys-text-muted">Телефон</dt>
                <dd className="m-0 text-sys-text text-right">{values.receiverPhone}</dd>
              </div>
            )}
            {email && (
              <div className="flex justify-between gap-space-10">
                <dt className="text-sys-text-muted">Email</dt>
                <dd className="m-0 text-sys-text text-right">{email}</dd>
              </div>
            )}
          </dl>
        </section>

        <section className="rounded-radius-primary border border-sys-border bg-sys-surface-2 p-space-15 grid gap-space-05">
          <header className="flex items-center justify-between gap-space-10">
            <h3 className="m-0 text-sm font-semibold text-sys-text">Доставка</h3>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px] text-sys-text-muted hover:text-sys-text"
              onClick={onBackToDelivery}
            >
              Змінити
            </Button>
          </header>

          <dl className="grid gap-[2px] text-sm">
            <div className="flex justify-between gap-space-10">
              <dt className="text-sys-text-muted">Служба</dt>
              <dd className="m-0 text-sys-text text-right">
                {deliveryMethod === 'nova-poshta' ? 'Нова Пошта' : 'Укрпошта'}
              </dd>
            </div>
            {deliverySummary && (
              <div className="flex justify-between gap-space-10">
                <dt className="text-sys-text-muted">Адреса</dt>
                <dd className="m-0 text-sys-text text-right max-w-xs">{deliverySummary}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      <footer className="pt-space-10 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-space-10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="self-start rounded-radius-full px-space-15 text-sys-text-muted hover:text-sys-text hover:bg-transparent active:bg-transparent underline-offset-4 hover:underline"
          onClick={onBackToReceiver}
        >
          Повернутися до одержувача
        </Button>

        <Button
          type="button"
          size="lg"
          className="self-end rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
          onClick={onContinueToPayment}
        >
          Перейти до оплати
        </Button>
      </footer>
    </section>
  )
}

