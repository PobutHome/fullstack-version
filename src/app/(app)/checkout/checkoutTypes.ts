import type { UseFormReturn } from 'react-hook-form'

export type LiqPayPaymentData = {
  checkoutURL: string
  data: string
  signature: string
  orderID: string
}

export type CheckoutStepId = 'cart' | 'delivery' | 'receiver' | 'review' | 'payment'

export type DeliveryMethod = 'nova-poshta' | 'ukrposhta'

export type CheckoutFormData = {
  email: string
  receiverFirstName: string
  receiverLastName: string
  /** По батькові (необов'язково) */
  receiverPatronymic?: string
  receiverPhone: string

  deliveryMethod: DeliveryMethod

  novaCity: string
  novaCityRef?: string | null
  novaBranch: string

  ukrCountry: string
  ukrRegion: string
  ukrCity: string
  ukrPostcode: string
  ukrStreet: string
  ukrBuilding: string
  ukrOffice: string
  ukrBranchCode: string

  paymentMethod: 'card' | 'cod'
}

export type CheckoutForm = UseFormReturn<CheckoutFormData>


