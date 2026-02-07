import { Button } from '@/components/Button'
import clsx from 'clsx'

type Props = {
  currentPage: number
  totalPages: number
  totalProducts: number
  fromCount: number
  toCount: number
  paginationItems: Array<number | 'dots'>
  onPrev: () => void
  onNext: () => void
  onSelect: (page: number) => void
}

export function CatalogPagination({
  currentPage,
  totalPages,
  totalProducts,
  fromCount,
  toCount,
  paginationItems,
  onPrev,
  onNext,
  onSelect,
}: Props) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Пагінація" className="mt-space-20">
      <div className="flex flex-col items-center gap-space-10">
        <p className="m-0 pobut-caption text-sys-text-muted">
          Показано {fromCount}-{toCount} з {totalProducts}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-space-10">
          <Button
            type="button"
            variant="pagination"
            size="sm"
            onClick={onPrev}
            disabled={currentPage === 1}
            className="h-10 px-5 rounded-radius-full"
          >
            Назад
          </Button>

          {paginationItems.map((item, index) =>
            item === 'dots' ? (
              <span key={`dots-${index}`} className="px-2 text-sys-text-muted pobut-caption">
                …
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                variant={item === currentPage ? 'paginationActive' : 'pagination'}
                size="sm"
                onClick={() => onSelect(item)}
                aria-current={item === currentPage ? 'page' : undefined}
                className={clsx('h-10 min-w-[40px] px-4 rounded-radius-full')}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            type="button"
            variant="pagination"
            size="sm"
            onClick={onNext}
            disabled={currentPage === totalPages}
            className="h-10 px-5 rounded-radius-full"
          >
            Далі
          </Button>
        </div>
      </div>
    </nav>
  )
}
