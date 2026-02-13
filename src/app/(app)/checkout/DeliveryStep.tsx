import React, { useEffect, useReducer, useRef, useState } from 'react'

import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Address } from '@/payload-types'
import Image from 'next/image'

import { Controller } from 'react-hook-form'
import type { CheckoutForm, DeliveryMethod, LiqPayPaymentData } from './checkoutTypes'

type NovaWarehouseView = {
  id: string
  label: string
  primary?: string
  secondary?: string
  categoryLabel?: string
  postalCode?: string
  index?: string
  weightInfo?: string
  sizeInfo?: string
  postomatNote?: string
}

type NovaUiState = {
  warehouses: NovaWarehouseView[]
  warehousesLoading: boolean
  warehousesError: string | null
  citySuggestions: { ref: string; name: string }[]
  cityLoading: boolean
  cityError: string | null
  warehouseQuery: string
}

type NovaUiAction =
  | { type: 'cityRequest' }
  | { type: 'citySuccess'; suggestions: { ref: string; name: string }[] }
  | { type: 'cityFailure'; error: string }
  | { type: 'cityClear' }
  | { type: 'warehousesRequest' }
  | { type: 'warehousesSuccess'; warehouses: NovaWarehouseView[] }
  | { type: 'warehousesFailure'; error: string }
  | { type: 'warehousesClear' }
  | { type: 'setWarehouseQuery'; query: string }

const initialNovaUiState: NovaUiState = {
  warehouses: [],
  warehousesLoading: false,
  warehousesError: null,
  citySuggestions: [],
  cityLoading: false,
  cityError: null,
  warehouseQuery: '',
}

function novaUiReducer(state: NovaUiState, action: NovaUiAction): NovaUiState {
  switch (action.type) {
    case 'cityRequest':
      return { ...state, cityLoading: true, cityError: null }
    case 'citySuccess':
      return { ...state, cityLoading: false, citySuggestions: action.suggestions }
    case 'cityFailure':
      return {
        ...state,
        cityLoading: false,
        cityError: action.error,
        citySuggestions: [],
      }
    case 'cityClear':
      return {
        ...state,
        cityLoading: false,
        cityError: null,
        citySuggestions: [],
      }
    case 'warehousesRequest':
      return {
        ...state,
        warehousesLoading: true,
        warehousesError: null,
      }
    case 'warehousesSuccess':
      return {
        ...state,
        warehousesLoading: false,
        warehouses: action.warehouses,
      }
    case 'warehousesFailure':
      return {
        ...state,
        warehousesLoading: false,
        warehousesError: action.error,
        warehouses: [],
      }
    case 'warehousesClear':
      return {
        ...state,
        warehousesLoading: false,
        warehousesError: null,
        warehouses: [],
      }
    case 'setWarehouseQuery':
      return { ...state, warehouseQuery: action.query }
    default:
      return state
  }
}

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

  const [novaUiState, dispatchNovaUi] = useReducer(novaUiReducer, initialNovaUiState)

  const {
    warehouses: novaWarehouses,
    warehousesLoading: novaLoading,
    warehousesError: novaError,
    citySuggestions,
    cityLoading,
    cityError,
    warehouseQuery,
  } = novaUiState

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

  const [deliveryAddressSource, setDeliveryAddressSource] = useState<'saved' | 'manual'>('manual')
  /** Only one of city or branch dropdown is visible at a time to avoid overlap and z-index issues. */
  const [activeNovaDropdown, setActiveNovaDropdown] = useState<'city' | 'branch' | null>(null)
  const novaAddressRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside the Nova address block
  useEffect(() => {
    if (activeNovaDropdown == null) return

    const handleMouseDown = (e: MouseEvent) => {
      if (novaAddressRef.current && !novaAddressRef.current.contains(e.target as Node)) {
        setActiveNovaDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [activeNovaDropdown])

  // When a Nova Poshta dropdown opens, ensure its container is fully visible in the viewport.
  useEffect(() => {
    if (!activeNovaDropdown || !novaAddressRef.current) return

    // Scroll the Nova address block into view so the dropdown is not cut off.
    novaAddressRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [activeNovaDropdown])

  // Suggest cities as user types for Nova Poshta (debounced for better responsiveness)
  useEffect(() => {
    if (!isNovaPoshtaSelected) {
      dispatchNovaUi({ type: 'cityClear' })
      return
    }

    const query = novaCity?.trim() || ''

    if (!query) {
      dispatchNovaUi({ type: 'cityClear' })
      setValue('novaCityRef', null)
      return
    }

    // Require at least 2 characters to reduce unnecessary requests.
    if (query.length < 2) {
      dispatchNovaUi({ type: 'cityClear' })
      return
    }

    const controller = new AbortController()
    let isCancelled = false

    const timeoutId = window.setTimeout(() => {
      dispatchNovaUi({ type: 'cityRequest' })

      ;(async () => {
        try {
          const res = await fetch('/api/novaposhta/cities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
            signal: controller.signal,
          })

          if (!res.ok) {
            throw new Error('Не вдалося завантажити міста.')
          }

          const json = (await res.json()) as { cities?: { ref: string; name: string }[] }

          if (!isCancelled) {
            dispatchNovaUi({
              type: 'citySuccess',
              suggestions: json.cities || [],
            })
          }
        } catch (error) {
          if (isCancelled || (error instanceof DOMException && error.name === 'AbortError')) {
            return
          }
          dispatchNovaUi({
            type: 'cityFailure',
            error:
              error instanceof Error
                ? error.message
                : 'Не вдалося завантажити міста. Спробуйте пізніше.',
          })
        }
      })()
    }, 250)

    return () => {
      isCancelled = true
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [isNovaPoshtaSelected, novaCity, setValue])

  // Load warehouses for selected Nova Poshta city
  useEffect(() => {
    if (!isNovaPoshtaSelected) {
      dispatchNovaUi({ type: 'warehousesClear' })
      dispatchNovaUi({ type: 'setWarehouseQuery', query: '' })
      return
    }

    const cityRef = novaCityRef

    if (!cityRef) {
      dispatchNovaUi({ type: 'warehousesClear' })
      return
    }

    const controller = new AbortController()
    let isCancelled = false
    dispatchNovaUi({ type: 'warehousesRequest' })

    ;(async () => {
      try {
        const res = await fetch('/api/novaposhta/warehouses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cityRef }),
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error('Не вдалося завантажити відділення.')
        }

        const json = (await res.json()) as {
          warehouses?: NovaWarehouseView[]
        }

        if (!isCancelled) {
          dispatchNovaUi({
            type: 'warehousesSuccess',
            warehouses: json.warehouses || [],
          })
        }
      } catch (error) {
        if (isCancelled || (error instanceof DOMException && error.name === 'AbortError')) {
          return
        }
        dispatchNovaUi({
          type: 'warehousesFailure',
          error:
            error instanceof Error
              ? error.message
              : 'Не вдалося завантажити відділення. Спробуйте пізніше.',
        })
      } finally {
        if (!isCancelled) {
          // No-op: state updates are handled in success / failure branches.
        }
      }
    })()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [isNovaPoshtaSelected, novaCityRef])

  return (
    <section className="grid w-full max-w-3xl gap-space-20 mx-auto min-w-0 box-border overflow-hidden">
      <header className="grid gap-space-05 min-w-0">
        <h2 className="m-0 pobut-H3 text-sys-text">Спосіб доставки та адреса</h2>
        <p className="m-0 pobut-body text-sys-text-muted wrap-break-word">
          Оберіть службу доставки та вкажіть адресу одержувача.
        </p>
        <p className="m-0 block w-full min-w-0 rounded-radius-primary bg-sys-danger/10 px-space-10 py-space-08 text-[10px] leading-relaxed text-sys-danger box-border wrap-break-word">
          Увага: вартість доставки не входить у вартість товарів і оплачується окремо за тарифами
          обраної поштової служби.
        </p>
      </header>

      <form
        className="grid gap-space-20 min-w-0 pt-space-05"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="rounded-radius-primary bg-sys-surface-2 p-space-15 tablet:p-space-20 grid gap-space-15">
          {/* Step 1: Delivery method selection */}
          <header className="grid gap-space-02">
            <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-sys-text-muted">
              Крок 1
            </p>
            <h3 className="m-0 text-sm font-semibold text-sys-text">Оберіть службу доставки</h3>
          </header>

          <div className="flex flex-col gap-space-10 tablet:flex-row tablet:gap-space-10">
            <Button
              type="button"
              onClick={() => {
                setValue('deliveryMethod', 'nova-poshta', { shouldValidate: true })
              }}
              variant={isNovaPoshtaSelected ? 'outline' : 'ghost'}
              className={[
                'flex h-[90px] w-full flex-1 items-center gap-space-08 rounded-radius-primary border px-space-15 text-left transition-colors tablet:h-[104px]',
                isNovaPoshtaSelected
                  ? 'border-sys-accent bg-sys-surface-2 shadow-shadow-sm ring-1 ring-sys-accent'
                  : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
              ].join(' ')}
            >
              <Image
                src="/images/novaposhta.png"
                alt="Нова Пошта"
                width={48}
                height={48}
                className="h-10 w-10 shrink-0 object-contain tablet:h-12 tablet:w-12"
              />
              <div className="grid min-w-0 gap-[2px]">
                <div className="flex items-center gap-space-05">
                  <p className="m-0 text-sm font-semibold text-sys-text">Нова Пошта</p>
                  {isNovaPoshtaSelected && (
                    <span className="rounded-radius-full bg-sys-accent/10 px-2 py-px text-[10px] font-semibold uppercase tracking-[0.12em] text-sys-accent">
                      Обрано
                    </span>
                  )}
                </div>
                <small className="m-0 text-xs leading-snug text-sys-text-muted wrap-break-word">
                  Доставка до відділення або поштомату Нової Пошти.
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
                'flex h-[90px] w-full flex-1 items-center gap-space-08 rounded-radius-primary border px-space-15 text-left transition-colors tablet:h-[104px]',
                isUkrposhtaSelected
                  ? 'border-sys-accent bg-sys-surface-2 shadow-shadow-sm ring-1 ring-sys-accent'
                  : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
              ].join(' ')}
            >
              <Image
                src="/images/ukrposhta.png"
                alt="Укрпошта"
                width={48}
                height={48}
                className="h-10 w-10 shrink-0 object-contain tablet:h-12 tablet:w-12"
              />
              <div className="grid min-w-0 gap-[2px]">
                <div className="flex items-center gap-space-05">
                  <p className="m-0 text-sm font-semibold text-sys-text">Укрпошта</p>
                  {isUkrposhtaSelected && (
                    <span className="rounded-radius-full bg-sys-accent/10 px-2 py-px text-[10px] font-semibold uppercase tracking-[0.12em] text-sys-accent">
                      Обрано
                    </span>
                  )}
                </div>
                <small className="m-0 text-xs leading-snug text-sys-text-muted wrap-break-word">
                  Доставка у відділення або до дверей. Оплата лише карткою.
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

            {user && (
              <div className="flex flex-wrap gap-space-08">
                <Button
                  type="button"
                  variant={deliveryAddressSource === 'saved' ? 'outline' : 'ghost'}
                  size="sm"
                  className="rounded-radius-full"
                  onClick={() => setDeliveryAddressSource('saved')}
                >
                  Збережена адреса
                </Button>
                <Button
                  type="button"
                  variant={deliveryAddressSource === 'manual' ? 'outline' : 'ghost'}
                  size="sm"
                  className="rounded-radius-full"
                  onClick={() => setDeliveryAddressSource('manual')}
                >
                  Вказати вручну
                </Button>
              </div>
            )}

          {(deliveryAddressSource === 'manual' || !user) && isNovaPoshtaSelected && (
            <div ref={novaAddressRef} className="grid gap-space-10 tablet:grid-cols-2">
              <FormItem className="relative">
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
                  onFocus={() => setActiveNovaDropdown('city')}
                  {...register('novaCity', {
                    validate: (value) =>
                      !isNovaPoshtaSelected || value.trim().length > 0 || "Місто обов'язкове.",
                  })}
                />
                {cityLoading && !cityError && activeNovaDropdown === 'city' && (
                  <p className="m-0 mt-1 text-[11px] text-sys-text-muted">Пошук міст…</p>
                )}
                {cityError && <FormError message={cityError} className="mt-1" />}
                {activeNovaDropdown === 'city' && !!citySuggestions.length && !cityError && (
                  <div className="absolute left-0 right-0 top-full z-100 mt-1 max-h-56 box-border overflow-y-auto overflow-x-hidden rounded-radius-primary border border-sys-border bg-sys-surface-2 text-xs shadow-shadow-xl scrollbar-thin">
                    {citySuggestions.map((city) => (
                      <button
                        key={city.ref}
                        type="button"
                        className="flex w-full flex-col px-4 py-3 text-left transition-colors hover:bg-sys-surface focus:bg-sys-surface focus:outline-none"
                        onClick={() => {
                          setValue('novaCity', city.name, { shouldValidate: true })
                          setValue('novaCityRef', city.ref, { shouldValidate: true })
                          dispatchNovaUi({ type: 'cityClear' })
                          setActiveNovaDropdown(null)
                        }}
                      >
                        <span className="text-[13px] font-medium text-sys-text truncate">
                          {city.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {errors.novaCity && (
                  <FormError message={errors.novaCity.message} className="mt-1" />
                )}
              </FormItem>

              <FormItem className="tablet:col-span-2">
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
                  render={({ field }) => {
                    const q = warehouseQuery.trim().toLowerCase()
                    const visibleWarehouses =
                      q.length === 0
                        ? novaWarehouses
                        : novaWarehouses.filter((wh) => {
                            const haystacks = [
                              wh.label,
                              wh.primary,
                              wh.secondary,
                              wh.index,
                              wh.postalCode,
                            ]
                              .filter(Boolean)
                              .map((v) => String(v).toLowerCase())

                            return haystacks.some((h) => h.includes(q))
                          })

                    const hasSelection =
                      typeof field.value === 'string' && field.value.trim().length > 0

                    return (
                      <div className="relative space-y-space-05">
                        <div className="flex flex-col gap-space-05 tablet:flex-row tablet:items-center tablet:gap-space-08">
                          <Input
                            id="nova-poshta-branch"
                            placeholder="Пошук за адресою або номером відділення"
                            variant="primaryFrontend"
                            className="h-10 flex-1 rounded-radius-full px-4 text-sm"
                            value={hasSelection ? field.value : warehouseQuery}
                            readOnly={hasSelection}
                            onChange={(event) => {
                              if (!hasSelection) {
                                dispatchNovaUi({
                                  type: 'setWarehouseQuery',
                                  query: event.target.value,
                                })
                              }
                            }}
                            onFocus={() => {
                              setActiveNovaDropdown('branch')
                              if (hasSelection) {
                                field.onChange('')
                                dispatchNovaUi({ type: 'setWarehouseQuery', query: '' })
                              }
                            }}
                            disabled={Boolean(paymentData) || isSubmitting || novaLoading}
                          />
                          {hasSelection && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-10 shrink-0 text-[11px] text-sys-text-muted hover:text-sys-text"
                              onClick={() => {
                                field.onChange('')
                                dispatchNovaUi({ type: 'setWarehouseQuery', query: '' })
                              }}
                            >
                              Змінити
                            </Button>
                          )}
                        </div>

                        {activeNovaDropdown === 'branch' && (!hasSelection || warehouseQuery.trim().length > 0) ? (
                          <div
                            className="absolute left-0 right-0 top-full z-100 mt-1 max-h-80 box-border space-y-space-08 overflow-y-auto overflow-x-hidden rounded-radius-primary border-2 border-sys-border bg-sys-surface-2 p-space-10 shadow-shadow-xl scrollbar-thin"
                            role="listbox"
                            aria-label="Відділення Нової Пошти"
                          >
                            {novaLoading && (
                              <p className="m-0 text-[11px] text-sys-text-muted">
                                Завантаження відділень…
                              </p>
                            )}
                            {!novaLoading && !visibleWarehouses.length && (
                              <p className="m-0 text-[11px] text-sys-text-muted">
                                {novaCity?.trim()
                                  ? warehouseQuery.trim()
                                    ? 'Відділення не знайдені за введеним запитом.'
                                    : 'Відділення не знайдені або місто вказано неточно.'
                                  : 'Спочатку оберіть місто для показу відділень.'}
                              </p>
                            )}

                            {visibleWarehouses.map((wh) => {
                              const isSelected = field.value === wh.label
                              return (
                                <button
                                  key={wh.id}
                                  type="button"
                                  onClick={() => {
                                    field.onChange(wh.label)
                                    dispatchNovaUi({ type: 'setWarehouseQuery', query: '' })
                                    setActiveNovaDropdown(null)
                                  }}
                                  className={[
                                    'flex w-full flex-col items-start gap-space-05 rounded-radius-primary px-space-10 py-space-10 text-left transition-colors',
                                    isSelected
                                      ? 'bg-sys-accent/10 ring-1 ring-sys-accent'
                                      : 'bg-sys-surface hover:bg-sys-surface-2',
                                  ].join(' ')}
                                >
                                  <div className="flex w-full items-center justify-between gap-space-05">
                                    <span className="text-[13px] font-semibold text-sys-text line-clamp-2">
                                      {wh.primary || wh.label}
                                    </span>
                                    {wh.categoryLabel && (
                                      <span className="rounded-full bg-[#E30613]/10 px-2 py-px text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E30613]">
                                        {wh.categoryLabel}
                                      </span>
                                    )}
                                  </div>

                                  {wh.secondary && (
                                    <p className="m-0 text-[11px] text-sys-text-muted line-clamp-2">
                                      {wh.secondary}
                                    </p>
                                  )}

                                  <div className="mt-[2px] flex flex-wrap gap-x-space-08 gap-y-[2px] text-[10px] text-sys-text-muted">
                                    {wh.postalCode && (
                                      <span className="rounded-full bg-sys-surface px-2 py-px">
                                        Індекс: {wh.postalCode}
                                      </span>
                                    )}
                                    {wh.index && (
                                      <span className="rounded-full bg-sys-surface px-2 py-px">
                                        Код відділення: {wh.index}
                                      </span>
                                    )}
                                    {wh.weightInfo && (
                                      <span className="rounded-full bg-sys-surface px-2 py-px">
                                        Вага: {wh.weightInfo}
                                      </span>
                                    )}
                                    {wh.sizeInfo && (
                                      <span className="rounded-full bg-sys-surface px-2 py-px">
                                        Габарити: {wh.sizeInfo}
                                      </span>
                                    )}
                                    {wh.postomatNote && (
                                      <span className="rounded-full bg-sys-surface px-2 py-px">
                                        {wh.postomatNote}
                                      </span>
                                    )}
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        ) : null}
                      </div>
                    )
                  }}
                />
                {novaError && <FormError message={novaError} className="mt-1" />}
                {errors.novaBranch && (
                  <FormError message={errors.novaBranch.message} className="mt-1" />
                )}
                {user && novaCity?.trim() && getValues('novaBranch')?.trim() && (
                  <p className="m-0 mt-space-08 text-[11px] text-sys-text-muted">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto px-0 py-0 text-[11px] text-sys-accent hover:underline"
                    >
                      Зберегти адресу доставки в обліковому записі
                    </Button>
                  </p>
                )}
              </FormItem>
            </div>
          )}

          {deliveryAddressSource === 'saved' && user && (
            <p className="m-0 rounded-radius-primary bg-sys-surface p-space-10 text-sm text-sys-text-muted">
              Оберіть збережену адресу або перейдіть на &quot;Вказати вручну&quot;. (Функція збережених адрес скоро з&apos;явиться.)
            </p>
          )}

          {(deliveryAddressSource === 'manual' || !user) && isUkrposhtaSelected && (
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
                    <span className="text-sys-danger">*</span>
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
          disabled={!deliveryStepComplete}
          onClick={onNextToPayment}
        >
          Далі
        </Button>
      </footer>
    </section>
  )
}

