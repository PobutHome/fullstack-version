import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import type { CategoryItem } from './CategoryList'
import { CategoryList } from './CategoryList'

type Props = {
  title: string
  items: CategoryItem[]
  activeSlug: string | null
  onSelect: (slug: string | null) => void
}

export function CategorySidebar({ title, items, activeSlug, onSelect }: Props) {
  return (
    <aside className="hidden desktop:block">
      <div className="rounded-radius-primary bg-sys-surface shadow-shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-space-20 py-space-10">
          <h1 className="m-0 text-sys-accent pobut-H2">{title}</h1>
          <ChevronDownIcon size={14} className="text-sys-accent rotate-180" />
        </div>

        <nav aria-label="Категорії" className="min-w-0 p-space-20">
          <CategoryList items={items} activeSlug={activeSlug} onSelect={onSelect} />
        </nav>
      </div>
    </aside>
  )
}
