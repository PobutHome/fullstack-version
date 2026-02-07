'use client'

import { Media } from '@/components/Media'
import { Button } from '@/components/Button'
import type { Product, Variant } from '@/payload-types'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { toast } from 'sonner'

type Props = {
  product: Product
}

function getFirstGalleryImage(product: Product) {
  const image = product.gallery?.[0]?.image
  return image && typeof image !== 'string' ? image : null
}

function pickDefaultVariant(product: Product): Variant | null {
  const docs = product.variants?.docs || []
  const variants = docs.filter((v): v is Variant => typeof v === 'object')
  if (!variants.length) return null

  // Prefer in-stock variants first.
  const inStock = variants.find((v) => (v.inventory || 0) > 0)
  return inStock || variants[0] || null
}

function formatPriceUAH(amount: number): string {
  return `${amount.toLocaleString('uk-UA')} грн`
}

export function CatalogProductCard({ product }: Props) {
  const router = useRouter()
  const { addItem, cart } = useCart()

  const image = getFirstGalleryImage(product)

  const defaultVariant = useMemo(() => {
    if (!product.enableVariants) return null
    return pickDefaultVariant(product)
  }, [product])

  const href = useMemo(() => {
    const base = `/products/${product.slug}`
    return defaultVariant ? `${base}?variant=${defaultVariant.id}` : base
  }, [defaultVariant, product.slug])

  const price = useMemo(() => {
    if (defaultVariant?.priceInUAH && typeof defaultVariant.priceInUAH === 'number') return defaultVariant.priceInUAH
    return product.priceInUAH
  }, [defaultVariant?.priceInUAH, product.priceInUAH])

  const wholesalePrice = useMemo(() => {
    if (typeof price === 'number') return price
    return null
  }, [price])
  const wholesaleMinQuantity = 1

  const inStock = useMemo(() => {
    if (product.enableVariants) return (defaultVariant?.inventory || 0) > 0
    return (product.inventory || 0) > 0
  }, [defaultVariant?.inventory, product.enableVariants, product.inventory])

  const isAlreadyInCart = useMemo(() => {
    const items = cart?.items || []
    return items.some((item) => {
      const productID = typeof item.product === 'object' ? item.product?.id : item.product
      const variantID = item.variant
        ? typeof item.variant === 'object'
          ? item.variant?.id
          : item.variant
        : undefined

      if (productID !== product.id) return false
      if (product.enableVariants) return variantID === (defaultVariant?.id ?? undefined)
      return true
    })
  }, [cart?.items, defaultVariant?.id, product.enableVariants, product.id])

  const disabled = !inStock || (product.enableVariants ? !defaultVariant : false)

  const onAddToCart = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (disabled) return

      await addItem({
        product: product.id,
        variant: product.enableVariants ? (defaultVariant?.id ?? undefined) : undefined,
      })

      toast.success('Товар додано до кошика.')
    },
    [addItem, defaultVariant?.id, disabled, product.enableVariants, product.id],
  )

  const onOpen = useCallback(() => {
    router.push(href)
  }, [href, router])

  const onOpenFromButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      router.push(href)
    },
    [href, router],
  )

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={product.title}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      className={clsx(
        'group cursor-pointer select-none h-full flex flex-col',
        'rounded-radius-primary border border-sys-accent bg-sys-surface overflow-hidden',
        'transition-colors hover:bg-sys-surface-2 hover:border-sys-border-strong-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sys-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sys-bg',
      )}
      data-href={href}
    >
      <div className="relative">
        <div className="w-full aspect-square flex items-center justify-center overflow-hidden bg-sys-overlay p-space-20">
          {image ? (
            <Media
              resource={image}
              className="relative w-full h-full"
              imgClassName="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03] drop-shadow-[0_10px_22px_rgba(31,59,115,0.12)]"
              fill
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sys-text-muted">
              <span className="text-inherit">Product Image</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-space-10 flex flex-col gap-1 tablet:gap-2 flex-1 min-h-0">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={clsx('w-2 h-2 rounded-full shrink-0', inStock ? 'bg-sys-accent' : 'bg-sys-text-muted')}
          />
          <small className={clsx('m-0', inStock ? 'text-sys-accent' : 'text-sys-text-muted')}>
            {inStock ? 'в наявності' : 'немає в наявності'}
          </small>
        </div>

        <div className="min-w-0">
          <p className="m-0 text-color-black truncate">
            {product.title}
          </p>
        </div>

        <div className="mt-auto grid gap-2 tablet:gap-layout-gap-1">
          <div className="grid gap-2 tablet:gap-space-10 tablet:grid-cols-2">
            <div className="flex items-baseline justify-between gap-2 min-w-0 tablet:block">
              {typeof price === 'number' ? (
                <p className="m-0 text-sys-surface-accent font-semibold text-sm tablet:text-base desktop:text-lg leading-tight wrap-break-word">
                  {formatPriceUAH(price)}
                </p>
              ) : (
                <div className="text-sys-text-muted">—</div>
              )}
              <small className="text-sys-accent">роздріб</small>
            </div>
            <div className="flex items-baseline justify-between gap-2 min-w-0 tablet:block">
              {typeof wholesalePrice === 'number' ? (
                <p className="m-0 text-sys-surface-accent font-semibold text-sm tablet:text-base desktop:text-lg leading-tight wrap-break-word">
                  {formatPriceUAH(wholesalePrice)}
                </p>
              ) : (
                <div className="text-sys-text-muted">—</div>
              )}
              <small className="text-sys-accent">опт від {wholesaleMinQuantity} шт</small>
            </div>
          </div>

          <div className="flex flex-col gap-2 tablet:gap-space-10 desktop:flex-col desktop:items-stretch wide:flex-row wide:flex-wrap wide:items-center wide:gap-2">
            <Button
              type="button"
              variant="productCardButton"
              size="md"
              className="w-full wide:flex-1 wide:w-auto text-sm text-center min-h-[40px] px-3 py-1.5 tablet:px-4 tablet:py-2 wide:px-5 whitespace-normal wrap-break-word leading-snug"
              onClick={onAddToCart}
              disabled={disabled}
              aria-label="Додати до кошика"
            >
              {isAlreadyInCart ? 'В кошику' : 'Додати в кошик'}
            </Button>
            <Button
              type="button"
              variant="productCardIcon"
              size="sm"
              className="w-full wide:w-9 wide:h-9 h-9 tablet:h-10 p-0 shrink-0"
              onClick={onOpenFromButton}
              aria-label="Відкрити сторінку товару"
              title="Відкрити сторінку товару"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-sys-text-on-accent"
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

