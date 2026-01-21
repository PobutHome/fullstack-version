'use client'

import { LoadingSpinner } from '@/components/LoadingSpinner'
import { usePayments } from '@payloadcms/plugin-ecommerce/client/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

export const ConfirmOrder: React.FC = () => {
  const { confirmOrder } = usePayments()

  const searchParams = useSearchParams()
  const router = useRouter()
  // Ensure we only confirm the order once, even if the component re-renders
  const isConfirming = useRef(false)

  const [statusText, setStatusText] = useState<string>('Очікуємо підтвердження оплати…')

  const liqpayOrderID = useMemo(() => {
    return (
      searchParams.get('order_id') ||
      searchParams.get('orderID') ||
      searchParams.get('liqpay_order_id') ||
      ''
    )
  }, [searchParams])

  const email = useMemo(() => {
    return searchParams.get('email') || ''
  }, [searchParams])

  useEffect(() => {
    if (liqpayOrderID) {
      if (!isConfirming.current) {
        isConfirming.current = true

        const startedAt = Date.now()
        const maxMs = 180_000

        const tick = async () => {
          let result: unknown = null

          try {
            result = await confirmOrder('liqpay', {
              additionalData: {
                orderID: liqpayOrderID,
                ...(email ? { customerEmail: email } : {}),
              },
            })
            setStatusText('Перевіряємо статус платежу…')
          } catch {
            setStatusText('Оплата ще обробляється…')
          }

          if (result && typeof result === 'object' && 'orderID' in result && result.orderID) {
            const query = email ? `?email=${encodeURIComponent(email)}` : ''
            router.push(`/orders/${result.orderID}${query}`)
            return true
          }

          if (Date.now() - startedAt > maxMs) {
            setStatusText(
              'Платіж ще обробляється. Якщо ви вже оплатили — зачекайте кілька хвилин або знайдіть замовлення за email.',
            )
            return true
          }

          return false
        }

        // poll until payment is confirmed and order is created
        const interval = setInterval(() => {
          void tick().then((done) => {
            if (done) clearInterval(interval)
          })
        }, 4000)

        void tick()
      }
    } else {
      setStatusText('Не знайдено параметр order_id. Поверніться до кошика та спробуйте ще раз.')
    }
  }, [confirmOrder, liqpayOrderID, router, email])

  return (
    <div className="text-center w-full flex flex-col items-center justify-start gap-4">
      <h1 className="text-2xl">Підтверджуємо замовлення</h1>

      <div className="text-sm text-muted-foreground max-w-md">{statusText}</div>

      <LoadingSpinner className="w-12 h-6" />
    </div>
  )
}
