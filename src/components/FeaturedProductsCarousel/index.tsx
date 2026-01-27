'use client'

import { FeaturedProductCard } from '@/components/FeaturedProductCard'
import {
  type TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

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
  const [currentIndex, setCurrentIndex] = useState<number>(0) // index of the left-most visible item

  // Clamp initial items per view so we never request more visible slots
  // than we actually have products. This keeps the left-most item layout stable
  // and avoids rendering duplicates on first paint.
  const [itemsPerView, setItemsPerView] = useState<number>(() => {
    const base = initialItemsPerView ?? getItemsPerView()
    const safeProductsCount = Math.max(1, products.length)
    return Math.min(base, safeProductsCount)
  })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalItems = products.length

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView()
      const safeProductsCount = Math.max(1, products.length)
      // Never show more slots than products we actually have
      const clampedItemsPerView = Math.min(newItemsPerView, safeProductsCount)
      setItemsPerView(clampedItemsPerView)
      // For circular carousel we keep currentIndex but normalize it
      setCurrentIndex((prev) =>
        totalItems === 0 ? 0 : ((prev % totalItems) + totalItems) % totalItems,
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [products.length, totalItems])

  const goToNext = useCallback((): void => {
    if (totalItems === 0) return
    setCurrentIndex((prev) => (prev + 1) % totalItems)
  }, [totalItems])

  const goToPrevious = useCallback((): void => {
    if (totalItems === 0) return
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }, [totalItems])

  // Auto-scroll functionality
  useEffect(() => {
    if (totalItems === 0) return
    if (totalItems <= itemsPerView) return

    intervalRef.current = setInterval(goToNext, autoScrollInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [goToNext, autoScrollInterval, totalItems, itemsPerView])

  const handleMouseEnter = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = (): void => {
    if (totalItems > itemsPerView) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  // Touch/swipe handlers
  const startX = useRef<number>(0)
  const currentX = useRef<number>(0)

  const onTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    startX.current = e.touches[0].clientX
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
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

    if (totalItems > itemsPerView) {
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

  // Build visible products in a circular (endless) manner,
  // always starting from the left-most `currentIndex`
  const displayProducts = Array.from({ length: itemsPerView }, (_, i) => {
    const index = (currentIndex + i) % totalItems
    return products[index]
  })

  const showArrows = totalItems > itemsPerView

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-2 wide:grid-cols-3 w-full min-w-0 gap-layout-gap-1">
          {displayProducts.map((product) => {
            return (
              <div key={product.id} className="transition-opacity duration-200 ease-in-out">
                <FeaturedProductCard
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
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <div className="flex justify-center items-center gap-layout-gap-1 mt-layout-gap-2">
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center transition-colors duration-200 ease-in-out text-sys-accent hover:text-sys-accent-hover active:text-sys-accent-active rounded-radius-md hover:bg-[color-mix(in_srgb,var(--sys-accent)_10%,transparent)] focus-visible:outline-2 focus-visible:outline-sys-focus focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
            onClick={goToPrevious}
            // In endless mode we never disable arrows (unless there's not enough items, handled above)
            disabled={false}
            aria-label="Попередні товари"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-6 h-6 shrink-0"
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
            className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center transition-colors duration-200 ease-in-out text-sys-accent hover:text-sys-accent-hover active:text-sys-accent-active rounded-radius-md hover:bg-[color-mix(in_srgb,var(--sys-accent)_10%,transparent)] focus-visible:outline-2 focus-visible:outline-sys-focus focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
            onClick={goToNext}
            disabled={false}
            aria-label="Наступні товари"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-6 h-6 shrink-0"
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
