'use client'

import { Button } from '@/components/Button'

type FeaturedProductCardProps = {
  imageUrl?: string
  imageAlt?: string
  isAvailable?: boolean
  productName: string
  specifications: string
  retailPrice: number
  wholesalePrice: number
  wholesaleMinQuantity: number
  onRetailAddToCart?: () => void
  onWholesaleAddToCart?: () => void
}

export function FeaturedProductCard({
  imageUrl,
  imageAlt = 'Product image',
  isAvailable = true,
  productName,
  specifications,
  retailPrice,
  wholesalePrice,
  wholesaleMinQuantity,
  onRetailAddToCart,
  onWholesaleAddToCart,
}: FeaturedProductCardProps) {
  return (
    <article className="fe-product flex flex-col h-full bg-sys-surface rounded-radius-primary border border-sys-accent relative box-border overflow-hidden ">
      {/* Product Image */}
      <div className="w-full aspect-square flex items-center justify-center overflow-hidden bg-sys-overlay p-space-20">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sys-text-muted">
            <span className="text-inherit">Product Image</span>
          </div>
        )}
      </div>

      {/* Product Body */}
      <div className="fe-product__body flex flex-col flex-1 min-h-0 gap-layout-gap-1 p-space-10">
        {/* Availability Status */}
        {isAvailable && (
          <div className="fe-availability flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0 bg-sys-accent" aria-hidden="true"></span>
            <small className="m-0 text-sys-accent">в наявності</small>
          </div>
        )}

        {/* Product Name and Specifications */}
        <div className="grid gap-1 min-w-0">
          <p className="text-color-black truncate">{productName}</p>
          <p className="text-color-black truncate">{specifications}</p>
        </div>

        {/* Retail Price Section */}
        <div className="flex items-start justify-between min-w-0 shrink-0 flex-col tablet:flex-row tablet:flex-wrap  gap-layout-gap-1">
          <div className="grid gap-1 flex-1 min-w-0 w-full tablet:w-auto tablet:flex-[1_1_auto]">
            <h1 className="min-w-0  text-sys-surface-accent">
              {retailPrice} <span className="pobut-body">грн</span>
            </h1>
            <small className=" text-sys-accent">роздріб</small>
          </div>
          <Button
            variant="outline"
            size="md"
            className="shrink-0 whitespace-nowrap text-sm w-full tablet:w-auto tablet:shrink-0 tablet:min-w-fit py-space-10 px-space-20 "
            onClick={onRetailAddToCart}
          >
            Додати в кошик
          </Button>
        </div>

        {/* Wholesale Price Section */}
        <div className="flex items-start justify-between min-w-0 shrink-0 flex-col tablet:flex-row tablet:flex-wrap gap-layout-gap-1">
          <div className="grid gap-1 flex-1 min-w-0 w-full tablet:w-auto tablet:flex-[1_1_auto]">
            <h1 className="min-w-0  text-sys-surface-accent">
              {wholesalePrice} <span className="pobut-body">грн</span>
            </h1>
            <small className=" text-sys-accent">опт від {wholesaleMinQuantity} шт</small>
          </div>
          <Button
            variant="outline"
            size="md"
            className="shrink-0 whitespace-nowrap text-sm w-full tablet:w-auto tablet:shrink-0 tablet:min-w-fit py-space-10 px-space-20"
            onClick={onWholesaleAddToCart}
          >
            Додати в кошик
          </Button>
        </div>
      </div>
    </article>
  )
}
