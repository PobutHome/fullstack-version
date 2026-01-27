import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Каталог',
}

export default function CatalogIndexPage() {
  // The storefront currently lives at /shop. Keep /catalog as a friendly alias.
  redirect('/shop')
}

