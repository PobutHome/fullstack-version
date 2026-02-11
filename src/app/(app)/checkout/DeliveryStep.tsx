import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Address } from '@/payload-types'

import type { DeliveryMethod, LiqPayPaymentData } from './checkoutTypes'

interface DeliveryStepProps {
  user: { email?: string | null } | null | undefined
  // Kept optional for backward-compatibility with previous props shape,
  // not used anymore – all gating is based on payment/address state.
  email?: string
  emailEditable?: boolean
  shippingAddress: Partial<Address> | undefined
  paymentData: LiqPayPaymentData | null
  deliveryStepComplete: boolean
  deliveryMethod: DeliveryMethod
  onDeliveryMethodChange: (method: DeliveryMethod) => void
  onShippingAddressChange: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  onBackToReceiver: () => void
  onNextToPayment: () => void
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({
  user,
  shippingAddress,
  paymentData,
  deliveryStepComplete,
  deliveryMethod,
  onDeliveryMethodChange,
  onShippingAddressChange,
  onBackToReceiver,
  onNextToPayment,
}) => {
  const [novaPoshtaCity, setNovaPoshtaCity] = useState('')
  const [novaPoshtaBranch, setNovaPoshtaBranch] = useState('')

  const [ukrposhtaCity, setUkrposhtaCity] = useState('')
  const [ukrposhtaPostcode, setUkrposhtaPostcode] = useState('')
  const [ukrposhtaRegion, setUkrposhtaRegion] = useState('')
  const [ukrposhtaStreet, setUkrposhtaStreet] = useState('')
  const [ukrposhtaBuilding, setUkrposhtaBuilding] = useState('')
  const [ukrposhtaOffice, setUkrposhtaOffice] = useState('')
  const [ukrposhtaBranchCode, setUkrposhtaBranchCode] = useState('')

  const handleNovaPoshtaApply = (event: React.FormEvent) => {
    event.preventDefault()

    if (!novaPoshtaCity.trim() || !novaPoshtaBranch.trim()) {
      return
    }

    onShippingAddressChange({
      ...(shippingAddress || {}),
      country: 'UA',
      city: novaPoshtaCity.trim(),
      addressLine1: `Нова Пошта, відділення: ${novaPoshtaBranch.trim()}`,
      state: undefined,
      postalCode: undefined,
      company: 'Нова Пошта',
      title: 'Доставка у відділення Нової Пошти',
    })
  }

  const handleUkrposhtaApply = (event: React.FormEvent) => {
    event.preventDefault()

    if (
      !ukrposhtaCity.trim() ||
      !ukrposhtaPostcode.trim() ||
      !ukrposhtaRegion.trim() ||
      !ukrposhtaStreet.trim() ||
      !ukrposhtaBuilding.trim()
    ) {
      return
    }

    onShippingAddressChange({
      ...(shippingAddress || {}),
      country: 'UA',
      city: ukrposhtaCity.trim(),
      state: ukrposhtaRegion.trim(),
      postalCode: ukrposhtaPostcode.trim(),
      addressLine1: `${ukrposhtaStreet.trim()}, ${ukrposhtaBuilding.trim()}`,
      addressLine2: ukrposhtaOffice.trim()
        ? `Квартира / офіс: ${ukrposhtaOffice.trim()}`
        : undefined,
      company: 'Укрпошта',
      title: ukrposhtaBranchCode.trim()
        ? `Укрпошта, відділення ${ukrposhtaBranchCode.trim()}`
        : 'Укрпошта',
    })
  }

  const isNovaPoshtaSelected = deliveryMethod === 'nova-poshta'
  const isUkrposhtaSelected = deliveryMethod === 'ukrposhta'

  return (
    <section className="grid gap-space-20 max-w-3xl">
      <header className="grid gap-space-05">
        <h2 className="m-0 pobut-H3 text-sys-text">Спосіб доставки та адреса</h2>
        <p className="m-0 pobut-body text-sys-text-muted">
          Оберіть службу доставки та вкажіть адресу одержувача.
        </p>
      </header>

      <div className="grid gap-space-20">
        {/* Delivery method selection */}
        <section className="grid gap-space-10 tablet:grid-cols-2">
          <Button
            type="button"
            onClick={() => onDeliveryMethodChange('nova-poshta')}
            variant={isNovaPoshtaSelected ? 'outline' : 'ghost'}
            className={[
              'flex flex-col items-start gap-[2px] rounded-radius-primary border px-space-15 py-space-15 text-left transition-colors',
              isNovaPoshtaSelected
                ? 'border-sys-accent bg-sys-surface-2'
                : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
            ].join(' ')}
          >
            <p className="m-0 text-sm font-semibold text-sys-text">Нова Пошта</p>
            <small className="m-0 text-[11px] text-sys-text-muted">
              Доставка до відділення Нової Пошти. В майбутньому тут з&apos;явиться карта відділень
              з офіційного API.
            </small>
          </Button>

          <Button
            type="button"
            onClick={() => onDeliveryMethodChange('ukrposhta')}
            variant={isUkrposhtaSelected ? 'outline' : 'ghost'}
            className={[
              'flex flex-col items-start gap-[2px] rounded-radius-primary border px-space-15 py-space-15 text-left transition-colors',
              isUkrposhtaSelected
                ? 'border-sys-accent bg-sys-surface-2'
                : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
            ].join(' ')}
          >
            <p className="m-0 text-sm font-semibold text-sys-text">Укрпошта</p>
            <small className="m-0 text-[11px] text-sys-text-muted">
              Для Укрпошти доступна лише оплата карткою. Накладений платіж недоступний.
            </small>
          </Button>
        </section>

        {/* Nova Poshta: simple branch selector (API-ready) */}
        {isNovaPoshtaSelected && (
          <section className="grid gap-space-15 rounded-radius-primary border border-sys-border bg-sys-surface-2 px-space-15 py-space-15">
            <header className="grid gap-[2px]">
              <h3 className="m-0 text-sm font-semibold text-sys-text">Відділення Нової Пошти</h3>
              <p className="m-0 text-xs text-sys-text-muted">
                Введіть місто та відділення. Інтеграцію з картою та автодоповненням відділень через
                офіційний API можна додати окремо.
              </p>
            </header>

            <form className="grid gap-space-10 tablet:grid-cols-2" onSubmit={handleNovaPoshtaApply}>
              <div className="grid gap-space-05">
                <Label
                  htmlFor="nova-poshta-city"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Місто / населений пункт<span className="text-sys-danger">*</span>
                </Label>
                <Input
                  id="nova-poshta-city"
                  value={novaPoshtaCity}
                  onChange={(event) => setNovaPoshtaCity(event.target.value)}
                  placeholder="Наприклад, Київ"
                  variant="primaryFrontend"
                  className="h-11 rounded-radius-full px-4"
                  disabled={Boolean(paymentData)}
                />
              </div>

              <div className="grid gap-space-05">
                <Label
                  htmlFor="nova-poshta-branch"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Відділення / поштомат<span className="text-sys-danger">*</span>
                </Label>
                <Input
                  id="nova-poshta-branch"
                  value={novaPoshtaBranch}
                  onChange={(event) => setNovaPoshtaBranch(event.target.value)}
                  placeholder="Наприклад, Відділення №12, вул. Хрещатик, 1"
                  variant="primaryFrontend"
                  className="h-11 rounded-radius-full px-4"
                  disabled={Boolean(paymentData)}
                />
              </div>

              <div className="tablet:col-span-2 flex justify-start tablet:justify-end pt-space-05">
                <Button
                  type="submit"
                  className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
                  disabled={Boolean(paymentData)}
                >
                  Зберегти адресу відділення
                </Button>
              </div>
            </form>
          </section>
        )}

        {/* Ukrposhta: full address form */}
        {isUkrposhtaSelected && (
          <section className="grid gap-space-15 rounded-radius-primary border border-sys-border bg-sys-surface-2 px-space-15 py-space-15">
            <header className="grid gap-[2px]">
              <h3 className="m-0 text-sm font-semibold text-sys-text">Адреса доставки Укрпошти</h3>
              <p className="m-0 text-xs text-sys-text-muted">
                Вкажіть повну адресу відділення або доставки до дверей. Для Укрпошти доступна лише
                оплата карткою.
              </p>
            </header>

            <form className="grid gap-space-10" onSubmit={handleUkrposhtaApply}>
              <div className="grid gap-space-10 tablet:grid-cols-2">
                <div className="grid gap-space-05">
                  <Label
                    htmlFor="ukrposhta-country"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Країна
                  </Label>
                  <Input
                    id="ukrposhta-country"
                    value="Україна"
                    readOnly
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4 bg-sys-surface"
                  />
                </div>

                <div className="grid gap-space-05">
                  <Label
                    htmlFor="ukrposhta-region"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Область<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-region"
                    value={ukrposhtaRegion}
                    onChange={(event) => setUkrposhtaRegion(event.target.value)}
                    placeholder="Наприклад, Київська"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData)}
                  />
                </div>
              </div>

              <div className="grid gap-space-10 tablet:grid-cols-3">
                <div className="grid gap-space-05 tablet:col-span-2">
                  <Label
                    htmlFor="ukrposhta-city"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Місто / населений пункт<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-city"
                    value={ukrposhtaCity}
                    onChange={(event) => setUkrposhtaCity(event.target.value)}
                    placeholder="Наприклад, Бровари"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData)}
                  />
                </div>

                <div className="grid gap-space-05">
                  <Label
                    htmlFor="ukrposhta-postcode"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Поштовий індекс<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-postcode"
                    value={ukrposhtaPostcode}
                    onChange={(event) => setUkrposhtaPostcode(event.target.value)}
                    placeholder="Наприклад, 07400"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData)}
                  />
                </div>
              </div>

              <div className="grid gap-space-10 tablet:grid-cols-3">
                <div className="grid gap-space-05 tablet:col-span-2">
                  <Label
                    htmlFor="ukrposhta-street"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Вулиця<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-street"
                    value={ukrposhtaStreet}
                    onChange={(event) => setUkrposhtaStreet(event.target.value)}
                    placeholder="Наприклад, вул. Незалежності"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData)}
                  />
                </div>

                <div className="grid gap-space-05">
                  <Label
                    htmlFor="ukrposhta-building"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Будинок<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-building"
                    value={ukrposhtaBuilding}
                    onChange={(event) => setUkrposhtaBuilding(event.target.value)}
                    placeholder="Наприклад, 10Б"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData)}
                  />
                </div>
              </div>

              <div className="grid gap-space-10 tablet:grid-cols-2">
                <div className="grid gap-space-05">
                  <Label
                    htmlFor="ukrposhta-office"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Квартира / офіс
                  </Label>
                  <Input
                    id="ukrposhta-office"
                    value={ukrposhtaOffice}
                    onChange={(event) => setUkrposhtaOffice(event.target.value)}
                    placeholder="Необов&apos;язково"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData)}
                  />
                </div>

                <div className="grid gap-space-05">
                  <Label
                    htmlFor="ukrposhta-branch-code"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Код відділення Укрпошти
                  </Label>
                  <Input
                    id="ukrposhta-branch-code"
                    value={ukrposhtaBranchCode}
                    onChange={(event) => setUkrposhtaBranchCode(event.target.value)}
                    placeholder="Наприклад, 12345"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData)}
                  />
                </div>
              </div>

              <div className="flex justify-start tablet:justify-end pt-space-05">
                <Button
                  type="submit"
                  className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
                  disabled={Boolean(paymentData)}
                >
                  Зберегти адресу доставки
                </Button>
              </div>
            </form>
          </section>
        )}

        {/* Summary hint */}
        {shippingAddress && (
          <section className="rounded-radius-primary bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-05">
            <p className="m-0 pobut-body text-sys-text font-semibold">Обрана адреса доставки</p>
            <p className="m-0 text-xs text-sys-text-muted">
              {shippingAddress.title && <span>{shippingAddress.title}. </span>}
              {shippingAddress.addressLine1 && <span>{shippingAddress.addressLine1}, </span>}
              {shippingAddress.addressLine2 && <span>{shippingAddress.addressLine2}, </span>}
              {shippingAddress.city && <span>{shippingAddress.city}, </span>}
              {shippingAddress.postalCode && <span>{shippingAddress.postalCode}, </span>}
              {shippingAddress.state && <span>{shippingAddress.state}, </span>}
              {shippingAddress.country && <span>{shippingAddress.country}</span>}
            </p>
          </section>
        )}
      </div>

      <footer className="pt-space-15 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-space-10">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBackToReceiver}
          className="self-start rounded-radius-full px-space-15 text-sys-text-muted hover:text-sys-text hover:bg-transparent active:bg-transparent underline-offset-4 hover:underline"
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

