import { useAuth } from '@/providers/Auth'
import { Address } from '@/payload-types'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'

import type {
  CheckoutStepId,
  CheckoutForm,
  CheckoutFormData,
  DeliveryMethod,
  LiqPayPaymentData,
} from './checkoutTypes'

export const CHECKOUT_STEPS: { id: CheckoutStepId; title: string; description: string }[] = [
  {
    id: 'cart',
    title: 'Товари',
    description: 'Керуйте складом кошика, кількістю та сумою замовлення.',
  },
  {
    id: 'delivery',
    title: 'Доставка',
    description: 'Оберіть службу доставки та вкажіть адресу.',
  },
  {
    id: 'receiver',
    title: 'Одержувач',
    description: 'Контактні дані одержувача.',
  },
  {
    id: 'review',
    title: 'Перевірка',
    description: 'Перевірте всі дані перед оплатою.',
  },
  {
    id: 'payment',
    title: 'Оплата',
    description: 'Вибір способу оплати.',
  },
]

type UseCheckoutControllerResult = {
  user: ReturnType<typeof useAuth>['user']
  cart: ReturnType<typeof useCart>['cart']
  error: string | null
  setError: (error: string | null) => void
  paymentData: LiqPayPaymentData | null
  setPaymentData: (data: LiqPayPaymentData | null) => void
  isProcessingPayment: boolean
  setProcessingPayment: (value: boolean) => void
  currentStep: CheckoutStepId
  setCurrentStep: (step: CheckoutStepId) => void
  checkoutForm: CheckoutForm
  deliveryMethod: DeliveryMethod
  paymentMethod: 'card' | 'cod'
  canSubmitPayment: boolean
  cartIsEmpty: boolean
  receiverStepComplete: boolean
  deliveryStepComplete: boolean
  canPreparePayment: boolean
  canGoToStep: (target: CheckoutStepId) => boolean
  goToNextStep: () => void
  initiatePaymentIntent: (paymentID: string) => Promise<void>
  handleCashOnDelivery: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function useCheckoutController(): UseCheckoutControllerResult {
  const { user } = useAuth()
  const { cart } = useCart()
  const { initiatePayment } = usePayments()

  const [error, setError] = useState<string | null>(null)
  const [paymentData, setPaymentData] = useState<null | LiqPayPaymentData>(null)
  const [isProcessingPayment, setProcessingPayment] = useState(false)
  const [currentStep, setCurrentStep] = useState<CheckoutStepId>('cart')

  const checkoutForm = useForm<CheckoutFormData>({
    defaultValues: {
      email: '',
      receiverFirstName: '',
      receiverLastName: '',
      receiverPhone: '',
      deliveryMethod: 'nova-poshta',
      novaCity: '',
      novaCityRef: null,
      novaBranch: '',
      ukrCountry: 'Україна',
      ukrRegion: '',
      ukrCity: '',
      ukrPostcode: '',
      ukrStreet: '',
      ukrBuilding: '',
      ukrOffice: '',
      ukrBranchCode: '',
      paymentMethod: 'card',
    },
    mode: 'onSubmit',
  })

  const {
    control,
    formState: { isSubmitSuccessful: isReceiverSubmitSuccessful },
  } = checkoutForm

  const deliveryMethod = useWatch({
    control,
    name: 'deliveryMethod',
  })

  const paymentMethod = useWatch({
    control,
    name: 'paymentMethod',
  })

  const novaCity = useWatch({ control, name: 'novaCity' })
  const novaBranch = useWatch({ control, name: 'novaBranch' })
  const ukrCity = useWatch({ control, name: 'ukrCity' })
  const ukrPostcode = useWatch({ control, name: 'ukrPostcode' })
  const ukrRegion = useWatch({ control, name: 'ukrRegion' })
  const ukrStreet = useWatch({ control, name: 'ukrStreet' })
  const ukrBuilding = useWatch({ control, name: 'ukrBuilding' })

  const canSubmitPayment = useMemo(
    () => Boolean(paymentData?.data && paymentData?.signature && paymentData?.checkoutURL),
    [paymentData],
  )

  const cartIsEmpty = !cart || !cart.items || !cart.items.length

  const receiverStepComplete = useMemo(
    () => Boolean(user || isReceiverSubmitSuccessful),
    [user, isReceiverSubmitSuccessful],
  )

  const deliveryStepComplete = useMemo(
    () => {
      if (deliveryMethod === 'nova-poshta') {
        return Boolean(novaCity?.trim() && novaBranch?.trim())
      }

      return Boolean(
        ukrCity?.trim() &&
          ukrPostcode?.trim() &&
          ukrRegion?.trim() &&
          ukrStreet?.trim() &&
          ukrBuilding?.trim(),
      )
    },
    [deliveryMethod, novaCity, novaBranch, ukrCity, ukrPostcode, ukrRegion, ukrStreet, ukrBuilding],
  )

  const canPreparePayment = useMemo(
    () => Boolean(receiverStepComplete && deliveryStepComplete),
    [receiverStepComplete, deliveryStepComplete],
  )

  const canGoToStep = useCallback(
    (target: CheckoutStepId) => {
      if (target === 'cart') return true
      if (target === 'delivery') return !cartIsEmpty
      if (target === 'receiver') return deliveryStepComplete
      if (target === 'review') return receiverStepComplete && deliveryStepComplete
      if (target === 'payment') return receiverStepComplete && deliveryStepComplete
      return false
    },
    [cartIsEmpty, deliveryStepComplete, receiverStepComplete],
  )

  const goToNextStep = useCallback(() => {
    if (currentStep === 'cart') {
      setCurrentStep('delivery')
    } else if (currentStep === 'delivery' && deliveryStepComplete) {
      setCurrentStep('receiver')
    } else if (currentStep === 'receiver' && receiverStepComplete) {
      setCurrentStep('review')
    } else if (currentStep === 'review' && canPreparePayment) {
      setCurrentStep('payment')
    }
  }, [canPreparePayment, currentStep, deliveryStepComplete, receiverStepComplete])

  useEffect(() => {
    return () => {
      checkoutForm.reset()
    }
  }, [checkoutForm])

  const initiatePaymentIntent = useCallback(
    async (paymentID: string) => {
      try {
        const {
          receiverFirstName,
          receiverLastName,
          receiverPhone,
          email: formEmail,
          deliveryMethod: currentDeliveryMethod,
          novaCity,
          novaBranch,
          ukrCity,
          ukrPostcode,
          ukrRegion,
          ukrStreet,
          ukrBuilding,
          ukrOffice,
          ukrBranchCode,
        } = checkoutForm.getValues()

        const customerEmail = user?.email || formEmail

        let shippingAddress: Partial<Address> | undefined

        if (currentDeliveryMethod === 'nova-poshta' && novaCity && novaBranch) {
          shippingAddress = {
            country: 'UA',
            city: novaCity.trim(),
            addressLine1: `Нова Пошта, відділення: ${novaBranch.trim()}`,
            state: undefined,
            postalCode: undefined,
            company: 'Нова Пошта',
            title: 'Доставка у відділення Нової Пошти',
          }
        } else if (
          currentDeliveryMethod === 'ukrposhta' &&
          ukrCity &&
          ukrPostcode &&
          ukrRegion &&
          ukrStreet &&
          ukrBuilding
        ) {
          const office = ukrOffice?.trim()
          const branchCode = ukrBranchCode?.trim()

          shippingAddress = {
            country: 'UA',
            city: ukrCity.trim(),
            state: ukrRegion.trim(),
            postalCode: ukrPostcode.trim(),
            addressLine1: `${ukrStreet.trim()}, ${ukrBuilding.trim()}`,
            addressLine2: office ? `Квартира / офіс: ${office}` : undefined,
            company: 'Укрпошта',
            title: branchCode ? `Укрпошта, відділення ${branchCode}` : 'Укрпошта',
          }
        }

        const paymentData = (await initiatePayment(paymentID, {
          additionalData: {
            ...(customerEmail ? { customerEmail } : {}),
            ...(receiverFirstName ? { receiverFirstName } : {}),
            ...(receiverLastName ? { receiverLastName } : {}),
            ...(receiverPhone ? { receiverPhone } : {}),
            ...(shippingAddress ? { shippingAddress } : {}),
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
    [checkoutForm, initiatePayment, user?.email],
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

  return {
    user,
    cart,
    error,
    setError,
    paymentData,
    setPaymentData,
    isProcessingPayment,
    setProcessingPayment,
    deliveryMethod,
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
  }
}

