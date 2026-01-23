'use client'

import { FeaturedProductCard } from '@/components/FeaturedProductCard'
import { useCallback, useEffect, useRef, useState } from 'react'
import './featuredProductsCarousel.css'

type FeaturedProduct = {
  id: string
  imageUrl?: string
  imageAlt?: string
  isAvailable?: boolean
  productName: string
  specifications: string
  retailPrice: number
  wholesalePrice: number
  wholesaleMinQuantity: number
}

type FeaturedProductsCarouselProps = {
  products: FeaturedProduct[]
  itemsPerView?: number
  autoScrollInterval?: number
}

const DEFAULT_AUTO_SCROLL_INTERVAL = 5000 // 5s

// Calculate items per view based on screen size (mobile-first: 2 default, 3 on desktop)
const getItemsPerView = (): number => {
  if (typeof window === 'undefined') return 2
  if (window.innerWidth >= 1152) return 3 // Desktop (72rem)
  return 2 // Mobile and tablet
}

export function FeaturedProductsCarousel({
  products,
  itemsPerView: initialItemsPerView,
  autoScrollInterval = DEFAULT_AUTO_SCROLL_INTERVAL,
}: FeaturedProductsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [itemsPerView, setItemsPerView] = useState<number>(
    initialItemsPerView || getItemsPerView()
  )
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate max index (can't go beyond this)
  const maxIndex = Math.max(0, products.length - itemsPerView)

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView()
      setItemsPerView(newItemsPerView)
      // Adjust currentIndex if it would be out of bounds
      const newMaxIndex = Math.max(0, products.length - newItemsPerView)
      setCurrentIndex((prev) => Math.min(prev, newMaxIndex))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [products.length])

  const goToNext = useCallback((): void => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return prev
      return prev + 1
    })
  }, [maxIndex])

  const goToPrevious = useCallback((): void => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev
      return prev - 1
    })
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (products.length <= itemsPerView || maxIndex <= 0) return

    intervalRef.current = setInterval(goToNext, autoScrollInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [goToNext, autoScrollInterval, products.length, itemsPerView, maxIndex])

  const handleMouseEnter = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = (): void => {
    if (products.length > itemsPerView && maxIndex > 0) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  // Touch/swipe handlers
  const startX = useRef<number>(0)
  const currentX = useRef<number>(0)

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startX.current = e.touches[0].clientX
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    currentX.current = e.touches[0].clientX
  }

  const onTouchEnd = (): void => {
    const diff = startX.current - currentX.current

    if (diff > 50) {
      goToNext()
    }

    if (diff < -50) {
      goToPrevious()
    }

    if (products.length > itemsPerView && maxIndex > 0) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  const handleRetailAddToCart = (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart (retail):', productId)
  }

  const handleWholesaleAddToCart = (productId: string) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart (wholesale):', productId)
  }

  if (!products || products.length === 0) {
    return null
  }

  // Get visible products - show items from currentIndex to currentIndex + itemsPerView
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView)
  
  // Fill with empty slots if needed to maintain grid layout
  const emptySlots = Math.max(0, itemsPerView - visibleProducts.length)
  const displayProducts = [...visibleProducts, ...Array(emptySlots).fill(null)]

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  return (
    <div
      className="featured-products-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="featured-products-carousel__window"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="featured-products-grid">
          {displayProducts.map((product, index) => {
            if (!product) {
              return <div key={`empty-${index}`} className="featured-products-grid__empty-slot" />
            }
            return (
              <FeaturedProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                isAvailable={product.isAvailable}
                productName={product.productName}
                specifications={product.specifications}
                retailPrice={product.retailPrice}
                wholesalePrice={product.wholesalePrice}
                wholesaleMinQuantity={product.wholesaleMinQuantity}
                onRetailAddToCart={() => handleRetailAddToCart(product.id)}
                onWholesaleAddToCart={() => handleWholesaleAddToCart(product.id)}
              />
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      {maxIndex > 0 && (
        <div className="featured-products-navigation">
          <button
            type="button"
            className="featured-products-navigation__arrow"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            aria-label="Попередні товари"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="featured-products-navigation__arrow"
            onClick={goToNext}
            disabled={!canGoNext}
            aria-label="Наступні товари"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

// Export as default for dynamic import
export default FeaturedProductsCarousel
