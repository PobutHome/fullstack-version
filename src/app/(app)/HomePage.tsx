import { Page } from '@/components/Page'
import { Benefits } from '@/sections/home/Benefits'
import { FeaturedProducts, type FeaturedProduct } from '@/sections/home/FeaturedProducts'
import { HomeAboutMap } from '@/sections/home/HomeAboutMap'
import { HomeBanner, type HomeBannerSlide } from '@/sections/home/HomeBanner'
import { HomeCatalog, type HomeCatalogCategory } from '@/sections/home/HomeCatalog'
import { HomeSales, type HomeSalesSlide } from '@/sections/home/HomeSales'
import { Testimonials } from '@/sections/home/Testimonials'

type Props = {
  categories: HomeCatalogCategory[]
  banners: HomeBannerSlide[]
  salesBanners: HomeSalesSlide[]
  featuredProducts: FeaturedProduct[]
}

export function HomePage({ categories, banners, salesBanners, featuredProducts }: Props) {
  return (
    <Page
      data-app="frontend"
      sectionsMargin
      className="pt-layout-gap-2 pb-layout-gap-3"
    >
      <HomeBanner slides={banners} />
      <Benefits />
      <FeaturedProducts products={featuredProducts} />
      <HomeCatalog categories={categories} />
      <HomeSales slides={salesBanners} />
      <Testimonials />
      <HomeAboutMap />
    </Page>
  )
}
