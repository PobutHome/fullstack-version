'use client'

import { Message } from '@/components/Message'
import React from 'react'
import { Address } from '@/payload-types'

type Props = {
  customerEmail?: string
  billingAddress?: Partial<Address>
  shippingAddress?: Partial<Address>
  setProcessingPayment: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutForm: React.FC<Props> = ({
  setProcessingPayment,
}) => {
  // Deprecated legacy component (kept for backwards compatibility).
  React.useEffect(() => {
    setProcessingPayment(false)
  }, [setProcessingPayment])

  return (
    <div>
      <Message error="This checkout component is deprecated. Please use the current checkout flow." />
    </div>
  )
}
