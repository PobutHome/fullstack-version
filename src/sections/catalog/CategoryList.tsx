import { Button } from '@/components/Button'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import clsx from 'clsx'
import { memo } from 'react'

export type CategoryItem = {
  id: string
  slug: string | null
  title: string
}

type Props = {
  items: CategoryItem[]
  activeSlug: string | null
  onSelect: (slug: string | null) => void
}

export const CategoryList = memo(function CategoryList({ items, activeSlug, onSelect }: Props) {
  return (
    <ul className="list-none m-0 p-0 grid gap-1">
      {items.map((item) => {
        const isActive = item.slug ? item.slug === activeSlug : !activeSlug
        return (
          <li key={item.id} className="min-w-0 w-full">
            <Button
              type="button"
              variant="categoryItem"
              size="sm"
              textClassName="pobut-H3"
              onClick={() => onSelect(item.slug)}
              className={clsx(
                'w-full min-w-0 min-h-[44px]',
                'flex items-center justify-between gap-3 text-left whitespace-normal',
                'rounded-radius-primary',
                'px-space-20 py-space-10',
                isActive ? 'bg-sys-chip-bg! text-color-green-click!' : 'text-sys-text',
              )}
            >
              <span
                className={clsx(
                  'min-w-0 flex-1 whitespace-normal wrap-break-word leading-snug',
                  isActive && 'font-semibold',
                )}
              >
                {item.title}
              </span>
              <ChevronDownIcon
                size={12}
                className={clsx(
                  'shrink-0',
                  isActive ? 'text-color-green-click' : 'text-sys-text-muted',
                )}
              />
            </Button>
          </li>
        )
      })}
    </ul>
  )
})
