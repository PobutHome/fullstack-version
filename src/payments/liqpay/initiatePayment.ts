import crypto from 'crypto'
import type { PayloadRequest } from 'payload'
import type { LiqPayInitiateResponse } from './types'
import { liqpayEncodeData, liqpaySignature } from './utils'

type CartItemLike = {
  product: { id: string } | string
  quantity: number
  variant?: { id: string } | string | null
}

type CartLike = {
  id: string
  subtotal: number
  items: CartItemLike[]
}

type InitiateArgs = {
  req: PayloadRequest
  transactionsSlug: string
  data: {
    customerEmail?: unknown
    currency?: unknown
    cart?: unknown
    billingAddress?: unknown
    shippingAddress?: unknown
  }
}

export const initiatePayment = (props: {
  publicKey: string
  privateKey: string
  serverURL: string
  paytypes?: string
  language?: 'uk' | 'en'
}) =>
  async ({ data, req, transactionsSlug }: InitiateArgs): Promise<LiqPayInitiateResponse> => {
    const payload = req.payload as unknown as {
      create: (args: { collection: string; data: Record<string, unknown> }) => Promise<{ id?: string | number }>
    }

    const reqUser = (req as unknown as { user?: { id: string | number } | null }).user

    const customerEmail = data.customerEmail
    const currency = data.currency
    const cart = data.cart

    if (!props.publicKey || !props.privateKey) {
      throw new Error('LiqPay public/private key is required.')
    }

    if (currency !== 'UAH') {
      throw new Error('Only UAH is supported for LiqPay in this shop.')
    }

    if (!cart || typeof cart !== 'object') {
      throw new Error('Cart is empty or not provided.')
    }

    const cartObj = cart as Partial<CartLike>

    if (!Array.isArray(cartObj.items) || cartObj.items.length === 0) {
      throw new Error('Cart is empty or not provided.')
    }

    if (!customerEmail || typeof customerEmail !== 'string') {
      throw new Error('A valid customer email is required to make a purchase.')
    }

    const amount = cartObj.subtotal
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      throw new Error('A valid amount is required to initiate a payment.')
    }

    if (!cartObj.id || typeof cartObj.id !== 'string') {
      throw new Error('Cart ID is missing or invalid.')
    }

    const flattenedCart = cartObj.items.map((item) => {
      const productID = typeof item.product === 'object' ? item.product.id : item.product
      const variantID = item.variant
        ? typeof item.variant === 'object'
          ? item.variant.id
          : item.variant
        : undefined

      return {
        product: productID,
        quantity: item.quantity,
        variant: variantID,
      }
    })

    // LiqPay requires a unique order_id (<=255)
    const orderID = `txn_${crypto.randomUUID()}`

    // Create transaction in DB (pending)
    const transaction = await payload.create({
      collection: transactionsSlug,
      data: {
        ...(reqUser
          ? {
              customer: reqUser.id,
            }
          : {
              customerEmail,
            }),
        amount,
        billingAddress: data.billingAddress,
        cart: cartObj.id,
        currency: 'UAH',
        items: flattenedCart,
        paymentMethod: 'liqpay',
        status: 'pending',
        liqpay: {
          orderID,
          shippingAddress: data.shippingAddress,
        },
      },
    })

    const checkoutURL = 'https://www.liqpay.ua/api/3/checkout'

    const resultURL = `${props.serverURL}/checkout/confirm-order?payment=liqpay&order_id=${encodeURIComponent(orderID)}&email=${encodeURIComponent(customerEmail)}`
    const serverURL = `${props.serverURL}/api/payments/liqpay/callback`

    const liqpayPayload = {
      version: 7,
      public_key: props.publicKey,
      action: 'pay',
      amount,
      currency: 'UAH',
      description: `Order ${transaction?.id || orderID}`,
      order_id: orderID,
      language: props.language || 'uk',
      // comma-separated list per docs
      ...(props.paytypes ? { paytypes: props.paytypes } : {}),
      result_url: resultURL,
      server_url: serverURL,
    }

    const encoded = liqpayEncodeData(liqpayPayload)
    const signature = liqpaySignature({ privateKey: props.privateKey, data: encoded })

    return {
      checkoutURL,
      data: encoded,
      signature,
      orderID,
      message: 'Payment initiated successfully',
      transactionID: transaction?.id ? String(transaction.id) : undefined,
    }
  }
