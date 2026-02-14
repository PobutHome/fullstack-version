'use client'

import { Button } from '@/components/Button'
import type { Product, Variant } from '@/payload-types'

import type { AppLocale } from '@/utilities/locale'
import { getClientLocale } from '@/utilities/localeClient'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import clsx from 'clsx'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
type Props = {
  product: Product
  className?: string
}

const addToCartCopy: Record<
  AppLocale,
  {
    aria: string
    label: string
    inc: string
    dec: string
    toast: string
  }
> = {
  ua: {
    aria: 'Додати до кошика',
    label: 'Купити',
    inc: 'Збільшити кількість',
    dec: 'Зменшити кількість',
    toast: 'Товар додано до кошика.',
  },
  ru: {
    aria: 'Добавить в корзину',
    label: 'Купить',
    inc: 'Увеличить количество',
    dec: 'Уменьшить количество',
    toast: 'Товар добавлен в корзину.',
  },
}

export function AddToCart({ product, className }: Props) {
  const { addItem, cart } = useCart()
  const searchParams = useSearchParams()
  const [quantity, setQuantity] = useState(1)

  const locale = getClientLocale()
  const t = addToCartCopy[locale]

  const variants = product.variants?.docs || []

  const selectedVariant = useMemo<Variant | undefined>(() => {
    if (product.enableVariants && variants.length) {
      const variantId = searchParams.get('variant')

      const validVariant = variants.find((variant) => {
        if (typeof variant === 'object') {
          return String(variant.id) === variantId
        }
        return String(variant) === variantId
      })

      if (validVariant && typeof validVariant === 'object') {
        return validVariant
      }
    }

    return undefined
  }, [product.enableVariants, searchParams, variants])

  const existingItem = useMemo(() => {
    return cart?.items?.find((item) => {
      const productID = typeof item.product === 'object' ? item.product?.id : item.product
      const variantID = item.variant
        ? typeof item.variant === 'object'
          ? item.variant?.id
          : item.variant
        : undefined

      if (productID === product.id) {
        if (product.enableVariants) {
          return variantID === selectedVariant?.id
        }
        return true
      }
    })
  }, [cart?.items, product, selectedVariant])

  const existingQuantity = existingItem?.quantity || 0

  const inventoryForSelection = useMemo<number>(() => {
    if (product.enableVariants) return selectedVariant?.inventory || 0
    return product.inventory || 0
  }, [product.enableVariants, product.inventory, selectedVariant])

  const maxAddable = Math.max(0, inventoryForSelection - existingQuantity)

  useEffect(() => {
    if (maxAddable <= 0) {
      setQuantity(1)
      return
    }

    setQuantity((prev) => Math.min(Math.max(1, prev), maxAddable))
  }, [maxAddable, selectedVariant?.id, product.id])

  const disabled = useMemo<boolean>(() => {
    if (product.enableVariants && !selectedVariant) return true
    return maxAddable <= 0
  }, [maxAddable, product.enableVariants, selectedVariant])

  const addToCart = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (disabled) return

      addItem(
        {
          product: product.id,
          variant: selectedVariant?.id ?? undefined,
        },
        quantity,
      ).then(() => {
        toast.success(t.toast)
      })
    },
    [addItem, disabled, product.id, quantity, selectedVariant?.id, t.toast],
  )

  return (
    <div className={clsx('inline-flex items-center gap-space-10', className)}>
      <div className="flex h-9 items-center rounded-radius-full border border-sys-btn-interactive-border bg-sys-surface px-1">
        <Button
          aria-label={t.dec}
          variant="qty"
          type="button"
          className="border-0 bg-transparent hover:bg-transparent active:bg-transparent"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          disabled={disabled || quantity <= 1}
        >
          <MinusIcon className="size-4" />
        </Button>

        <span className="min-w-6 text-center pobut-body text-sys-text">{quantity}</span>

        <Button
          aria-label={t.inc}
          variant="qty"
          type="button"
          className="border-0 bg-transparent hover:bg-transparent active:bg-transparent"
          onClick={() => setQuantity((prev) => Math.min(maxAddable || 1, prev + 1))}
          disabled={disabled || quantity >= maxAddable}
        >
          <PlusIcon className="size-4" />
        </Button>
      </div>

      <Button
        aria-label={t.aria}
        variant="primary"
        className={clsx('shrink-0', {
          'w-[170px] desktop:w-[220px]': true,
          'hover:opacity-90': true,
        })}
        disabled={disabled}
        onClick={addToCart}
        type="submit"
      >
        {t.label}
      </Button>
    </div>
  )
}
