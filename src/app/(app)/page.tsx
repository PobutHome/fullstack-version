import type { Metadata } from 'next'

import type { Category, Product } from '@/payload-types'
import type { FeaturedProduct } from '@/sections/home/FeaturedProducts'
import type { HomeBannerSlide } from '@/sections/home/HomeBanner'
import { extractCategoryImageFromProduct, type HomeCatalogCategory } from '@/sections/home/HomeCatalog'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { HomePage } from './HomePage'

export default async function RootPage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()

  // Load all categories for the home page (server-side)
  const categoriesResult = await payload.find({
    collection: 'categories',
    draft,
    overrideAccess: draft,
    pagination: false,
    sort: 'title',
  })

  const categoryIds = categoriesResult.docs.map((c) => c.id).filter(Boolean)

  // Categories don't have an image field. We derive a representative image from
  // products within each category (meta image first, then gallery). If none are found,
  // the UI falls back to a default placeholder.
  const imageByCategoryId = new Map<string, { url: string; alt: string }>()

  if (categoryIds.length) {
    const productsResult = await payload.find({
      collection: 'products',
      depth: 2,
      draft,
      overrideAccess: draft,
      limit: 200,
      pagination: false,
      select: {
        categories: true,
        meta: true,
        gallery: true,
      },
      where: {
        and: [
          ...(draft ? [] : [{ _status: { equals: 'published' } }]),
          {
            or: categoryIds.map((id) => ({
              categories: {
                contains: id,
              },
            })),
          },
        ],
      },
    })

    type ProductForCategoryImage = Pick<Product, 'categories' | 'meta' | 'gallery'>

    for (const product of productsResult.docs as ProductForCategoryImage[]) {
      const image = extractCategoryImageFromProduct(product)
      if (!image) continue

      const productCategories = product.categories || []
      for (const category of productCategories as (string | Category)[]) {
        const id = typeof category === 'string' ? category : category.id
        if (!id || imageByCategoryId.has(id)) continue
        imageByCategoryId.set(id, image)
      }
    }
  }

  const categories: HomeCatalogCategory[] = categoriesResult.docs.map((category) => {
    const img = imageByCategoryId.get(category.id)
    return {
      id: category.id,
      title: category.title,
      imageUrl: img?.url,
      imageAlt: img?.alt || category.title,
    }
  })

  type HomeBannerDoc = {
    id: string
    title?: unknown
    image?: string | { url?: string; alt?: string } | null
    link?: { url?: string | null; openInNewTab?: boolean | null } | null
  }

  const bannersResult = await payload.find({
    collection: 'home-banners',
    depth: 2,
    draft,
    overrideAccess: draft,
    pagination: false,
    sort: 'sortOrder',
    ...(draft
      ? {}
      : {
          where: {
            isActive: {
              equals: true,
            },
          },
        }),
  })

  const banners: HomeBannerSlide[] = (bannersResult.docs as HomeBannerDoc[])
    .map((doc) => {
      const image = typeof doc.image === 'string' ? null : doc.image
      const imageUrl = image?.url
      if (!imageUrl) return null

      const title = typeof doc.title === 'string' ? doc.title : undefined
      const imageAlt = image?.alt || title || 'Banner'

      const href = doc.link?.url || undefined
      const openInNewTab = doc.link?.openInNewTab || undefined

      return {
        id: doc.id,
        imageUrl,
        imageAlt,
        href,
        openInNewTab,
      }
    })
    .filter(Boolean) as HomeBannerSlide[]

  const featuredResult = await payload.find({
    collection: 'products',
    depth: 3,
    draft,
    overrideAccess: draft,
    limit: 12,
    pagination: false,
    sort: '-updatedAt',
    where: {
      and: [
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
        {
          isFeatured: {
            equals: true,
          },
        },
      ],
    },
    populate: {
      variants: {
        priceInUAH: true,
        inventory: true,
        options: true,
      },
    },
    select: {
      title: true,
      slug: true,
      gallery: true,
      meta: true,
      featuredCardImage: true,
      inventory: true,
      enableVariants: true,
      priceInUAH: true,
      variants: true,
    },
  })

  const featuredProducts: FeaturedProduct[] = (featuredResult.docs as Partial<Product>[])
    .map((product) => {
      const id = product.id
      if (!id) return null

      const variants = product.variants?.docs

      const priceFromVariants = variants?.reduce<number | undefined>((acc, variant) => {
        if (typeof variant !== 'object') return acc
        if (typeof variant.priceInUAH !== 'number') return acc
        return typeof acc === 'number' ? Math.max(acc, variant.priceInUAH) : variant.priceInUAH
      }, undefined)

      const retailPrice =
        typeof priceFromVariants === 'number'
          ? priceFromVariants
          : typeof product.priceInUAH === 'number'
            ? product.priceInUAH
            : 0

      const isAvailable = Boolean(
        product.enableVariants
          ? variants?.some((variant) => {
              if (typeof variant !== 'object') return false
              return typeof variant.inventory === 'number' && variant.inventory > 0
            })
          : typeof product.inventory === 'number' && product.inventory > 0,
      )

      const firstVariantOptions =
        product.enableVariants && variants?.length && typeof variants[0] === 'object'
          ? variants[0].options
          : null

      const specifications =
        firstVariantOptions && Array.isArray(firstVariantOptions)
          ? firstVariantOptions
              .map((opt) => (typeof opt === 'object' ? opt.label : null))
              .filter(Boolean)
              .join(', ')
          : ''

      const featuredCardImage =
        typeof product.featuredCardImage === 'object' ? product.featuredCardImage : undefined

      const firstGalleryImage =
        typeof product.gallery?.[0]?.image === 'object' ? product.gallery?.[0]?.image : undefined
      const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
      const image = featuredCardImage || firstGalleryImage || metaImage

      const title = typeof product.title === 'string' ? product.title : 'Product'

      return {
        id,
        imageUrl: image?.url || undefined,
        imageAlt: image?.alt || title,
        isAvailable,
        productName: title,
        specifications,
        retailPrice,
        // NOTE: wholesale fields are not modeled in CMS yet.
        // We keep the UI consistent for now.
        wholesalePrice: retailPrice,
        wholesaleMinQuantity: 1,
      }
    })
    .filter(Boolean) as FeaturedProduct[]

  return (
    <HomePage categories={categories} banners={banners} featuredProducts={featuredProducts} />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Магазин',
  }
}
