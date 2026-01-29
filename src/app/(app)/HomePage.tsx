import { Page } from '@/components/Page'
import { Benefits } from '@/sections/home/Benefits'
import { FeaturedProducts, type FeaturedProduct } from '@/sections/home/FeaturedProducts'
import { HomeAboutMap } from '@/sections/home/HomeAboutMap'
import { HomeBanner, type HomeBannerSlide } from '@/sections/home/HomeBanner'
import { HomeCatalog, type HomeCatalogCategory } from '@/sections/home/HomeCatalog'
import { HomeSales } from '@/sections/home/HomeSales'
import { Testimonials } from '@/sections/home/Testimonials'

type Props = {
  categories: HomeCatalogCategory[]
  banners: HomeBannerSlide[]
  featuredProducts: FeaturedProduct[]
}

// Hardcoded home page layout that reads dynamic data (categories, etc.)
// Uses the same layout + tokens as the design system page.
export function HomePage({ categories, banners, featuredProducts }: Props) {
  return (
    <Page
      data-app="frontend"
      sectionsMargin
      className="pt-space-20 pb-space-50"
    >
      <HomeBanner slides={banners} />
      <Benefits />
      <FeaturedProducts products={featuredProducts} />

      {/* Catalog / categories from CMS */}
      <HomeCatalog categories={categories} />

      <HomeSales />
      <Testimonials />
      <HomeAboutMap />
    </Page>
  )
}
