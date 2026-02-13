'use client'

import React, { useState } from 'react'

import type { CartItem } from '@/components/Cart'
import { DeleteItemButton } from '@/components/Cart/DeleteItemButton'
import { EditItemQuantityButton } from '@/components/Cart/EditItemQuantityButton'
import { Media } from '@/components/Media'
import type { Props as MediaProps } from '@/components/Media/types'
import { Price } from '@/components/Price'
import { Button } from '@/components/ui/button'

const WHOLESALE_MIN_QUANTITY = 1

export interface CartStepProps {
  cart:
    | {
        items?:
          | Array<{
              id?: string | null
              product?: unknown
              variant?: unknown
              quantity?: number | null
            }>
          | null
        subtotal?: number | null
      }
    | null
    | undefined
  onNext: () => void
  onBack?: () => void
}

export const CartStep: React.FC<CartStepProps> = ({ cart, onNext, onBack }) => {
  const [wholesaleByItem, setWholesaleByItem] = useState<Record<string, boolean>>({})

  if (!cart || !cart.items || !cart.items.length) return null

  return (
    <section className="grid w-full max-w-3xl gap-space-15 mx-auto min-w-0 box-border overflow-hidden">
      <header className="grid gap-space-05 min-w-0">
        <h2 className="m-0 pobut-H3 text-sys-text">Товари в замовленні</h2>
        <p className="m-0 pobut-body text-sys-text-muted">
          Змініть кількість або видаліть товар. Ціни застосовуються автоматично.
        </p>
      </header>

      <div className="grid gap-space-15">
        <ul className="m-0 list-none p-0 grid gap-space-10">
          {cart.items?.map((rawItem, index) => {
            if (!rawItem || typeof rawItem !== 'object') return null

            const item = rawItem as {
              id?: string | null
              product?: {
                meta?: { image?: unknown }
                title?: string
                gallery?: { image?: unknown; variantOption?: unknown }[] | null
                priceInUAH?: number | null
                inventory?: number | null
              } | null
              quantity?: number | null
              variant?: {
                priceInUAH?: number | null
                inventory?: number | null
                options?: Array<{ id?: string; label?: string } | string> | null
              } | null
            }

            if (item.product && typeof item.product === 'object') {
              const {
                product,
                product: { meta, title, gallery },
                quantity = 0,
                variant,
              } = item

              if (!quantity) return null

              const itemId = item.id ?? `item-${index}`

              let image = gallery?.[0]?.image || meta?.image
              let retailPrice = product?.priceInUAH
              const isVariant = Boolean(variant) && typeof variant === 'object'
              if (isVariant) {
                retailPrice = variant?.priceInUAH ?? retailPrice
                const imageVariant = product.gallery?.find((galleryItem) => {
                  if (!galleryItem.variantOption) return false
                  const variantOptionID =
                    typeof galleryItem.variantOption === 'object'
                      ? (galleryItem.variantOption as { id?: string }).id
                      : galleryItem.variantOption
                  return variant?.options?.some((option) => {
                    if (typeof option === 'object') return option.id === variantOptionID
                    return option === variantOptionID
                  })
                })
                if (imageVariant && typeof imageVariant.image !== 'string') {
                  image = imageVariant.image
                }
              }

              const useWholesale =
                quantity >= WHOLESALE_MIN_QUANTITY &&
                (wholesaleByItem[itemId] ?? false)
              const displayPrice =
                typeof retailPrice === 'number' ? retailPrice : null
              const lineTotal =
                displayPrice != null ? displayPrice * quantity : null

              return (
                <li
                  key={itemId}
                  className="relative w-full min-w-0 rounded-radius-primary border border-sys-card-border bg-sys-card-bg p-space-10"
                >
                  <div className="absolute right-2 top-2 z-10">
                    <DeleteItemButton item={rawItem as CartItem} />
                  </div>

                  <div className="flex flex-col gap-space-10">
                    <div className="flex min-w-0 items-start gap-space-10 pr-8">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-radius-md border border-sys-card-border bg-sys-surface-2">
                        {image !== undefined && image !== null && typeof image !== 'string' ? (
                          <Media
                            className="relative h-full w-full"
                            fill
                            imgClassName="object-contain"
                            resource={image as MediaProps['resource']}
                          />
                        ) : null}
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
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center justify-between gap-space-10">
                      <div className="flex h-9 flex-row items-center rounded-radius-full border border-sys-btn-interactive-border bg-sys-surface px-1">
                        <EditItemQuantityButton type="minus" item={rawItem as CartItem} />
                        <span className="min-w-6 text-center text-sm text-sys-text">{quantity}</span>
                        <EditItemQuantityButton type="plus" item={rawItem as CartItem} />
                      </div>

                      {quantity >= WHOLESALE_MIN_QUANTITY && (
                        <label className="flex cursor-pointer items-center gap-space-05 text-[11px] text-sys-text-muted">
                          <input
                            type="checkbox"
                            checked={wholesaleByItem[itemId] ?? false}
                            onChange={(e) =>
                              setWholesaleByItem((prev) => ({
                                ...prev,
                                [itemId]: e.target.checked,
                              }))
                            }
                            className="rounded border-sys-border"
                          />
                          <span>Оптова ціна</span>
                        </label>
                      )}

                      {lineTotal != null && (
                        <div className="text-sm font-semibold text-sys-text shrink-0">
                          {useWholesale && (
                            <span className="mr-1 text-[11px] font-normal text-sys-text-muted">
                              опт ·
                            </span>
                          )}
                          <Price amount={lineTotal} as="span" />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            }
            return null
          })}
        </ul>

        <section className="border-t border-sys-border pt-space-15 flex flex-col gap-space-10 tablet:flex-row tablet:justify-between tablet:items-center">
          <div className="grid gap-[2px]">
            <small className="m-0 text-[11px] uppercase tracking-[0.18em] text-sys-text-muted">
              Всього за товари
            </small>
            <p className="m-0 block w-full rounded-radius-primary bg-sys-danger/10 px-space-10 py-space-08 text-[10px] leading-relaxed text-sys-danger">
              Увага: вартість доставки не входить у вартість товарів і буде
              розрахована окремо за тарифами обраної поштової служби.
            </p>
          </div>
          <Price
            className="text-2xl font-semibold text-sys-text"
            amount={cart.subtotal || 0}
          />
        </section>
      </div>

      <footer className="pt-space-15 flex flex-col-reverse tablet:flex-row tablet:items-center tablet:justify-between gap-space-10 min-w-0">
        {onBack ? (
          <Button
            type="button"
            variant="back"
            size="lg"
            className="rounded-radius-full px-space-20"
            onClick={onBack}
          >
            Назад
          </Button>
        ) : (
          <div />
        )}
        <Button
          type="button"
          size="lg"
          className="rounded-radius-full px-space-20 bg-sys-btn-primary-bg text-sys-btn-primary-fg hover:bg-sys-btn-primary-bg-hover active:bg-sys-btn-primary-bg-active tablet:ml-auto"
          onClick={onNext}
        >
          Далі
        </Button>
      </footer>
    </section>
  )
}
