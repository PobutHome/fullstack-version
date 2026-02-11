import type { UseFormReturn } from 'react-hook-form'

export type ReceiverFormData = {
  email: string
  receiverFirstName: string
  receiverLastName: string
  receiverPhone: string
}

export type LiqPayPaymentData = {
  checkoutURL: string
  data: string
  signature: string
  orderID: string
}

export type CheckoutStepId = 'cart' | 'receiver' | 'delivery' | 'payment'

export type DeliveryMethod = 'nova-poshta' | 'ukrposhta'

export type ReceiverForm = UseFormReturn<ReceiverFormData>


