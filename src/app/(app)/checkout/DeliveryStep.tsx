import React from 'react'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { CheckoutAddresses } from '@/components/checkout/CheckoutAddresses'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { Address } from '@/payload-types'

import type { LiqPayPaymentData } from './checkoutTypes'

interface DeliveryStepProps {
  user: { email?: string | null } | null | undefined
  // Kept optional for backward-compatibility with previous props shape,
  // not used anymore – all gating is based on payment/address state.
  email?: string
  emailEditable?: boolean
  billingAddress: Partial<Address> | undefined
  shippingAddress: Partial<Address> | undefined
  billingAddressSameAsShipping: boolean
  paymentData: LiqPayPaymentData | null
  deliveryStepComplete: boolean
  onBillingAddressChange: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  onShippingAddressChange: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  onBillingAddressSameAsShippingChange: (sameAs: boolean) => void
  onBackToReceiver: () => void
  onNextToPayment: () => void
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({
  user,
  billingAddress,
  shippingAddress,
  billingAddressSameAsShipping,
  paymentData,
  deliveryStepComplete,
  onBillingAddressChange,
  onShippingAddressChange,
  onBillingAddressSameAsShippingChange,
  onBackToReceiver,
  onNextToPayment,
}) => {
  return (
    <section className="grid gap-space-20 max-w-3xl">
      <header className="grid gap-space-05">
        <h2 className="m-0 pobut-H3 text-sys-text">Спосіб доставки та адреса</h2>
        <p className="m-0 pobut-body text-sys-text-muted">
          Оберіть спосіб доставки та вкажіть адресу одержувача.
        </p>
      </header>

      <div className="grid gap-space-20">
        <section className="grid gap-space-10">
          <h3 className="m-0 text-sm font-semibold tracking-[0.12em] uppercase text-sys-text">
            Платіжна адреса
          </h3>

          {billingAddress ? (
            <div className="grid gap-space-10">
              <AddressItem
                address={billingAddress}
                actions={
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={Boolean(paymentData)}
                    onClick={(e) => {
                      e.preventDefault()
                      onBillingAddressChange(undefined)
                    }}
                    className="rounded-radius-full"
                  >
                    Змінити адресу
                  </Button>
                }
              />
            </div>
          ) : user ? (
            <CheckoutAddresses
              heading="Виберіть платіжну адресу"
              description="Використовуйте одну з раніше збережених адрес або додайте нову."
              setAddress={onBillingAddressChange}
            />
          ) : (
            <CreateAddressModal
              callback={(address) => {
                onBillingAddressChange(address)
              }}
              skipSubmission={true}
            />
          )}
        </section>

        <section className="grid gap-space-05">
          <div className="flex items-center gap-space-10">
            <Checkbox
              id="shippingTheSameAsBilling"
              checked={billingAddressSameAsShipping}
              disabled={Boolean(paymentData)}
              onCheckedChange={(state) => {
                onBillingAddressSameAsShippingChange(state as boolean)
              }}
            />
            <Label htmlFor="shippingTheSameAsBilling" className="text-sm font-medium text-sys-text">
              Адреса доставки збігається з платіжною
            </Label>
          </div>
          <p className="m-0 text-xs text-sys-text-muted">
            За потреби ви можете вказати іншу адресу або відділення служби доставки.
          </p>
        </section>

        {!billingAddressSameAsShipping && (
          <section className="grid gap-space-10">
            <h3 className="m-0 text-sm font-semibold tracking-[0.12em] uppercase text-sys-text">
              Адреса доставки
            </h3>

            {shippingAddress ? (
              <div className="grid gap-space-10">
                <AddressItem
                  address={shippingAddress}
                  actions={
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={Boolean(paymentData)}
                      onClick={(e) => {
                        e.preventDefault()
                        onShippingAddressChange(undefined)
                      }}
                      className="rounded-radius-full"
                    >
                      Змінити адресу
                    </Button>
                  }
                />
              </div>
            ) : user ? (
              <CheckoutAddresses
                heading="Виберіть адресу доставки"
                description="Оберіть адресу або створіть нову для доставки."
                setAddress={onShippingAddressChange}
              />
            ) : (
              <CreateAddressModal
                callback={(address) => {
                  onShippingAddressChange(address)
                }}
                skipSubmission={true}
              />
            )}
          </section>
        )}

        <section className="rounded-radius-primary border border-sys-border-interactive bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-05">
          <p className="m-0 pobut-body text-sys-text font-semibold">
            Служби доставки: Нова Пошта, Укрпошта, кур&apos;єр.
          </p>
          <p className="m-0 text-xs text-sys-text-muted">
            Підключення карти відділень Нової Пошти та розрахунок вартості доставки можна реалізувати
            через їх офіційний API. Поточна версія форми вже готова до збереження вибраних адрес.
          </p>
        </section>
      </div>

      <footer className="pt-space-15 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-space-10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBackToReceiver}
          className="self-start rounded-radius-full px-space-15"
        >
          Повернутися до одержувача
        </Button>

        <div className="flex gap-space-10 tablet:ml-auto">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-radius-full px-space-20"
            onClick={onBackToReceiver}
          >
            Назад
          </Button>
          <Button
            type="button"
            size="lg"
            className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
            disabled={!deliveryStepComplete}
            onClick={onNextToPayment}
          >
            До оплати
          </Button>
        </div>
      </footer>
    </section>
  )
}


