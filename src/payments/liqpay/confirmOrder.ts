type ConfirmOrderArgs = {
  data: Record<string, unknown> & { customerEmail?: string }
  ordersSlug?: string
  req: { payload: unknown }
  transactionsSlug?: string
}

type ConfirmOrderResult = {
  message: string
  orderID: string
  transactionID: string
} & Record<string, unknown>

type PayloadLike = {
  find: (args: Record<string, unknown>) => Promise<{ docs?: unknown[] }>
  create: (args: Record<string, unknown>) => Promise<{ id: string | number }>
  update: (args: Record<string, unknown>) => Promise<unknown>
  logger?: {
    error?: (...args: unknown[]) => void
    warn?: (...args: unknown[]) => void
    info?: (...args: unknown[]) => void
  }
}

type TransactionLike = {
  id: string | number
  amount?: number
  currency?: string
  customer?: { id: string | number } | string | number | null
  customerEmail?: string | null
  order?: { id: string | number } | string | number | null
  cart?: { id: string | number } | string | number | null
  items?: unknown
  status?: string
  liqpay?: { shippingAddress?: unknown } | null
}

type LiqPayStatusResponse = {
  status?: string
  order_id?: string
  err_code?: string
  err_description?: string
  result?: string
}

function mapLiqPayStatus(status?: string) {
  const s = (status || '').toLowerCase()
  if (s === 'success' || s === 'sandbox') return 'succeeded'
  if (s === 'failure' || s === 'error') return 'failed'
  if (s === 'reversed' || s === 'refund' || s === 'refunded') return 'refunded'
  if (s === 'expired') return 'expired'
  return 'pending'
}

async function fetchLiqPayStatus(args: {
  orderID: string
  publicKey: string
  privateKey: string
}): Promise<LiqPayStatusResponse | null> {
  const { liqpayEncodeData, liqpaySignature } = await import('./utils')

  const bodyPayload = {
    version: 3,
    public_key: args.publicKey,
    action: 'status',
    order_id: args.orderID,
  }

  const data = liqpayEncodeData(bodyPayload)
  const signature = liqpaySignature({ privateKey: args.privateKey, data })

  const form = new URLSearchParams()
  form.set('data', data)
  form.set('signature', signature)

  const res = await fetch('https://www.liqpay.ua/api/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  })

  const text = await res.text()
  try {
    return JSON.parse(text) as LiqPayStatusResponse
  } catch {
    return null
  }
}

export const confirmOrder =
  (props: { publicKey: string; privateKey: string }) =>
  async ({
    data,
    ordersSlug = 'orders',
    req,
    transactionsSlug = 'transactions',
  }: ConfirmOrderArgs): Promise<ConfirmOrderResult> => {
    const payload = req.payload as PayloadLike

    const orderID = data.orderID
    if (!orderID || typeof orderID !== 'string') {
      return {
        message: 'orderID is required',
        orderID: '',
        transactionID: '',
      }
    }

    // Find transaction by liqpay.orderID
    const transactionsResults = await payload.find({
      collection: transactionsSlug,
      overrideAccess: true,
      where: {
        'liqpay.orderID': {
          equals: orderID,
        },
      },
    })

    const transaction = transactionsResults?.docs?.[0] as TransactionLike | undefined
    if (!transaction) {
      return {
        message: 'Payment not found yet',
        orderID: '',
        transactionID: '',
      }
    }

    const customerEmail =
      typeof data.customerEmail === 'string'
        ? data.customerEmail
        : typeof transaction.customerEmail === 'string'
          ? transaction.customerEmail
          : ''

    // If order already exists, we can finish immediately
    if (transaction.order) {
      const confirmedOrderId =
        typeof transaction.order === 'object' ? transaction.order.id : transaction.order

      return {
        message: 'Order confirmed',
        orderID: String(confirmedOrderId),
        transactionID: String(transaction.id),
      }
    }

    // If callback didn't arrive (e.g. localhost), actively check payment status on LiqPay
    if (transaction.status !== 'succeeded') {
      try {
        const publicKey = String(props.publicKey || '').trim()
        const privateKey = String(props.privateKey || '').trim()

        if (publicKey && privateKey) {
          const statusResponse = await fetchLiqPayStatus({
            orderID,
            publicKey,
            privateKey,
          })

          const mapped = mapLiqPayStatus(statusResponse?.status)
          if (mapped !== transaction.status) {
            await payload.update({
              id: transaction.id,
              collection: transactionsSlug,
              overrideAccess: true,
              data: {
                status: mapped,
                ...(customerEmail && !transaction.customerEmail ? { customerEmail } : {}),
              },
            })

            // reflect new status for the remainder of this request
            transaction.status = mapped
            if (customerEmail && !transaction.customerEmail) {
              transaction.customerEmail = customerEmail
            }
          }
        }
      } catch (err) {
        payload.logger?.warn?.(err, 'LiqPay status check failed')
      }
    }

    // Still not confirmed → let client continue polling (no throwing here)
    if (transaction.status !== 'succeeded') {
      return {
        message: 'Payment not confirmed yet',
        orderID: '',
        transactionID: '',
      }
    }

    // Payment succeeded but order missing → create it here (idempotency fallback)
    try {
      const order = await payload.create({
        collection: ordersSlug,
        overrideAccess: true,
        data: {
          amount: transaction.amount,
          currency: transaction.currency,
          ...(transaction.customer
            ? {
                customer:
                  typeof transaction.customer === 'object'
                    ? transaction.customer.id
                    : transaction.customer,
              }
            : { customerEmail: customerEmail || transaction.customerEmail }),
          items: transaction.items,
          shippingAddress: transaction.liqpay?.shippingAddress,
          status: 'processing',
          transactions: [transaction.id],
        },
      })

      const cartID =
        typeof transaction.cart === 'object' && transaction.cart
          ? transaction.cart.id
          : transaction.cart

      if (typeof cartID === 'string' || typeof cartID === 'number') {
        const timestamp = new Date().toISOString()
        await payload.update({
          id: cartID,
          collection: 'carts',
          overrideAccess: true,
          data: {
            purchasedAt: timestamp,
          },
        })
      }

      await payload.update({
        id: transaction.id,
        collection: transactionsSlug,
        overrideAccess: true,
        data: {
          order: order.id,
          ...(customerEmail && !transaction.customerEmail ? { customerEmail } : {}),
        },
      })

      return {
        message: 'Order confirmed',
        orderID: String(order.id),
        transactionID: String(transaction.id),
      }
    } catch (err) {
      payload.logger?.error?.(err, 'Failed to create order in confirmOrder fallback')
      return {
        message: 'Payment succeeded but order is not ready yet',
        orderID: '',
        transactionID: '',
      }
    }
  }
