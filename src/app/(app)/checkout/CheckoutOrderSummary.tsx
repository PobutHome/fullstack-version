'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import React from 'react'

export type CheckoutOrderSummaryCart = {
  items?: Array<{
    id?: string | null
    product?: {
      meta?: { image?: unknown }
      title?: string
      gallery?: { image?: unknown; variantOption?: unknown }[] | null
      priceInUAH?: number | null
    } | null
    quantity?: number | null
    variant?: { priceInUAH?: number | null; options?: Array<{ id?: string; label?: string } | string> | null } | null
  }> | null
  subtotal?: number | null
}

type Props = {
  cart: CheckoutOrderSummaryCart | null | undefined
  /** Optional short hint below title (e.g. where to edit cart) */
  hint?: React.ReactNode
  className?: string
}

export const CheckoutOrderSummary: React.FC<Props> = ({ cart, hint, className = '' }) => {
  if (!cart?.items?.length) return null

  return (
    <section
      className={`rounded-radius-primary bg-sys-surface-2 p-space-20 flex flex-col gap-space-15 min-w-0 box-border ${className}`.trim()}
      aria-label="Замовлення"
    >
      <header className="grid gap-space-05 min-w-0">
        <h2 className="m-0 text-sm font-semibold text-sys-text">Замовлення</h2>
        {hint && (
          <p className="m-0 text-[11px] text-sys-text-muted leading-snug">{hint}</p>
        )}
      </header>

      <ul className="m-0 list-none p-0 flex flex-col gap-space-15 min-w-0">
        {cart.items.map((item, index) => {
          if (!item?.product || typeof item.product !== 'object') return null
          const { product, quantity = 0, variant } = item
          const { meta, title, gallery } = product
          if (!quantity) return null

          let image = gallery?.[0]?.image ?? meta?.image
          let unitPrice: number | null = product.priceInUAH ?? null
          if (variant && typeof variant === 'object') {
            unitPrice = variant.priceInUAH ?? unitPrice
            const imageVariant = product.gallery?.find((g) => {
              if (!g.variantOption) return false
              const vid = typeof g.variantOption === 'object' ? (g.variantOption as { id?: string }).id : g.variantOption
              return variant.options?.some((o) => (typeof o === 'object' ? o.id === vid : o === vid))
            })
            if (imageVariant?.image && typeof imageVariant.image !== 'string') {
              image = imageVariant.image
            }
          }

          const lineTotal = typeof unitPrice === 'number' ? unitPrice * quantity : null
          const itemId = item.id ?? `order-item-${index}`

          return (
            <li
              key={itemId}
              className="flex items-center gap-space-10 min-w-0 py-space-10 first:pt-0 last:pb-0"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-radius-md bg-sys-surface">
                {image && typeof image !== 'string' && (
                  <Media
                    resource={image}
                    fill
                    className="relative h-full w-full"
                    imgClassName="object-contain"
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-space-05">
                <p className="m-0 pobut-body leading-tight text-sys-text line-clamp-2 wrap-break-word">
                  {title}
                </p>
                {variant && typeof variant === 'object' && (
                  <p className="m-0 pobut-caption text-sys-text-muted wrap-break-word">
                    {variant.options
                      ?.map((o) => (typeof o === 'object' ? o.label : null))
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
                <p className="m-0 text-[11px] text-sys-text-muted">
                  × {quantity}
                  {unitPrice != null && (
                    <span className="ml-1">
                      · <Price amount={unitPrice} as="span" className="text-sys-text-muted" /> / шт
                    </span>
                  )}
                </p>
              </div>
              {lineTotal != null && (
                <Price
                  amount={lineTotal}
                  as="span"
                  className="text-sm font-semibold text-sys-text whitespace-nowrap shrink-0"
                />
              )}
            </li>
          )
        })}
      </ul>

      <div className="flex justify-between items-center gap-space-10 pt-space-15 min-w-0">
        <span className="text-[11px] uppercase tracking-[0.18em] text-sys-text-muted">Всього</span>
        <Price
          amount={cart.subtotal ?? 0}
          as="span"
          className="text-lg font-semibold text-sys-text whitespace-nowrap"
        />
      </div>
    </section>
  )
}
