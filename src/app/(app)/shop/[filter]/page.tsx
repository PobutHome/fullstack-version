import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{
    filter: string
  }>
}

export default async function ShopFilterPage({ params }: Props) {
  const { filter } = await params

  // Support path-based filter URLs (requested): /shop/category=<id>
  if (filter?.startsWith('category=')) {
    const categoryId = filter.slice('category='.length)
    if (categoryId) {
      redirect(`/shop?category=${encodeURIComponent(categoryId)}`)
    }
  }

  redirect('/shop')
}

