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

export const confirmOrder = () =>
  async ({ data, ordersSlug = 'orders', req, transactionsSlug = 'transactions' }: ConfirmOrderArgs): Promise<ConfirmOrderResult> => {
    const payload = req.payload as PayloadLike

    const orderID = data.orderID
    if (!orderID || typeof orderID !== 'string') {
      throw new Error('orderID is required')
    }

    // Find transaction by liqpay.orderID
    const transactionsResults = await payload.find({
      collection: transactionsSlug,
      where: {
        'liqpay.orderID': {
          equals: orderID,
        },
      },
    })

    const transaction = transactionsResults?.docs?.[0] as TransactionLike | undefined
    if (!transaction) {
      throw new Error('No transaction found for the provided orderID')
    }

    // If webhook already created an order, just return it
    if (transaction.order) {
      const orderId = typeof transaction.order === 'object' ? transaction.order.id : transaction.order
      return {
        message: 'Order already confirmed',
        orderID: String(orderId),
        transactionID: String(transaction.id),
      }
    }

    // If payment not yet succeeded, let the client poll
    if (transaction.status !== 'succeeded') {
      throw new Error('Payment not confirmed yet')
    }

    // Fallback: create order if status succeeded but order missing (idempotency)
    const order = await payload.create({
      collection: ordersSlug,
      data: {
        amount: transaction.amount,
        currency: transaction.currency,
        ...(transaction.customer
          ? { customer: typeof transaction.customer === 'object' ? transaction.customer.id : transaction.customer }
          : { customerEmail: transaction.customerEmail }),
        items: transaction.items,
        shippingAddress: transaction.liqpay?.shippingAddress,
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
      throw new Error('Cart ID missing on transaction')
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
      collection: transactionsSlug,
      data: {
        order: order.id,
      },
    })

    return {
      message: 'Order confirmed',
      orderID: String(order.id),
      transactionID: String(transaction.id),
    }
  }
