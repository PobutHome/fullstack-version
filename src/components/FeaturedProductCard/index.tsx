'use client'

import { Button } from '@/components/Button'
import clsx from 'clsx'

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
}: FeaturedProductCardProps) {
  const formatPriceUAH = (amount: number): string => {
    return `${amount.toLocaleString('uk-UA')} грн`
  }

  return (
    <article
      className={clsx(
        'group h-full flex flex-col',
        'rounded-radius-primary border border-sys-accent bg-sys-surface overflow-hidden',
        'transition-colors hover:bg-sys-surface-2 hover:border-sys-border-strong-hover',
      )}
    >
      <div className="relative">
        <div className="w-full aspect-square flex items-center justify-center overflow-hidden bg-sys-overlay p-space-20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03] drop-shadow-[0_10px_22px_rgba(31,59,115,0.12)]"
              loading="lazy"
              decoding="async"
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
            className={clsx(
              'w-2 h-2 rounded-full shrink-0',
              isAvailable ? 'bg-sys-accent' : 'bg-sys-text-muted',
            )}
          />
          <small className={clsx('m-0', isAvailable ? 'text-sys-accent' : 'text-sys-text-muted')}>
            {isAvailable ? 'в наявності' : 'немає в наявності'}
          </small>
        </div>

        <div className="min-w-0 grid gap-1">
          <p className="m-0 text-color-black truncate">{productName}</p>
          <p className="m-0 text-color-black truncate">{specifications}</p>
        </div>

        <div className="mt-auto grid gap-2 tablet:gap-layout-gap-1">
          <div className="grid gap-2 tablet:gap-space-10 tablet:grid-cols-2">
            <div className="flex items-baseline justify-between gap-2 min-w-0 tablet:block">
              <p className="m-0 text-sys-surface-accent font-semibold text-sm tablet:text-base desktop:text-lg leading-tight wrap-break-word">
                {formatPriceUAH(retailPrice)}
              </p>
              <small className="text-sys-accent">роздріб</small>
            </div>
            <div className="flex items-baseline justify-between gap-2 min-w-0 tablet:block">
              <p className="m-0 text-sys-surface-accent font-semibold text-sm tablet:text-base desktop:text-lg leading-tight wrap-break-word">
                {formatPriceUAH(wholesalePrice)}
              </p>
              <small className="text-sys-accent">опт від {wholesaleMinQuantity} шт</small>
            </div>
          </div>

          <div className="flex flex-col gap-2 tablet:gap-space-10 desktop:flex-col desktop:items-stretch wide:flex-row wide:flex-wrap wide:items-center wide:gap-2">
            <Button
              type="button"
              variant="productCardButton"
              size="md"
              className="w-full wide:flex-1 wide:w-auto text-sm text-center min-h-[40px] px-3 py-1.5 tablet:px-4 tablet:py-2 wide:px-5 whitespace-normal wrap-break-word leading-snug"
              onClick={onRetailAddToCart}
            >
              Додати в кошик
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
