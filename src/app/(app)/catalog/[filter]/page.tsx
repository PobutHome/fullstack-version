import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{
    filter: string
  }>
}

export default async function CatalogFilterPage({ params }: Props) {
  const { filter } = await params

  // Required URL shape from home cards: /catalog/category=<id>
  if (filter?.startsWith('category=')) {
    const categoryId = filter.slice('category='.length)
    if (categoryId) {
      redirect(`/shop?category=${encodeURIComponent(categoryId)}`)
    }
  }

  redirect('/shop')
}

