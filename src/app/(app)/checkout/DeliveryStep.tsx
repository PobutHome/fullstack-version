import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormItem } from '@/components/forms/FormItem'
import { FormError } from '@/components/forms/FormError'
import { NovaPoshtaLogoIcon } from '@/components/icons/NovaPoshtaLogoIcon'
import { UkrposhtaLogoIcon } from '@/components/icons/UkrposhtaLogoIcon'
import type { Address } from '@/payload-types'

import type { CheckoutForm, DeliveryMethod, LiqPayPaymentData } from './checkoutTypes'
import { Controller } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DeliveryStepProps {
  user: { email?: string | null } | null | undefined
  // Kept optional for backward-compatibility with previous props shape,
  // not used anymore – all gating is based on payment/address state.
  email?: string
  emailEditable?: boolean
  paymentData: LiqPayPaymentData | null
  deliveryStepComplete: boolean
  deliveryMethod: DeliveryMethod
  checkoutForm: CheckoutForm
  onBackToReceiver: () => void
  onNextToPayment: () => void
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({
  user,
  paymentData,
  deliveryStepComplete,
  deliveryMethod,
  checkoutForm,
  onBackToReceiver,
  onNextToPayment,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    control,
    watch,
  } = checkoutForm

  const [novaWarehouses, setNovaWarehouses] = useState<{ id: string; label: string }[]>([])
  const [novaLoading, setNovaLoading] = useState(false)
  const [novaError, setNovaError] = useState<string | null>(null)
  const [citySuggestions, setCitySuggestions] = useState<{ ref: string; name: string }[]>([])
  const [cityLoading, setCityLoading] = useState(false)
  const [cityError, setCityError] = useState<string | null>(null)

  const novaCity = watch('novaCity')
  const novaCityRef = watch('novaCityRef')

  const onSubmit = () => {
    const values = getValues()

    if (deliveryMethod === 'nova-poshta') {
      const city = values.novaCity?.trim() || ''
      const branch = values.novaBranch?.trim() || ''

      if (!city || !branch) return

      const shippingAddress: Partial<Address> = {
        country: 'UA',
        city,
        addressLine1: `Нова Пошта, відділення: ${branch}`,
        state: undefined,
        postalCode: undefined,
        company: 'Нова Пошта',
        title: 'Доставка у відділення Нової Пошти',
      }

      // Mirror the summary shape expectations by storing normalized fields
      setValue('ukrCity', '')
      setValue('ukrRegion', '')
      setValue('ukrPostcode', '')
      setValue('ukrStreet', '')
      setValue('ukrBuilding', '')
      setValue('ukrOffice', '')
      setValue('ukrBranchCode', '')

      return
    }

    const city = values.ukrCity?.trim() || ''
    const postcode = values.ukrPostcode?.trim() || ''
    const region = values.ukrRegion?.trim() || ''
    const street = values.ukrStreet?.trim() || ''
    const building = values.ukrBuilding?.trim() || ''
    const office = values.ukrOffice?.trim() || ''
    const branchCode = values.ukrBranchCode?.trim() || ''

    if (!city || !postcode || !region || !street || !building) return

    const shippingAddress: Partial<Address> = {
      country: 'UA',
      city,
      state: region,
      postalCode: postcode,
      addressLine1: `${street}, ${building}`,
      addressLine2: office ? `Квартира / офіс: ${office}` : undefined,
      company: 'Укрпошта',
      title: branchCode ? `Укрпошта, відділення ${branchCode}` : 'Укрпошта',
    }

    setValue('novaCity', '')
    setValue('novaBranch', '')
  }

  const isNovaPoshtaSelected = deliveryMethod === 'nova-poshta'
  const isUkrposhtaSelected = deliveryMethod === 'ukrposhta'

  // Suggest cities as user types for Nova Poshta
  useEffect(() => {
    if (!isNovaPoshtaSelected) {
      setCitySuggestions([])
      setCityError(null)
      setCityLoading(false)
      return
    }

    const query = novaCity?.trim()

    if (!query || query.length < 2) {
      setCitySuggestions([])
      setCityError(null)
      setCityLoading(false)
      setValue('novaCityRef', null)
      return
    }

    let isCancelled = false
    setCityLoading(true)
    setCityError(null)

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch('/api/novaposhta/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })

        if (!res.ok) {
          throw new Error('Не вдалося завантажити міста.')
        }

        const json = (await res.json()) as { cities?: { ref: string; name: string }[] }

        if (!isCancelled) {
          setCitySuggestions(json.cities || [])
        }
      } catch (error) {
        if (!isCancelled) {
          setCityError(
            error instanceof Error
              ? error.message
              : 'Не вдалося завантажити міста. Спробуйте пізніше.',
          )
          setCitySuggestions([])
        }
      } finally {
        if (!isCancelled) {
          setCityLoading(false)
        }
      }
    }, 300)

    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [isNovaPoshtaSelected, novaCity, setValue])

  // Load warehouses for selected Nova Poshta city
  useEffect(() => {
    if (!isNovaPoshtaSelected) {
      setNovaWarehouses([])
      setNovaError(null)
      setNovaLoading(false)
      return
    }

    const cityRef = novaCityRef

    if (!cityRef) {
      setNovaWarehouses([])
      setNovaError(null)
      setNovaLoading(false)
      return
    }

    let isCancelled = false
    setNovaLoading(true)
    setNovaError(null)

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch('/api/novaposhta/warehouses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cityRef }),
        })

        if (!res.ok) {
          throw new Error('Не вдалося завантажити відділення.')
        }

        const json = (await res.json()) as { warehouses?: { id: string; label: string }[] }

        if (!isCancelled) {
          setNovaWarehouses(json.warehouses || [])
        }
      } catch (error) {
        if (!isCancelled) {
          setNovaError(
            error instanceof Error
              ? error.message
              : 'Не вдалося завантажити відділення. Спробуйте пізніше.',
          )
          setNovaWarehouses([])
        }
      } finally {
        if (!isCancelled) {
          setNovaLoading(false)
        }
      }
    }, 400)

    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [isNovaPoshtaSelected, novaCityRef])

  return (
    <section className="grid gap-space-20 max-w-3xl">
      <header className="grid gap-space-05">
        <h2 className="m-0 pobut-H3 text-sys-text">Спосіб доставки та адреса</h2>
        <p className="m-0 pobut-body text-sys-text-muted">
          Оберіть службу доставки та вкажіть адресу одержувача.
        </p>
        <p className="m-0 text-xs text-sys-text-muted">
          Вартість доставки оплачується за тарифами поштового оператора та може бути додана до суми
          замовлення.
        </p>
      </header>

      <form
        className="grid gap-space-20"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="rounded-radius-primary border border-sys-border bg-sys-surface-2 p-space-15 grid gap-space-15">
          {/* Step 1: Delivery method selection */}
          <header className="grid gap-space-02">
            <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-sys-text-muted">
              Крок 1
            </p>
            <h3 className="m-0 text-sm font-semibold text-sys-text">Оберіть службу доставки</h3>
          </header>

          <div className="grid gap-space-10 tablet:grid-cols-2">
            <Button
              type="button"
              onClick={() => {
                setValue('deliveryMethod', 'nova-poshta', { shouldValidate: true })
              }}
              variant={isNovaPoshtaSelected ? 'outline' : 'ghost'}
              className={[
                'flex items-center gap-space-10 rounded-radius-primary px-space-15 py-space-15 text-left transition-colors',
                isNovaPoshtaSelected
                  ? 'border border-sys-accent bg-sys-surface-2'
                  : 'border border-sys-border bg-sys-surface hover:bg-sys-surface-2',
              ].join(' ')}
            >
              <NovaPoshtaLogoIcon className="shrink-0" />
              <div className="grid gap-[2px] min-w-0">
                <p className="m-0 text-sm font-semibold text-sys-text truncate">Нова Пошта</p>
                <small className="m-0 text-[11px] text-sys-text-muted">
                  Доставка до відділення Нової Пошти. Надалі тут з&apos;явиться карта відділень та
                  поштоматів.
                </small>
              </div>
            </Button>

            <Button
              type="button"
              onClick={() => {
                setValue('deliveryMethod', 'ukrposhta', { shouldValidate: true })
              }}
              variant={isUkrposhtaSelected ? 'outline' : 'ghost'}
              className={[
                'flex items-center gap-space-10 rounded-radius-primary px-space-15 py-space-15 text-left transition-colors',
                isUkrposhtaSelected
                  ? 'border border-sys-accent bg-sys-surface-2'
                  : 'border border-sys-border bg-sys-surface hover:bg-sys-surface-2',
              ].join(' ')}
            >
              <UkrposhtaLogoIcon className="shrink-0" />
              <div className="grid gap-[2px] min-w-0">
                <p className="m-0 text-sm font-semibold text-sys-text truncate">Укрпошта</p>
                <small className="m-0 text-[11px] text-sys-text-muted">
                  Доставка у відділення або до дверей. Для цього способу доступна лише оплата
                  карткою.
                </small>
              </div>
            </Button>
          </div>

          {/* Step 2: Address form */}
          <section className="grid gap-space-10">
            <header className="grid gap-space-02">
              <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-sys-text-muted">
                Крок 2
              </p>
              <h3 className="m-0 text-sm font-semibold text-sys-text">Адреса доставки</h3>
            </header>

          {isNovaPoshtaSelected && (
            <div className="grid gap-space-10 tablet:grid-cols-2">
              <FormItem>
                <Label
                  htmlFor="nova-poshta-city"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Місто / населений пункт<span className="text-sys-danger">*</span>
                </Label>
                <Input
                  id="nova-poshta-city"
                  placeholder="Наприклад, Київ"
                  variant="primaryFrontend"
                  className="h-11 rounded-radius-full px-4"
                  disabled={Boolean(paymentData) || isSubmitting}
                  {...register('novaCity', {
                    validate: (value) =>
                      !isNovaPoshtaSelected || value.trim().length > 0 || "Місто обов'язкове.",
                  })}
                />
                {cityLoading && (
                  <p className="m-0 mt-1 text-[11px] text-sys-text-muted">Пошук міст…</p>
                )}
                {cityError && <FormError message={cityError} className="mt-1" />}
                {!!citySuggestions.length && (
                  <div className="mt-1 max-h-40 overflow-auto rounded-radius-primary border border-sys-border bg-sys-surface-2 text-xs shadow-shadow-sm">
                    {citySuggestions.map((city) => (
                      <button
                        key={city.ref}
                        type="button"
                        className="w-full px-3 py-2 text-left hover:bg-sys-surface"
                        onClick={() => {
                          setValue('novaCity', city.name, { shouldValidate: true })
                          setValue('novaCityRef', city.ref, { shouldValidate: true })
                          setCitySuggestions([])
                        }}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                )}
                {errors.novaCity && (
                  <FormError message={errors.novaCity.message} className="mt-1" />
                )}
              </FormItem>

              <FormItem>
                <Label
                  htmlFor="nova-poshta-branch"
                  className="text-sys-text font-semibold font-unbounded text-sm"
                >
                  Відділення / поштомат<span className="text-sys-danger">*</span>
                </Label>
                <Controller
                  control={control}
                  name="novaBranch"
                  rules={{
                    validate: (value) =>
                      !isNovaPoshtaSelected ||
                      (value && value.trim().length > 0) ||
                      "Відділення обов'язкове.",
                  }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={
                        Boolean(paymentData) || isSubmitting || novaLoading || !novaWarehouses.length
                      }
                    >
                      <SelectTrigger
                        id="nova-poshta-branch"
                        variant="primaryFrontend"
                        className="mb-0 h-11 w-full rounded-radius-full px-4"
                      >
                        <SelectValue
                          placeholder={
                            novaLoading
                              ? 'Завантаження відділень…'
                              : novaWarehouses.length
                                ? 'Оберіть відділення'
                                : novaCity?.trim()
                                  ? 'Відділення не знайдені або місто неточне'
                                  : 'Спочатку вкажіть місто'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent variant="primaryFrontend">
                        {novaWarehouses.map((wh) => (
                          <SelectItem key={wh.id} value={wh.label} variant="primaryFrontend">
                            {wh.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {novaError && <FormError message={novaError} className="mt-1" />}
                {errors.novaBranch && (
                  <FormError message={errors.novaBranch.message} className="mt-1" />
                )}
              </FormItem>
            </div>
          )}

          {isUkrposhtaSelected && (
            <div className="grid gap-space-10">
              <div className="grid gap-space-10 tablet:grid-cols-2">
                <FormItem>
                  <Label
                    htmlFor="ukrposhta-country"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Країна
                  </Label>
                  <Input
                    id="ukrposhta-country"
                    readOnly
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4 bg-sys-surface"
                    {...register('ukrCountry')}
                  />
                </FormItem>

                <FormItem>
                  <Label
                    htmlFor="ukrposhta-region"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Область<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-region"
                    placeholder="Наприклад, Київська"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData) || isSubmitting}
                    {...register('ukrRegion', {
                      validate: (value) =>
                        !isUkrposhtaSelected ||
                        value.trim().length > 0 ||
                        "Область обов'язкова.",
                    })}
                  />
                  {errors.ukrRegion && (
                    <FormError message={errors.ukrRegion.message} className="mt-1" />
                  )}
                </FormItem>
              </div>

              <div className="grid gap-space-10 tablet:grid-cols-3">
                <FormItem className="tablet:col-span-2">
                  <Label
                    htmlFor="ukrposhta-city"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Місто / населений пункт<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-city"
                    placeholder="Наприклад, Бровари"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData) || isSubmitting}
                    {...register('ukrCity', {
                      validate: (value) =>
                        !isUkrposhtaSelected ||
                        value.trim().length > 0 ||
                        "Місто обов'язкове.",
                    })}
                  />
                  {errors.ukrCity && (
                    <FormError message={errors.ukrCity.message} className="mt-1" />
                  )}
                </FormItem>

                <FormItem>
                  <Label
                    htmlFor="ukrposhta-postcode"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Поштовий індекс<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-postcode"
                    placeholder="Наприклад, 07400"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData) || isSubmitting}
                    {...register('ukrPostcode', {
                      validate: (value) =>
                        !isUkrposhtaSelected ||
                        value.trim().length > 0 ||
                        "Поштовий індекс обов'язковий.",
                    })}
                  />
                  {errors.ukrPostcode && (
                    <FormError message={errors.ukrPostcode.message} className="mt-1" />
                  )}
                </FormItem>
              </div>

              <div className="grid gap-space-10 tablet:grid-cols-3">
                <FormItem className="tablet:col-span-2">
                  <Label
                    htmlFor="ukrposhta-street"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Вулиця<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-street"
                    placeholder="Наприклад, вул. Незалежності"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData) || isSubmitting}
                    {...register('ukrStreet', {
                      validate: (value) =>
                        !isUkrposhtaSelected ||
                        value.trim().length > 0 ||
                        "Вулиця обов'язкова.",
                    })}
                  />
                  {errors.ukrStreet && (
                    <FormError message={errors.ukrStreet.message} className="mt-1" />
                  )}
                </FormItem>

                <FormItem>
                  <Label
                    htmlFor="ukrposhta-building"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Будинок<span className="text-sys-danger">*</span>
                  </Label>
                  <Input
                    id="ukrposhta-building"
                    placeholder="Наприклад, 10Б"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData) || isSubmitting}
                    {...register('ukrBuilding', {
                      validate: (value) =>
                        !isUkrposhtaSelected ||
                        value.trim().length > 0 ||
                        "Будинок обов'язковий.",
                    })}
                  />
                  {errors.ukrBuilding && (
                    <FormError message={errors.ukrBuilding.message} className="mt-1" />
                  )}
                </FormItem>
              </div>

              <div className="grid gap-space-10 tablet:grid-cols-2">
                <FormItem>
                  <Label
                    htmlFor="ukrposhta-office"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Квартира / офіс
                  </Label>
                  <Input
                    id="ukrposhta-office"
                    placeholder="Необов'язково"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData) || isSubmitting}
                    {...register('ukrOffice')}
                  />
                </FormItem>

                <FormItem>
                  <Label
                    htmlFor="ukrposhta-branch-code"
                    className="text-sys-text font-semibold font-unbounded text-sm"
                  >
                    Код відділення Укрпошти (індекс відділення)
                  </Label>
                  <Input
                    id="ukrposhta-branch-code"
                    placeholder="Наприклад, 12345"
                    variant="primaryFrontend"
                    className="h-11 rounded-radius-full px-4"
                    disabled={Boolean(paymentData) || isSubmitting}
                    {...register('ukrBranchCode', {
                      validate: (value) =>
                        !isUkrposhtaSelected ||
                        value.trim().length > 0 ||
                        'Код відділення обовʼязковий.',
                    })}
                  />
                  {errors.ukrBranchCode && (
                    <FormError message={errors.ukrBranchCode.message} className="mt-1" />
                  )}
                </FormItem>
              </div>
            </div>
          )}

            <div className="flex justify-start tablet:justify-end pt-space-05">
              <Button
                type="submit"
                className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active"
                disabled={Boolean(paymentData) || isSubmitting}
              >
                Зберегти адресу доставки
              </Button>
            </div>
          </section>
        </section>

        {/* Step 3: Delivery summary */}
        {(() => {
          const currentNovaCity = getValues('novaCity')?.trim()
          const currentNovaBranch = getValues('novaBranch')?.trim()
          const currentUkrCity = getValues('ukrCity')?.trim()
          const currentUkrPostcode = getValues('ukrPostcode')?.trim()
          const currentUkrRegion = getValues('ukrRegion')?.trim()
          const currentUkrStreet = getValues('ukrStreet')?.trim()
          const currentUkrBuilding = getValues('ukrBuilding')?.trim()

          const novaReady = Boolean(currentNovaCity && currentNovaBranch)
          const ukrReady = Boolean(
            currentUkrCity && currentUkrPostcode && currentUkrRegion && currentUkrStreet && currentUkrBuilding,
          )

          if (deliveryMethod === 'nova-poshta' && !novaReady) return null
          if (deliveryMethod === 'ukrposhta' && !ukrReady) return null

          return (
            <section className="rounded-radius-primary bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-05">
              <p className="m-0 pobut-body text-sys-text font-semibold">Обрана адреса доставки</p>
              <p className="m-0 text-xs text-sys-text-muted">
                {deliveryMethod === 'nova-poshta' ? (
                  <>
                    {currentNovaCity && <span>{currentNovaCity}, </span>}
                    {currentNovaBranch && (
                      <span>{`Нова Пошта, відділення: ${currentNovaBranch}`}</span>
                    )}
                  </>
                ) : (
                  <>
                    {currentUkrStreet && <span>{currentUkrStreet}, </span>}
                    {currentUkrBuilding && <span>{currentUkrBuilding}, </span>}
                    {getValues('ukrOffice')?.trim() && (
                      <span>{`Квартира / офіс: ${getValues('ukrOffice')?.trim()}, `}</span>
                    )}
                    {currentUkrCity && <span>{currentUkrCity}, </span>}
                    {currentUkrPostcode && <span>{currentUkrPostcode}, </span>}
                    {currentUkrRegion && <span>{currentUkrRegion}, </span>}
                    <span>Україна</span>
                  </>
                )}
              </p>
            </section>
          )
        })()}
      </form>

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

