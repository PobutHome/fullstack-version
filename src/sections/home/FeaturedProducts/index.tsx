import { Container } from '@/components/Container'
import { FeaturedProductsCarouselWrapper } from '@/components/FeaturedProductsCarousel/Wrapper.client'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import './featuredProducts.css'

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

type FeaturedProductsProps = {
  products?: FeaturedProduct[]
}

// Mock data - replace with actual data fetching later
const defaultProducts: FeaturedProduct[] = [
  {
    id: '1',
    imageUrl: '/images/cups.png',
    imageAlt: 'Паперові стакани',
    isAvailable: true,
    productName: 'Паперові стакани',
    specifications: '250 мл / 50 шт',
    retailPrice: 265,
    wholesalePrice: 230,
    wholesaleMinQuantity: 50,
  },
  {
    id: '2',
    imageUrl: '/images/cups.png',
    imageAlt: 'Паперові стакани',
    isAvailable: true,
    productName: 'Паперові стакани',
    specifications: '250 мл / 50 шт',
    retailPrice: 265,
    wholesalePrice: 230,
    wholesaleMinQuantity: 50,
  },
  {
    id: '3',
    imageUrl: '/images/cups.png',
    imageAlt: 'Паперові стакани',
    isAvailable: true,
    productName: 'Паперові стакани',
    specifications: '250 мл / 50 шт',
    retailPrice: 265,
    wholesalePrice: 230,
    wholesaleMinQuantity: 50,
  },
  {
    id: '4',
    imageUrl: '/images/cups.png',
    imageAlt: 'Паперові стакани',
    isAvailable: true,
    productName: 'Паперові stookenes',
    specifications: '250 мл / 50 шт',
    retailPrice: 265,
    wholesalePrice: 230,
    wholesaleMinQuantity: 50,
  },
  {
    id: '5',
    imageUrl: '/images/cups.png',
    imageAlt: 'Паперові стакани',
    isAvailable: true,
    productName: 'Паперові стакани',
    specifications: '250 мл / 50 шт',
    retailPrice: 265,
    wholesalePrice: 230,
    wholesaleMinQuantity: 50,
  },
  {
    id: '6',
    imageUrl: '/images/cups.png',
    imageAlt: 'Паперові стакани',
    isAvailable: true,
    productName: 'Паперові стакани',
    specifications: '250 мл / 50 шт',
    retailPrice: 265,
    wholesalePrice: 230,
    wholesaleMinQuantity: 50,
  },
]

export const FeaturedProducts = ({ products = defaultProducts }: FeaturedProductsProps) => {
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
