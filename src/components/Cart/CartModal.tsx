'use client'

import { Button } from '@/components/Button'
import { Price } from '@/components/Price'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

import { Product } from '@/payload-types'
import type { AppLocale } from '@/utilities/locale'
import { getClientLocale } from '@/utilities/localeClient'
import { DeleteItemButton } from './DeleteItemButton'
import { EditItemQuantityButton } from './EditItemQuantityButton'
import { OpenCartButton } from './OpenCart'

const cartCopy: Record<
  AppLocale,
  {
    title: string
    empty: string
    total: string
    checkout: string
  }
> = {
  ua: {
    title: 'Кошик',
    empty: 'Кошик порожній.',
    total: 'Разом',
    checkout: 'Оформити',
  },
  ru: {
    title: 'Корзина',
    empty: 'Корзина пуста.',
    total: 'Итого',
    checkout: 'Оформить',
  },
}

export function CartModal({ locale }: { locale?: AppLocale }) {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const resolvedLocale = locale ?? getClientLocale()
  const t = cartCopy[resolvedLocale]

  const pathname = usePathname()

  useEffect(() => {
    // Close the cart modal when the pathname changes.
    setIsOpen(false)
  }, [pathname])

  const totalQuantity = useMemo(() => {
    if (!cart || !cart.items || !cart.items.length) return undefined
    return cart.items.reduce((quantity, item) => (item.quantity || 0) + quantity, 0)
  }, [cart])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <OpenCartButton locale={resolvedLocale} quantity={totalQuantity} />
      </SheetTrigger>

      <SheetContent className="flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-sys-bg text-sys-text">
        <SheetHeader className="px-space-20 pt-space-20">
          <SheetTitle className="pobut-H3 desktop:pobut-body">{t.title}</SheetTitle>
        </SheetHeader>

        {!cart || cart?.items?.length === 0 ? (
          <div className="text-center flex flex-col items-center gap-2">
            <ShoppingCart className="h-16" />
            <p className="text-center text-2xl font-bold">{t.empty}</p>
          </div>
        ) : (
          <div className="flex flex-1 min-h-0 flex-col px-space-20">
              <ul className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch] py-space-20 space-y-space-10">
                {cart?.items?.map((item, i) => {
                  const product = item.product
                  const variant = item.variant

                  if (typeof product !== 'object' || !item || !product || !product.slug)
                    return <React.Fragment key={i} />

                  const metaImage =
                    product.meta?.image && typeof product.meta?.image === 'object'
                      ? product.meta.image
                      : undefined

                  const firstGalleryImage =
                    typeof product.gallery?.[0]?.image === 'object'
                      ? product.gallery?.[0]?.image
                      : undefined

                  let image = firstGalleryImage || metaImage
                  let price = product.priceInUAH

                  const isVariant = Boolean(variant) && typeof variant === 'object'

                  if (isVariant) {
                    price = variant?.priceInUAH

                    const imageVariant = product.gallery?.find((item) => {
                      if (!item.variantOption) return false
                      const variantOptionID =
                        typeof item.variantOption === 'object'
                          ? item.variantOption.id
                          : item.variantOption

                      const hasMatch = variant?.options?.some((option) => {
                        if (typeof option === 'object') return option.id === variantOptionID
                        else return option === variantOptionID
                      })

                      return hasMatch
                    })

                    if (imageVariant && typeof imageVariant.image === 'object') {
                      image = imageVariant.image
                    }
                  }

                  return (
                    <li
                      className="relative w-full max-w-full shrink-0 min-h-[140px] rounded-radius-primary border border-sys-card-border bg-sys-card-bg p-space-10"
                      key={i}
                    >
                      <div className="absolute right-2 top-2 z-10">
                        <DeleteItemButton item={item} />
                      </div>

                      <div className="flex flex-col gap-space-10">
                        <Link
                          className="flex min-w-0 items-start gap-space-10"
                          href={`/products/${(item.product as Product)?.slug}`}
                        >
                          <div className="relative h-20 w-20 desktop:h-16 desktop:w-16 shrink-0 cursor-pointer overflow-hidden rounded-radius-md border border-sys-card-border bg-sys-surface-2">
                            {image?.url && (
                              <Image
                                alt={image?.alt || product?.title || ''}
                                className="h-full w-full object-cover"
                                height={160}
                                src={image.url}
                                width={160}
                              />
                            )}
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col pr-8">
                            <span className="pobut-body leading-tight text-sys-text wrap-break-word">
                              {product?.title}
                            </span>
                            {isVariant && variant ? (
                              <p className="pobut-caption text-sys-text-muted capitalize wrap-break-word">
                                {variant.options
                                  ?.map((option) => {
                                    if (typeof option === 'object') return option.label
                                    return null
                                  })
                                  .join(', ')}
                              </p>
                            ) : null}
                          </div>
                        </Link>

                        <div className="flex shrink-0 items-center justify-between gap-space-10">
                          <div className="flex h-9 flex-row items-center rounded-radius-full border border-sys-btn-interactive-border bg-sys-surface px-1">
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="min-w-6 text-center">
                              <span className="text-sm text-sys-text">{item.quantity}</span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>

                          {typeof price === 'number' && (
                            <Price
                              amount={price}
                              className="shrink-0 text-right text-sm text-sys-text whitespace-nowrap"
                            />
                          )}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="shrink-0 pb-space-20">
                <div className="pt-space-10 text-sm text-sys-text-muted">
                  {typeof cart?.subtotal === 'number' && (
                    <div className="mb-space-10 flex items-center justify-between border-b border-sys-border pb-space-10 pt-space-10">
                      <p className="pobut-caption text-sys-text-muted">{t.total}</p>
                      <Price
                        amount={cart?.subtotal}
                        className="text-right text-base text-sys-text"
                      />
                    </div>
                  )}

                  <Button asChild variant="primary" size="md" fullWidth>
                    <Link className="w-full" href="/checkout">
                      {t.checkout}
                    </Link>
                  </Button>
                </div>
              </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
