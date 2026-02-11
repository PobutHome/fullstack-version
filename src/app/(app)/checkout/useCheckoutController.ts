import { useAuth } from '@/providers/Auth'
import { Address } from '@/payload-types'
import { useAddresses, useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import type { CheckoutStepId, LiqPayPaymentData, ReceiverForm, ReceiverFormData } from './checkoutTypes'

export const CHECKOUT_STEPS: { id: CheckoutStepId; title: string; description: string }[] = [
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

type UseCheckoutControllerResult = {
  user: ReturnType<typeof useAuth>['user']
  cart: ReturnType<typeof useCart>['cart']
  error: string | null
  setError: (error: string | null) => void
  paymentData: LiqPayPaymentData | null
  setPaymentData: (data: LiqPayPaymentData | null) => void
  shippingAddress: Partial<Address> | undefined
  billingAddress: Partial<Address> | undefined
  billingAddressSameAsShipping: boolean
  setShippingAddress: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  setBillingAddress: React.Dispatch<React.SetStateAction<Partial<Address> | undefined>>
  setBillingAddressSameAsShipping: React.Dispatch<React.SetStateAction<boolean>>
  isProcessingPayment: boolean
  setProcessingPayment: (value: boolean) => void
  paymentMethod: 'card' | 'cod'
  setPaymentMethod: (method: 'card' | 'cod') => void
  currentStep: CheckoutStepId
  setCurrentStep: (step: CheckoutStepId) => void
  receiverForm: ReceiverForm
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
  const { addresses } = useAddresses()

  const [error, setError] = useState<string | null>(null)
  const [paymentData, setPaymentData] = useState<null | LiqPayPaymentData>(null)
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>()
  const [billingAddress, setBillingAddress] = useState<Partial<Address>>()
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true)
  const [isProcessingPayment, setProcessingPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card')
  const [currentStep, setCurrentStep] = useState<CheckoutStepId>('cart')

  const receiverForm = useForm<ReceiverFormData>({
    defaultValues: {
      email: '',
      receiverFirstName: '',
      receiverLastName: '',
      receiverPhone: '',
    },
    mode: 'onSubmit',
  })

  const {
    formState: { isSubmitSuccessful: isReceiverSubmitSuccessful },
  } = receiverForm

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
    () => Boolean(billingAddress && (billingAddressSameAsShipping || shippingAddress)),
    [billingAddress, billingAddressSameAsShipping, shippingAddress],
  )

  const canPreparePayment = useMemo(
    () => Boolean(receiverStepComplete && deliveryStepComplete),
    [receiverStepComplete, deliveryStepComplete],
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
      receiverForm.reset()
    }
  }, [receiverForm])

  const initiatePaymentIntent = useCallback(
    async (paymentID: string) => {
      try {
        const {
          receiverFirstName,
          receiverLastName,
          receiverPhone,
          email: formEmail,
        } = receiverForm.getValues()

        const customerEmail = user?.email || formEmail

        const paymentData = (await initiatePayment(paymentID, {
          additionalData: {
            ...(customerEmail ? { customerEmail } : {}),
            ...(receiverFirstName ? { receiverFirstName } : {}),
            ...(receiverLastName ? { receiverLastName } : {}),
            ...(receiverPhone ? { receiverPhone } : {}),
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
    [
      billingAddress,
      billingAddressSameAsShipping,
      initiatePayment,
      receiverForm,
      shippingAddress,
      user?.email,
    ],
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
    shippingAddress,
    billingAddress,
    billingAddressSameAsShipping,
    setShippingAddress,
    setBillingAddress,
    setBillingAddressSameAsShipping,
    isProcessingPayment,
    setProcessingPayment,
    paymentMethod,
    setPaymentMethod,
    currentStep,
    setCurrentStep,
    receiverForm,
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

