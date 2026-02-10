import { Breadcrumbs } from '@/components/Breadcrumbs'

type Item = {
  label: string
  href?: string
  onClick?: () => void
}

type Props = {
  items: Item[]
}

export function CatalogBreadcrumbs({ items }: Props) {
  return <Breadcrumbs className="mb-space-20" variant="accent" items={items} />
}
