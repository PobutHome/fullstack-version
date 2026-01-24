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
  const formatPrice = (price: number) => `${price} грн`

  return (
    <article className="fe-product flex flex-col h-full">
      {/* Product Image */}
      <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sys-text-muted">
            <span className="text-[inherit]">Product Image</span>
          </div>
        )}
      </div>

      {/* Product Body */}
      <div className="fe-product__body flex flex-col flex-1 min-h-0 gap-layout-gap-1 p-space-10">
        {/* Availability Status */}
        {isAvailable && (
          <div className="fe-availability flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full shrink-0 bg-sys-accent" aria-hidden="true"></span>
            <small className="m-0">в наявності</small>
          </div>
        )}

        {/* Product Name and Specifications */}
        <div className="grid gap-1 min-w-0 break-words">
          <p className="text-color-black break-words">{productName} {specifications}</p>
        </div>

        {/* Retail Price Section */}
        <div className="flex items-start justify-between min-w-0 shrink-0 flex-col sm:flex-row sm:flex-wrap">
          <div className="grid gap-1 flex-1 min-w-0 w-full sm:w-auto sm:flex-[1_1_auto]">
            <h1 className="min-w-0 break-words text-sys-surface-accent">
              {formatPrice(retailPrice)}
            </h1>
            <small className="break-words text-sys-accent">роздріб</small>
          </div>
          <Button
            variant="outline"
            size="md"
            className="shrink-0 whitespace-nowrap text-sm w-full sm:w-auto sm:shrink-0 sm:min-w-fit py-space-10 px-space-20"
            onClick={onRetailAddToCart}
          >
            Додати в кошик
          </Button>
        </div>

        {/* Wholesale Price Section */}
        <div className="flex items-start justify-between min-w-0 shrink-0 flex-col sm:flex-row sm:flex-wrap">
          <div className="grid gap-1 flex-1 min-w-0 w-full sm:w-auto sm:flex-[1_1_auto]">
            <h1 className="min-w-0 break-words text-sys-surface-accent">
              {formatPrice(wholesalePrice)}
            </h1>
            <small className="break-words text-sys-accent">
              опт від {wholesaleMinQuantity} шт
            </small>
          </div>
          <Button
            variant="outline"
            size="md"
            className="shrink-0 whitespace-nowrap text-sm w-full sm:w-auto sm:shrink-0 sm:min-w-fit py-space-10 px-space-20"
            onClick={onWholesaleAddToCart}
          >
            Додати в кошик
          </Button>
        </div>
      </div>
    </article>
  )
}

