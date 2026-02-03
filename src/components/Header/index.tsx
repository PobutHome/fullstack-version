import { HeaderClient } from './index.client'

import type { Product } from '@/payload-types'
import { getRequestLocale } from '@/utilities/locale'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type MobileMenuCategory = {
  id: string
  title: string
  slug?: string | null
  products: Array<{
    id: string
    title: string
    slug: string
  }>
}

export async function Header() {
  const payload = await getPayload({ config: configPromise })
  const locale = await getRequestLocale()

  const categoriesResult = await payload.find({
    collection: 'categories',
    locale,
    pagination: false,
    sort: 'title',
    select: {
      id: true,
      title: true,
      slug: true,
    },
  })

  const productsResult = await payload.find({
    collection: 'products',
    locale,
    pagination: false,
    sort: 'title',
    depth: 0,
    select: {
      title: true,
      slug: true,
      categories: true,
    },
  })

  const productsByCategory = new Map<string, MobileMenuCategory['products']>()

  productsResult.docs.forEach((product) => {
    if (!product || typeof product !== 'object' || !product.slug || !product.title) return

    const categoryIds = (product as Product).categories?.map((category) => {
      if (typeof category === 'object' && category?.id) return String(category.id)
      return String(category)
    })

    if (!categoryIds || categoryIds.length === 0) return

    categoryIds.forEach((categoryId) => {
      if (!categoryId) return
      const existing = productsByCategory.get(categoryId) || []
      existing.push({
        id: String(product.id),
        title: String(product.title),
        slug: String(product.slug),
      })
      productsByCategory.set(categoryId, existing)
    })
  })

  const mobileMenuCategories: MobileMenuCategory[] = categoriesResult.docs.map((category) => ({
    id: String(category.id),
    title: String(category.title),
    slug: typeof category.slug === 'string' ? category.slug : undefined,
    products: productsByCategory.get(String(category.id)) || [],
  }))

  return <HeaderClient locale={locale} mobileMenuCategories={mobileMenuCategories} />
}
