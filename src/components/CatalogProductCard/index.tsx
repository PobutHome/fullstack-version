'use client'

import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
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
        'group cursor-pointer select-none',
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

      <div className="p-space-10 grid gap-2">
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
          <p className="m-0 text-color-black overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
            {product.title}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            {typeof price === 'number' ? (
              <div className="text-sys-surface-accent">
                <Price amount={price} />
              </div>
            ) : (
              <div className="text-sys-text-muted">—</div>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="md"
            className="shrink-0 whitespace-nowrap text-sm"
            onClick={onAddToCart}
            disabled={disabled}
            aria-label="Додати до кошика"
          >
            {isAlreadyInCart ? 'В кошику' : 'Додати в кошик'}
          </Button>
        </div>
      </div>
    </article>
  )
}

