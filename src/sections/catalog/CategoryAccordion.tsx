import { Button } from '@/components/Button'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import clsx from 'clsx'
import type { CategoryItem } from './CategoryList'
import { CategoryList } from './CategoryList'

type Props = {
  title: string
  items: CategoryItem[]
  activeSlug: string | null
  isOpen: boolean
  onToggle: () => void
  onSelect: (slug: string | null) => void
}

export function CategoryAccordion({ title, items, activeSlug, isOpen, onToggle, onSelect }: Props) {
  return (
    <div className="w-full desktop:hidden">
      <div className="rounded-radius-primary border border-sys-border bg-sys-surface shadow-shadow-sm overflow-hidden">
        <Button
          type="button"
          variant="accordionToggle"
          size="md"
          textClassName="pobut-H3"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-3 px-space-20 py-space-10 rounded-none"
        >
          <span className="pobut-H3 text-sys-text-on-accent">{title}</span>
          <ChevronDownIcon
            size={14}
            className={clsx(
              'text-sys-text-on-accent transition-transform',
              isOpen ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>

        {isOpen && (
          <nav aria-label="Категорії" className="p-space-20">
            <CategoryList
              items={items}
              activeSlug={activeSlug}
              onSelect={(slug) => onSelect(slug)}
            />
          </nav>
        )}
      </div>
    </div>
  )
}
