'use client'
import { CartItem } from '@/components/Cart'
import type { AppLocale } from '@/utilities/locale'
import { getClientLocale } from '@/utilities/localeClient'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { MinusIcon, PlusIcon } from 'lucide-react'
import React, { useMemo } from 'react'

const qtyCopy: Record<AppLocale, { inc: string; dec: string }> = {
  ua: { inc: 'Збільшити кількість', dec: 'Зменшити кількість' },
  ru: { inc: 'Увеличить количество', dec: 'Уменьшить количество' },
}

export function EditItemQuantityButton({ type, item }: { item: CartItem; type: 'minus' | 'plus' }) {
  const { decrementItem, incrementItem } = useCart()

  const t = qtyCopy[getClientLocale()]

  const disabled = useMemo(() => {
    if (!item.id) return true

    const target =
      item.variant && typeof item.variant === 'object'
        ? item.variant
        : item.product && typeof item.product === 'object'
          ? item.product
          : null

    if (
      target &&
      typeof target === 'object' &&
      target.inventory !== undefined &&
      target.inventory !== null
    ) {
      if (type === 'plus' && item.quantity !== undefined && item.quantity !== null) {
        return item.quantity >= target.inventory
      }
    }

    return false
  }, [item, type])

  return (
    <form>
      <button
        aria-disabled={disabled}
        disabled={disabled}
        aria-label={type === 'plus' ? t.inc : t.dec}
        className={
          'inline-flex size-9 items-center justify-center rounded-radius-full bg-transparent p-0 border-0 ' +
          'text-sys-btn-interactive-fg hover:text-sys-btn-interactive-fg-hover active:text-sys-btn-interactive-fg-active ' +
          'disabled:opacity-40 disabled:cursor-not-allowed'
        }
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()

          if (item.id) {
            if (type === 'plus') {
              incrementItem(item.id)
            } else {
              decrementItem(item.id)
            }
          }
        }}
        type="button"
      >
        {type === 'plus' ? <PlusIcon className="size-4" /> : <MinusIcon className="size-4" />}
      </button>
    </form>
  )
}
