export type LiqPayCallbackPayload = {
  order_id?: string
  status?: string
  amount?: number | string
  currency?: string
  transaction_id?: string
  payment_id?: string
  err_code?: string
  err_description?: string
  sender_card_mask2?: string
  sender_card_type?: string
  sender_commission?: number | string
  receiver_commission?: number | string
}

export type LiqPayInitiateResponse = {
  checkoutURL: string
  data: string
  signature: string
  orderID: string
  message: string
  transactionID?: string
}
