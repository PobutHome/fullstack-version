import { Container } from '@/components/Container'
import { FeaturedProductsCarouselWrapper } from '@/components/FeaturedProductsCarousel/Wrapper.client'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'

export type FeaturedProduct = {
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

type FeaturedProductsProps = {
  products?: FeaturedProduct[]
}

export const FeaturedProducts = ({ products = [] }: FeaturedProductsProps) => {
  if (!products.length) return null

  return (
    <Section
      id="featured-products"
      aria-labelledby="home-featured-products-title"
    >
      <Container>
        <InnerSection>
          <FeaturedProductsCarouselWrapper products={products} />
        </InnerSection>
      </Container>
    </Section>
  )
}
