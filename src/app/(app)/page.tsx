import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { HomePage } from './HomePage'
import { extractCategoryImageFromProduct, type HomeCatalogCategory } from '@/sections/home/HomeCatalog'
import type { Category, Product } from '@/payload-types'

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

  return <HomePage categories={categories} />
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Магазин',
  }
}
