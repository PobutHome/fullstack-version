'use client'
import { Product, Variant } from '@/payload-types'
import { getClientLocale } from '@/utilities/localeClient'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type Props = {
  product: Product
}

export const StockIndicator: React.FC<Props> = ({ product }) => {
  const searchParams = useSearchParams()
  const locale = getClientLocale()

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

  const stockQuantity = useMemo(() => {
    if (product.enableVariants) {
      if (selectedVariant) {
        return selectedVariant.inventory || 0
      }
    }
    return product.inventory || 0
  }, [product.enableVariants, selectedVariant, product.inventory])

  if (product.enableVariants && !selectedVariant) {
    return null
  }

  const lowStockLabel = locale === 'ru' ? 'Осталось' : 'Залишилось'
  const lowStockSuffix = locale === 'ru' ? 'шт.' : 'шт.'
  const outOfStockLabel = locale === 'ru' ? 'Нет в наличии' : 'Немає в наявності'
  const inStockLabel = locale === 'ru' ? 'В наличии' : 'В наявності'

  return (
    <div className="pobut-caption text-sys-text-muted">
      {stockQuantity > 10 && <p>{inStockLabel}</p>}
      {stockQuantity <= 10 && stockQuantity > 0 && (
        <p>
          {lowStockLabel} {stockQuantity} {lowStockSuffix}
        </p>
      )}
      {(stockQuantity === 0 || !stockQuantity) && <p>{outOfStockLabel}</p>}
    </div>
  )
}
