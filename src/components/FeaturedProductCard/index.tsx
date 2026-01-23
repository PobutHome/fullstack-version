'use client'

import { Button } from '@/components/Button'
import './featuredProductCard.css'

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
    <article className="fe-product featured-product-card">
      {/* Product Image */}
      <div className="featured-product-card__image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="featured-product-card__image"
            loading="lazy"
          />
        ) : (
          <div className="featured-product-card__image-placeholder">
            <span>Product Image</span>
          </div>
        )}
      </div>

      {/* Product Body */}
      <div className="fe-product__body featured-product-card__body">
        {/* Availability Status */}
        {isAvailable && (
          <div className="fe-availability featured-product-card__availability">
            <span className="featured-product-card__availability-dot" aria-hidden="true"></span>
            <p>в наявності</p>
          </div>
        )}

        {/* Product Name and Specifications */}
        <div className="featured-product-card__info">
          <h3>{productName}</h3>
          <p>{specifications}</p>
        </div>

        {/* Retail Price Section */}
        <div className="featured-product-card__pricing-section">
          <div className="featured-product-card__price-group">
            <h1 className="featured-product-card__price">
              {formatPrice(retailPrice)}
            </h1>
            <small className="featured-product-card__price-label">роздріб</small>
          </div>
          <Button
            variant="outline"
            size="md"
            className="featured-product-card__button"
            onClick={onRetailAddToCart}
          >
            Додати в кошик
          </Button>
        </div>

        {/* Wholesale Price Section */}
        <div className="featured-product-card__pricing-section">
          <div className="featured-product-card__price-group">
            <h1 className="featured-product-card__price">
              {formatPrice(wholesalePrice)}
            </h1>
            <small className="featured-product-card__price-label">
              опт від {wholesaleMinQuantity} шт
            </small>
          </div>
          <Button
            variant="outline"
            size="md"
            className="featured-product-card__button"
            onClick={onWholesaleAddToCart}
          >
            Додати в кошик
          </Button>
        </div>
      </div>
    </article>
  )
}

