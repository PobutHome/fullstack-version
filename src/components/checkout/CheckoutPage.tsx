'use client'

import { Media } from '@/components/Media'
import { Message } from '@/components/Message'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AddressItem } from '@/components/addresses/AddressItem'
import { CreateAddressModal } from '@/components/addresses/CreateAddressModal'
import { CheckoutAddresses } from '@/components/checkout/CheckoutAddresses'
import { FormItem } from '@/components/forms/FormItem'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Checkbox } from '@/components/ui/checkbox'
import { Address } from '@/payload-types'
import { useAddresses, useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { toast } from 'sonner'

type LiqPayPaymentData = {
  checkoutURL: string
  data: string
  signature: string
  orderID: string
}

export const CheckoutPage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { cart } = useCart()
  const [error, setError] = useState<null | string>(null)
  const [email, setEmail] = useState('')
  const [emailEditable, setEmailEditable] = useState(true)
  const [paymentData, setPaymentData] = useState<null | LiqPayPaymentData>(null)
  const { initiatePayment } = usePayments()
  const { addresses } = useAddresses()
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>()
  const [billingAddress, setBillingAddress] = useState<Partial<Address>>()
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true)
  const [isProcessingPayment, setProcessingPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card')

  type CheckoutStepId = 'cart' | 'receiver' | 'delivery' | 'payment'
  const steps: { id: CheckoutStepId; title: string; description: string }[] = [
    {
      id: 'cart',
      title: 'Товари',
      description: 'Перевірте склад кошика та суму замовлення.',
    },
    {
      id: 'receiver',
      title: 'Одержувач',
      description: 'Контактні дані та спосіб оформлення.',
    },
    {
      id: 'delivery',
      title: 'Доставка',
      description: 'Спосіб доставки та адреса.',
    },
    {
      id: 'payment',
      title: 'Оплата',
      description: 'Вибір способу оплати.',
    },
  ]

  const [currentStep, setCurrentStep] = useState<CheckoutStepId>('cart')

  const formRef = useRef<HTMLFormElement | null>(null)
  const canSubmitPayment = useMemo(
    () => Boolean(paymentData?.data && paymentData?.signature && paymentData?.checkoutURL),
    [paymentData],
  )

  const cartIsEmpty = !cart || !cart.items || !cart.items.length

  const receiverStepComplete = useMemo(
    () => Boolean(user || (!!email && !emailEditable)),
    [email, emailEditable, user],
  )

  const deliveryStepComplete = useMemo(
    () => Boolean(billingAddress && (billingAddressSameAsShipping || shippingAddress)),
    [billingAddress, billingAddressSameAsShipping, shippingAddress],
  )

  const canPreparePayment = useMemo(
    () => Boolean((email || user) && deliveryStepComplete),
    [deliveryStepComplete, email, user],
  )

  const canGoToStep = useCallback(
    (target: CheckoutStepId) => {
      if (target === 'cart') return true
      if (target === 'receiver') return true
      if (target === 'delivery') return receiverStepComplete
      if (target === 'payment') return receiverStepComplete && deliveryStepComplete
      return false
    },
    [deliveryStepComplete, receiverStepComplete],
  )

  const goToNextStep = useCallback(() => {
    if (currentStep === 'cart') {
      setCurrentStep('receiver')
    } else if (currentStep === 'receiver' && receiverStepComplete) {
      setCurrentStep('delivery')
    } else if (currentStep === 'delivery' && deliveryStepComplete) {
      setCurrentStep('payment')
    }
  }, [currentStep, deliveryStepComplete, receiverStepComplete])

  // On initial load wait for addresses to be loaded and check to see if we can prefill a default one
  useEffect(() => {
    if (!shippingAddress) {
      if (addresses && addresses.length > 0) {
        const defaultAddress = addresses[0]
        if (defaultAddress) {
          setBillingAddress(defaultAddress)
        }
      }
    }
  }, [addresses, shippingAddress])

  useEffect(() => {
    return () => {
      setShippingAddress(undefined)
      setBillingAddress(undefined)
      setBillingAddressSameAsShipping(true)
      setEmail('')
      setEmailEditable(true)
    }
  }, [])

  const initiatePaymentIntent = useCallback(
    async (paymentID: string) => {
      try {
        const paymentData = (await initiatePayment(paymentID, {
          additionalData: {
            ...(email ? { customerEmail: email } : user?.email ? { customerEmail: user.email } : {}),
            billingAddress,
            shippingAddress: billingAddressSameAsShipping ? billingAddress : shippingAddress,
          },
        })) as unknown as LiqPayPaymentData

        if (paymentData) {
          setPaymentData(paymentData)
        }
      } catch (error) {
        const errorData = error instanceof Error ? JSON.parse(error.message) : {}
        let errorMessage = 'An error occurred while initiating payment.'

        if (errorData?.cause?.code === 'OutOfStock') {
          errorMessage = 'One or more items in your cart are out of stock.'
        }

        setError(errorMessage)
        toast.error(errorMessage)
      }
    },
    [billingAddress, billingAddressSameAsShipping, email, initiatePayment, shippingAddress],
  )

  const handleCashOnDelivery = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (!canPreparePayment) return
      toast.info(
        'Замовлення з післяплатою буде оброблене менеджером. Ми зв’яжемося з вами для підтвердження.',
      )
    },
    [canPreparePayment],
  )

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

            <Button asChild className="rounded-radius-full px-6">
              <Link href="/catalog">Перейти до каталогу</Link>
            </Button>
          </InnerSection>
        </Container>
      </Section>
    )
  }

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const totalStepTransitions = Math.max(steps.length - 1, 1)
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentStepIndex / totalStepTransitions) * 100),
  )

  return (
    <Section aria-labelledby="checkout-title" className="pb-space-50">
      <Container>
        <InnerSection className="grid gap-layout-gap-2">
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
            <div className="rounded-radius-primary border border-sys-accent bg-sys-surface shadow-shadow-sm">
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
                    {steps.map((step, index) => {
                      const isActive = step.id === currentStep
                      const isCompleted = index < currentStepIndex
                      const isDisabled = !canGoToStep(step.id)

                      return (
                        <li key={step.id} className="flex-1 min-w-0">
                          <button
                            type="button"
                            disabled={isDisabled}
                            aria-current={isActive ? 'step' : undefined}
                            onClick={() => {
                              if (canGoToStep(step.id)) setCurrentStep(step.id)
                            }}
                            className={[
                              'group w-full flex flex-col items-center gap-space-05 text-center transition-colors',
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
                          </button>
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
                <section className="grid gap-space-20">
                  <header className="grid gap-space-05">
                    <h2 className="m-0 pobut-H3 text-sys-text">Товари в замовленні</h2>
                    <p className="m-0 pobut-body text-sys-text-muted">
                      Перевірте склад кошика, кількість та підсумкову суму перед переходом до
                      заповнення даних одержувача.
                    </p>
                  </header>

                  <div className="grid gap-space-20">
                    <section className="grid gap-space-15">
                      {cart.items?.map((item, index) => {
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
                              <div className="flex items-stretch justify-stretch h-20 w-20 p-space-10 rounded-radius-lg border border-sys-border bg-sys-surface-2">
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
                                <div className="flex flex-col gap-[2px] min-w-0">
                                  <p className="m-0 text-sm font-medium text-sys-text line-clamp-2">
                                    {title}
                                  </p>
                                  {variant && typeof variant === 'object' && (
                                    <p className="m-0 text-[11px] font-mono text-sys-text-muted tracking-[0.12em] uppercase">
                                      {variant.options
                                        ?.map((option) => {
                                          if (typeof option === 'object') return option.label
                                          return null
                                        })
                                        .join(', ')}
                                    </p>
                                  )}
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
                    </section>

                    <section className="border-t border-sys-border pt-space-15 flex justify-between items-center gap-space-10">
                      <div className="grid gap-[2px]">
                        <small className="m-0 text-[11px] uppercase tracking-[0.18em] text-sys-text-muted">
                          Всього до оплати
                        </small>
                        <p className="m-0 text-xs text-sys-text-muted">
                          За потреби ви можете повернутися до цього кроку та змінити склад кошика.
                        </p>
                      </div>
                      <Price
                        className="text-2xl font-semibold text-sys-text"
                        amount={cart.subtotal || 0}
                      />
                    </section>
                  </div>

                  <footer className="pt-space-15 flex justify-end">
                    <Button
                      type="button"
                      size="lg"
                      className="rounded-radius-full px-space-20"
                      onClick={goToNextStep}
                    >
                      До даних одержувача
                    </Button>
                  </footer>
                </section>
              )}

              {/* Step 2: Receiver */}
              {currentStep === 'receiver' && (
                <section className="grid gap-space-20">
                  <header className="grid gap-space-05">
                    <h2 className="m-0 pobut-H3 text-sys-text">Дані одержувача</h2>
                    <p className="m-0 pobut-body text-sys-text-muted">
                      Оформіть замовлення як зареєстрований користувач або як гість.
                    </p>
                  </header>

                  <div className="grid gap-space-20">
                    {!user && (
                      <section className="rounded-radius-primary border border-dashed border-sys-accent bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-10">
                        <div className="grid gap-space-05">
                          <p className="m-0 pobut-body text-sys-text font-semibold">
                            Маєте акаунт? Увійдіть для швидшого оформлення.
                          </p>
                          <p className="m-0 pobut-body text-sys-text-muted">
                            Ваші збережені адреси та дані будуть підставлені автоматично.
                          </p>
                        </div>
                        <div className="flex flex-col gap-space-10 tablet:flex-row tablet:items-center tablet:justify-start">
                          <Button asChild variant="outline" size="sm" className="rounded-radius-full">
                            <Link href="/login">Увійти</Link>
                          </Button>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="rounded-radius-full text-sys-accent"
                          >
                            <Link href="/create-account">Створити акаунт</Link>
                          </Button>
                        </div>
                      </section>
                    )}

                    {user ? (
                      <section className="rounded-radius-primary border border-sys-accent bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-05">
                        <p className="m-0 pobut-body text-sys-text">
                          Ви оформлюєте замовлення як{' '}
                          <span className="font-semibold">{user.email}</span>.
                        </p>
                        <p className="m-0 text-xs text-sys-text-muted">
                          Не ви?{' '}
                          <Link className="underline" href="/logout">
                            Вийти з акаунту
                          </Link>
                          .
                        </p>
                      </section>
                    ) : (
                      <section className="rounded-radius-primary border border-sys-accent bg-sys-surface-2 px-space-15 py-space-20 grid gap-space-15">
                        <p className="m-0 pobut-body text-sys-text">
                          Або продовжуйте як гість – вкажіть email для отримання підтвердження та
                          статусу замовлення.
                        </p>

                        <FormItem className="mb-0">
                          <Label
                            htmlFor="email"
                            className="text-sys-text font-semibold font-unbounded text-sm"
                          >
                            Email
                          </Label>
                          <Input
                            disabled={!emailEditable}
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            placeholder="name@example.com"
                            variant="primaryFrontend"
                            className="h-12 rounded-radius-full px-6"
                          />
                        </FormItem>

                        <div>
                          <Button
                            disabled={!email || !emailEditable}
                            onClick={(e) => {
                              e.preventDefault()
                              setEmailEditable(false)
                            }}
                            className="rounded-radius-full px-space-20"
                          >
                            Продовжити як гість
                          </Button>
                        </div>
                      </section>
                    )}
                  </div>

                  <footer className="pt-space-15 flex items-center justify-between gap-space-10">
                    <p className="m-0 text-xs text-sys-text-muted">
                      Ви зможете зберегти адресу доставки на наступних кроках.
                    </p>
                    <Button
                      type="button"
                      size="lg"
                      className="rounded-radius-full px-space-20"
                      disabled={!receiverStepComplete}
                      onClick={goToNextStep}
                    >
                      До доставки
                    </Button>
                  </footer>
                </section>
              )}

              {/* Step 3: Delivery & addresses */}
              {currentStep === 'delivery' && (
                <section className="grid gap-space-20">
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
                                  setBillingAddress(undefined)
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
                          setAddress={setBillingAddress}
                        />
                      ) : (
                        <CreateAddressModal
                          disabled={!email || Boolean(emailEditable)}
                          callback={(address) => {
                            setBillingAddress(address)
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
                          disabled={Boolean(
                            paymentData || (!user && (!email || Boolean(emailEditable))),
                          )}
                          onCheckedChange={(state) => {
                            setBillingAddressSameAsShipping(state as boolean)
                          }}
                        />
                        <Label
                          htmlFor="shippingTheSameAsBilling"
                          className="text-sm font-medium text-sys-text"
                        >
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
                                    setShippingAddress(undefined)
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
                            setAddress={setShippingAddress}
                          />
                        ) : (
                          <CreateAddressModal
                            callback={(address) => {
                              setShippingAddress(address)
                            }}
                            disabled={!email || Boolean(emailEditable)}
                            skipSubmission={true}
                          />
                        )}
                      </section>
                    )}

                    <section className="rounded-radius-primary border border-dashed border-sys-accent bg-sys-surface-2 px-space-15 py-space-15 grid gap-space-05">
                      <p className="m-0 pobut-body text-sys-text font-semibold">
                        Служби доставки: Нова Пошта, Укрпошта, кур&apos;єр.
                      </p>
                      <p className="m-0 text-xs text-sys-text-muted">
                        Підключення карти відділень Нової Пошти та розрахунок вартості доставки
                        можна реалізувати через їх офіційний API. Поточна версія форми вже готова до
                        збереження вибраних адрес.
                      </p>
                    </section>
                  </div>

                  <footer className="pt-space-15 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-space-10">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep('receiver')}
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
                        onClick={() => setCurrentStep('receiver')}
                      >
                        Назад
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        className="rounded-radius-full px-space-20"
                        disabled={!deliveryStepComplete}
                        onClick={goToNextStep}
                      >
                        До оплати
                      </Button>
                    </div>
                  </footer>
                </section>
              )}

              {/* Step 4: Payment */}
              {currentStep === 'payment' && (
                <section className="grid gap-space-20 mb-space-30">
                  <header className="grid gap-space-05">
                    <h2 className="m-0 pobut-H3 text-sys-text">Спосіб оплати</h2>
                    <p className="m-0 pobut-body text-sys-text-muted">
                      Оберіть зручний спосіб оплати. Для оплати карткою використовується LiqPay.
                    </p>
                  </header>

                  <div className="grid gap-space-20">
                    <section className="grid gap-space-10 tablet:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={[
                          'flex flex-col items-start gap-[2px] rounded-radius-primary border px-space-15 py-space-15 text-left transition-colors',
                          paymentMethod === 'card'
                            ? 'border-sys-accent bg-sys-surface-2'
                            : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
                        ].join(' ')}
                      >
                        <p className="m-0 text-sm font-semibold text-sys-text">
                          Оплата карткою (LiqPay)
                        </p>
                        <small className="m-0 text-[11px] text-sys-text-muted">
                          Миттєва онлайн-оплата банківською карткою через захищений платіжний шлюз
                          LiqPay.
                        </small>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={[
                          'flex flex-col items-start gap-[2px] rounded-radius-primary border px-space-15 py-space-15 text-left transition-colors',
                          paymentMethod === 'cod'
                            ? 'border-sys-accent bg-sys-surface-2'
                            : 'border-sys-border bg-sys-surface hover:bg-sys-surface-2',
                        ].join(' ')}
                      >
                        <p className="m-0 text-sm font-semibold text-sys-text">Накладений платіж</p>
                        <small className="m-0 text-[11px] text-sys-text-muted">
                          Оплата при отриманні на відділенні поштового оператора (Нова Пошта,
                          Укрпошта) або кур&apos;єру.
                        </small>
                      </button>
                    </section>

                    {paymentMethod === 'card' && !paymentData && (
                      <section className="grid gap-space-10">
                        <p className="m-0 pobut-body text-sys-text-muted">
                          Натисніть кнопку нижче, щоб сформувати платіж через LiqPay. Після цього ви
                          перейдете на сторінку банку для завершення оплати.
                        </p>
                        <div>
                          <Button
                            className="rounded-radius-full px-space-20"
                            disabled={!canPreparePayment}
                            onClick={(e) => {
                              e.preventDefault()
                              void initiatePaymentIntent('liqpay')
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
                          Замовлення з накладеним платежем буде підтверджено менеджером. Оплату ви
                          здійсните при отриманні.
                        </p>
                        <div>
                          <Button
                            className="rounded-radius-full px-space-20"
                            variant="outline"
                            disabled={!canPreparePayment}
                            onClick={handleCashOnDelivery}
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
                            router.refresh()
                          }}
                          className="rounded-radius-full px-space-20"
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
                          ref={formRef}
                          method="POST"
                          action={paymentData.checkoutURL}
                          acceptCharset="utf-8"
                          className="flex flex-col gap-space-10"
                        >
                          <input type="hidden" name="data" value={paymentData.data} />
                          <input type="hidden" name="signature" value={paymentData.signature} />

                          <Button
                            type="submit"
                            className="rounded-radius-full px-space-20"
                            disabled={!canSubmitPayment}
                            onClick={() => setProcessingPayment(true)}
                          >
                            Перейти до LiqPay
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            className="self-start text-xs px-0"
                            onClick={() => setPaymentData(null)}
                          >
                            Скасувати оплату
                          </Button>
                        </form>
                      </section>
                    )}
                  </div>

                  <footer className="pt-space-15 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-space-10">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep('delivery')}
                      className="self-start rounded-radius-full px-space-15"
                    >
                      Повернутися до доставки
                    </Button>
                  </footer>
                </section>
              )}

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
            </section>
          </div>
        </div>
        </InnerSection>
      </Container>
    </Section>
  )
}
