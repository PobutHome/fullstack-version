import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Category, Product } from '@/payload-types'
import { getRequestLocale } from '@/utilities/locale'

import { CatalogPageClient } from '@/components/catalog/CatalogPageClient'

export const metadata: Metadata = {
  title: 'Каталог',
  description: 'Каталог товарів з фільтрацією по категоріях та швидким додаванням у кошик.',
}

export const runtime = 'nodejs'

export default async function CatalogPage() {
  const payload = await getPayload({ config: configPromise })
  const locale = await getRequestLocale()

  const [categories, products] = await Promise.all([
    payload
      .find({
        collection: 'categories',
        draft: false,
        locale,
        overrideAccess: false,
        sort: 'title',
        limit: 500,
        select: {
          title: true,
          slug: true,
        },
      })
      .then((res) => res.docs as Category[]),
    payload
      .find({
        collection: 'products',
        draft: false,
        locale,
        overrideAccess: false,
        sort: 'title',
        limit: 2000,
        depth: 2,
        select: {
          title: true,
          slug: true,
          gallery: true,
          categories: true,
          priceInUAH: true,
          inventory: true,
          enableVariants: true,
          variants: true,
        },
        where: {
          _status: {
            equals: 'published',
          },
        },
      })
      .then((res) => res.docs as Product[]),
  ])

  return <CatalogPageClient categories={categories} products={products} />
}