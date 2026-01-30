import { Container } from '@/components/Container'
import { InnerSection } from '@/components/InnerSection'
import { Section } from '@/components/Section'
import type { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export type HomeCatalogCategory = {
  id: string
  title: string
  imageUrl?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
}

type Props = {
  categories: HomeCatalogCategory[]
  title?: string
}

const DEFAULT_IMAGE_URL = '/images/category-placeholder.svg'

function getSafeCategoryImage(category: HomeCatalogCategory) {
  const url = category.imageUrl?.trim() || DEFAULT_IMAGE_URL
  const alt = category.imageAlt?.trim() || category.title || 'Категорія'

  return {
    alt,
    url,
  }
}

export function HomeCatalog({ categories }: Props) {
  if (!categories?.length) return null

  return (
    <Section id="catalog" aria-labelledby="home-catalog-title">
      <Container>
        <InnerSection className="grid gap-layout-gap-2">

          <div>
            <h2 id="home-catalog-title">Каталог</h2>
          </div>

          <ul
            aria-label="Категорії товарів"
            className={[
              // Mobile first: 2 columns like the mockups.
              'list-none m-0 p-0',
              'grid grid-cols-2 gap-layout-gap-1',
              // Desktop: 3 columns.
              'desktop:grid-cols-3',
            ].join(' ')}
          >
            {categories.map((category) => {
              const image = getSafeCategoryImage(category)
              const href = `/shop/category=${encodeURIComponent(category.id)}`

              return (
                <li key={category.id} className="min-w-0">
                  <Link
                    href={href}
                    className={[
                      'group relative block min-w-0 no-underline',
                      // Card
                      'rounded-xl border border-sys-accent bg-sys-surface',
                      // Sizing: visually matches the mockups across breakpoints
                      'h-[104px] sm:h-[120px] md:h-[136px] lg:h-[152px]',
                      // Hover / focus polish
                      'transition-colors',
                      'hover:bg-sys-surface-2 hover:border-sys-border-strong-hover',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sys-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sys-bg',
                      // Layout
                      'overflow-hidden',
                    ].join(' ')}
                  >
                    {/* soft highlight to help the “designed” look */}
                    <span
                      aria-hidden="true"
                      className={[
                        'pointer-events-none absolute inset-0',
                        'bg-[radial-gradient(60%_80%_at_70%_10%,rgba(57,181,74,0.12)_0%,rgba(57,181,74,0)_60%)]',
                        'opacity-70 group-hover:opacity-100 transition-opacity',
                      ].join(' ')}
                    />

                    <div className="relative h-full w-full">
                      {/* Background image layer */}
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        priority={false}
                        className={[
                          'absolute inset-0',
                          // Keep the product-like render on the right, like mockups, but span the whole card.
                          'object-contain object-right',
                          'px-[10px] sm:px-[12px] md:px-[14px]',
                          // Subtle pop on hover
                          'transition-transform duration-200 group-hover:scale-[1.03]',
                          // Slight soft shadow like product renders
                          'drop-shadow-[0_10px_22px_rgba(31,59,115,0.12)]',
                        ].join(' ')}
                      />

                      {/* Title readability gradient (text sits over image) */}
                      <span
                        aria-hidden="true"
                        className={[
                          'pointer-events-none absolute inset-0',
                          'bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.70)_46%,rgba(255,255,255,0.00)_78%)]',
                        ].join(' ')}
                      />

                      {/* Title (on top of image) */}
                      <div className="absolute z-10 left-[14px] bottom-[12px] right-[56px] sm:left-[16px] sm:bottom-[14px] sm:right-[68px] md:left-[18px] md:bottom-[16px] md:right-[78px]">
                        <span
                          className={[
                            'block font-semibold text-sys-accent',
                            'text-[12px] leading-[1.1]',
                            'sm:text-[13px]',
                            'md:text-[14px]',
                            'lg:text-[15px]',
                            // Keep it tidy like the mockups
                            'overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]',
                          ].join(' ')}
                        >
                          {category.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>

        </InnerSection>
      </Container>
    </Section>
  )
}

export function extractCategoryImageFromProduct(product: {
  meta?: { image?: string | Media | null } | null
  gallery?: { image: string | Media }[] | null
}) {
  const metaImage = product?.meta?.image
  if (metaImage && typeof metaImage === 'object' && metaImage.url) {
    return { alt: metaImage.alt, url: metaImage.url }
  }

  const firstGallery = product?.gallery?.find((g) => typeof g.image === 'object')
  if (firstGallery && typeof firstGallery.image === 'object' && firstGallery.image.url) {
    return { alt: firstGallery.image.alt, url: firstGallery.image.url }
  }

  return null
}

