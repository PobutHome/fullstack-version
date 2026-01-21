import type { Field } from 'payload'

import { confirmOrder } from './confirmOrder'
import { liqpayCallbackEndpoint } from './endpoints/callback'
import { initiatePayment } from './initiatePayment'

export const liqpayAdapter = (props: {
  publicKey: string
  privateKey: string
  serverURL: string
  paytypes?: string
  language?: 'uk' | 'en'
  label?: string
}) => {
  const label = props.label || 'LiqPay'

  const publicKey = String(props.publicKey || '').trim()
  const privateKey = String(props.privateKey || '').trim()
  const serverURL = String(props.serverURL || '').replace(/\/+$/, '')

  const baseFields: Field[] = [
    {
      name: 'orderID',
      type: 'text',
      label: 'LiqPay order_id',
    },
    {
      name: 'shippingAddress',
      type: 'json',
      label: 'Shipping Address (snapshot)',
    },
  ]

  const groupField: Field = {
    name: 'liqpay',
    type: 'group',
    admin: {
      condition: (data) => {
        const path = 'paymentMethod'
        return data?.[path] === 'liqpay'
      },
    },
    fields: baseFields,
  }

  return {
    name: 'liqpay',
    label,
    group: groupField,
    initiatePayment: initiatePayment({
      publicKey,
      privateKey,
      serverURL,
      paytypes: props.paytypes,
      language: props.language,
    }),
    confirmOrder: confirmOrder({ publicKey, privateKey }),
    endpoints: [
      liqpayCallbackEndpoint({
        privateKey,
      }),
    ],
  }
}

export const liqpayAdapterClient = () => {
  return {
    name: 'liqpay',
    confirmOrder: true,
    initiatePayment: true,
    label: 'LiqPay',
  }
}
