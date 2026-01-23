'use client'

import dynamic from 'next/dynamic'

// Dynamically import the carousel component to optimize bundle size
// This reduces initial bundle size and improves homepage load time
// Wrapper is needed because ssr: false requires a client component
const FeaturedProductsCarousel = dynamic(
  () => import('./index'),
  {
    ssr: false, // Disable SSR for carousel to reduce initial load
    loading: () => (
      <div className="featured-products-loading">
        <p>Завантаження товарів...</p>
      </div>
    ),
  }
)

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

type FeaturedProductsCarouselWrapperProps = {
  products: FeaturedProduct[]
}

export function FeaturedProductsCarouselWrapper({
  products,
}: FeaturedProductsCarouselWrapperProps) {
  return <FeaturedProductsCarousel products={products} />
}

