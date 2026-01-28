import type { Metadata } from 'next'

import { getRequestLocale } from '@/utilities/locale'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { HomePage } from './HomePage'

export default async function RootPage() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()
  const locale = await getRequestLocale()

  // Load all categories for the home page (server-side)
  const categoriesResult = await payload.find({
    collection: 'categories',
    draft: false,
    locale,
    pagination: false,
    sort: 'title',
  })

  return <HomePage categories={categoriesResult.docs} />
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Магазин',
  }
}
