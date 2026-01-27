import { Page } from '@/components/Page'
import { Benefits } from '@/sections/home/Benefits'
import { FeaturedProducts } from '@/sections/home/FeaturedProducts'
import { HomeBanner } from '@/sections/home/HomeBanner'
import { HomeCatalog, type HomeCatalogCategory } from '@/sections/home/HomeCatalog'
import { HomeSales } from '@/sections/home/HomeSales'

type Props = {
  categories: HomeCatalogCategory[]
}

// Hardcoded home page layout that reads dynamic data (categories, etc.)
// Uses the same layout + tokens as the design system page.
export function HomePage({ categories }: Props) {
  return (
    <Page
      data-app="frontend"
      background
      sectionsMargin
      className="pt-space-20 pb-space-50"
    >
      <HomeBanner />{/*implement homebanner fetching banners from cms, and enable creation of those banners */}
      <Benefits />
      <FeaturedProducts />

      {/* Catalog / categories from CMS */}
      <HomeCatalog categories={categories} />

      <HomeSales />
    </Page>
  )
}
