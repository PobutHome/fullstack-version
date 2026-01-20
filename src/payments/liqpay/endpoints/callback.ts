import type { Endpoint } from 'payload'
import { liqpayDecodeData, liqpayVerifySignature } from '../utils'
import type { LiqPayCallbackPayload } from '../types'

import type { Order } from '@/payload-types'

type ShippingAddress = Order['shippingAddress']

function mapStatus(status?: string) {
  const s = (status || '').toLowerCase()
  if (s === 'success' || s === 'sandbox') return 'succeeded'
  if (s === 'failure' || s === 'error') return 'failed'
  if (s === 'reversed' || s === 'refund' || s === 'refunded') return 'refunded'
  if (s === 'expired') return 'expired'
  return 'pending'
}

export const liqpayCallbackEndpoint = (props: {
  privateKey: string
}): Endpoint => {
  return {
    method: 'post',
    path: '/callback',
    handler: async (req) => {
      const payload = req.payload

      if (!props.privateKey) {
        return Response.json({ ok: false, error: 'Missing LIQPAY_PRIVATE_KEY' }, { status: 500 })
      }

      // LiqPay sends x-www-form-urlencoded with fields: data, signature
      const withFormData = req as unknown as { formData?: () => Promise<FormData> }
      const form = withFormData.formData ? await withFormData.formData().catch(() => null) : null
      const data = form?.get('data')
      const signature = form?.get('signature')

      if (typeof data !== 'string' || typeof signature !== 'string') {
        return Response.json({ ok: false }, { status: 400 })
      }

      const valid = liqpayVerifySignature({ privateKey: props.privateKey, data, signature })
      if (!valid) {
        payload.logger.warn('Invalid LiqPay signature')
        return Response.json({ ok: false }, { status: 400 })
      }

      const decoded = liqpayDecodeData<LiqPayCallbackPayload>(data)
      const orderID = decoded?.order_id
      const status = mapStatus(decoded?.status)

      if (!orderID) {
        return Response.json({ ok: true }, { status: 200 })
      }

      const transactionsResults = await payload.find({
        collection: 'transactions',
        where: {
          'liqpay.orderID': {
            equals: orderID,
          },
        },
        limit: 1,
      })

      const transaction = transactionsResults?.docs?.[0]
      if (!transaction) {
        payload.logger.warn(`LiqPay callback: transaction not found for order_id=${orderID}`)
        return Response.json({ ok: true }, { status: 200 })
      }

      // Update transaction status
      await payload.update({
        id: transaction.id,
        collection: 'transactions',
        data: {
          status,
        },
      })

      if (status !== 'succeeded') {
        return Response.json({ ok: true }, { status: 200 })
      }

      // If order already exists, done
      if (transaction.order) {
        return Response.json({ ok: true }, { status: 200 })
      }

      // Create order (idempotent-ish)
      const shippingAddress =
        (transaction.liqpay?.shippingAddress ?? undefined) as unknown as ShippingAddress

      const order = await payload.create({
        collection: 'orders',
        data: {
          amount: transaction.amount,
          currency: transaction.currency,
          ...(transaction.customer
            ? { customer: typeof transaction.customer === 'object' ? transaction.customer.id : transaction.customer }
            : { customerEmail: transaction.customerEmail }),
          items: transaction.items,
          shippingAddress,
          status: 'processing',
          transactions: [transaction.id],
        },
      })

      const timestamp = new Date().toISOString()

      const cartID =
        typeof transaction.cart === 'object' && transaction.cart
          ? transaction.cart.id
          : transaction.cart

      if (typeof cartID !== 'string' && typeof cartID !== 'number') {
        payload.logger.warn(`LiqPay callback: transaction has no cart for order_id=${orderID}`)
        return Response.json({ ok: true }, { status: 200 })
      }

      await payload.update({
        id: cartID,
        collection: 'carts',
        data: {
          purchasedAt: timestamp,
        },
      })

      await payload.update({
        id: transaction.id,
        collection: 'transactions',
        data: {
          order: order.id,
        },
      })

      return Response.json({ ok: true }, { status: 200 })
    },
  }
}
