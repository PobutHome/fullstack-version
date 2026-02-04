'use client'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useCart, usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const ConfirmOrder: React.FC = () => {
  const { confirmOrder } = usePayments()
  const { cart } = useCart()

  const searchParams = useSearchParams()
  const router = useRouter()
  // Ensure we only confirm the order once, even if the component re-renders
  const isConfirming = useRef(false)

  useEffect(() => {
    if (!cart || !cart.items || cart.items?.length === 0) {
      return
    }

    const liqpayOrderID = searchParams.get('order_id')
    const email = searchParams.get('email')

    if (liqpayOrderID) {
      if (!isConfirming.current) {
        isConfirming.current = true

        const startedAt = Date.now()
        const maxMs = 60_000

        const tick = async () => {
          let result: unknown = null

          try {
            result = await confirmOrder('liqpay', {
              additionalData: {
                orderID: liqpayOrderID,
              },
            })
          } catch {
            // Пока LiqPay callback не обновил transaction → confirmOrder бросает ошибку.
            // Просто продолжаем polling.
          }

          if (result && typeof result === 'object' && 'orderID' in result && result.orderID) {
            router.push(`/shop/order/${result.orderID}?email=${email}`)
            return true
          }

          if (Date.now() - startedAt > maxMs) {
            router.push(`/shop?warning=${encodeURIComponent('Payment is still processing. Please check your email or try again later.')}`)
            return true
          }

          return false
        }

        // poll until webhook confirms payment and order is created
        const interval = setInterval(() => {
          void tick().then((done) => {
            if (done) clearInterval(interval)
          })
        }, 1500)

        void tick()
      }
    } else {
      // If no payment intent ID is found, redirect to the home
      router.push('/')
    }
  }, [cart, confirmOrder, router, searchParams])

  return (
    <div className="text-center w-full flex flex-col items-center justify-start gap-4">
      <h1 className="text-2xl">Confirming Order</h1>

      <LoadingSpinner className="w-12 h-6" />
    </div>
  )
}
