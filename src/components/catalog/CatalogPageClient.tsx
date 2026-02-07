'use client'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { Grid } from '@/components/Grid'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { Section } from '@/components/Section'
import type { Category, Product } from '@/payload-types'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'

import { CatalogProductCard } from '@/components/CatalogProductCard'

type Props = {
  categories: Category[]
  products: Product[]
}

const PAGE_SIZE = 15

function normalizeHashToSlug(hash: string): string | null {
  const raw = (hash || '').trim()
  if (!raw || raw === '#') return null
  const noHash = raw.startsWith('#') ? raw.slice(1) : raw
  const decoded = decodeURIComponent(noHash).trim()
  return decoded.length ? decoded : null
}

function getPaginationItems(current: number, total: number): Array<number | 'dots'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const items: Array<number | 'dots'> = [1]
  const addDots = () => items.push('dots')

  if (current <= 3) {
    items.push(2, 3, 4)
    addDots()
  } else if (current >= total - 2) {
    addDots()
    items.push(total - 3, total - 2, total - 1)
  } else {
    addDots()
    items.push(current - 1, current, current + 1)
    addDots()
  }

  items.push(total)
  return items
}

export function CatalogPageClient({ categories, products }: Props) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)

  const setCategorySlug = (slug: string | null) => {
    const next = slug ? encodeURIComponent(slug) : ''
    window.location.hash = next
  }

  useEffect(() => {
    const syncFromHash = () => setActiveCategorySlug(normalizeHashToSlug(window.location.hash))
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const activeCategory = useMemo(() => {
    if (!activeCategorySlug) return null
    return categories.find((c) => c.slug === activeCategorySlug) ?? null
  }, [activeCategorySlug, categories])

  const filteredProducts = useMemo(() => {
    if (!activeCategorySlug) return products
    return products.filter((p) => {
      const cats = p.categories || []
      return cats.some((cat) => {
        if (!cat) return false
        if (typeof cat === 'string') return false
        return cat.slug === activeCategorySlug
      })
    })
  }, [activeCategorySlug, products])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategorySlug])

  const totalProducts = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [currentPage, filteredProducts])

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const fromCount = totalProducts === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const toCount = Math.min(totalProducts, currentPage * PAGE_SIZE)
  const activeCategoryTitle = activeCategory ? activeCategory.title : 'Каталог'

  return (
    <Section className="pt-space-20 pb-space-50">
      <Breadcrumbs
        className="mb-space-20"
        variant="accent"
        items={[
          { label: 'Головна', href: '/' },
          {
            label: 'Каталог',
            href: '/catalog',
            onClick: () => setCategorySlug(null),
          },
          ...(activeCategory ? [{ label: activeCategory.title }] : []),
        ]}
      />

      <Container>
        <div className="grid gap-layout-gap-2 desktop:grid-cols-[320px_minmax(0,1fr)] items-start">
          {/* Desktop aside */}
          <aside className="hidden desktop:block">
            <div className="rounded-radius-primary bg-sys-surface shadow-shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-space-20 py-space-10">
                <h1 className="m-0 ">Каталог</h1>
              </div>

              <nav aria-label="Категорії" className="min-w-0 p-space-20">
                <ul className={clsx('list-none m-0 p-0 grid gap-1')}>
                  {[
                    { id: '__all__', slug: null as string | null, title: 'Всі товари' },
                    ...categories.map((c) => ({ id: c.id, slug: c.slug, title: c.title })),
                  ].map((item) => {
                    const isActive = item.slug ? item.slug === activeCategorySlug : !activeCategorySlug
                    return (
                      <li key={item.id} className="min-w-0">
                        <button
                          type="button"
                          onClick={() => setCategorySlug(item.slug)}
                          className={clsx(
                            'w-full min-w-0',
                            'flex items-center justify-between gap-3 text-left',
                            'rounded-radius-primary',
                            'px-space-20 py-space-10',
                            'pobut-H3',
                            'transition-colors',
                            isActive
                              ? 'bg-sys-chip-bg text-color-green-click'
                              : 'text-sys-text hover:bg-sys-surface-2',
                          )}
                        >
                          <span
                            className={clsx(
                              'min-w-0 whitespace-normal wrap-break-word leading-snug',
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
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0">
            <div className="flex items-start justify-between gap-layout-gap-1 flex-col tablet:flex-row tablet:items-end mb-space-20">
            {/* Mobile/Laptop category accordion */}
            <div className="w-full desktop:hidden">
              <div className="rounded-radius-primary border border-sys-border bg-sys-surface shadow-shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between gap-3 bg-sys-accent px-space-20 py-space-10"
                  aria-expanded={isCategoryMenuOpen}
                >
                  <span className="pobut-H3 text-sys-text-on-accent">
                    {activeCategoryTitle}
                  </span>
                  <ChevronDownIcon
                    size={14}
                    className={clsx(
                      'text-sys-text-on-accent transition-transform',
                      isCategoryMenuOpen ? 'rotate-180' : 'rotate-0',
                    )}
                  />
                </button>

                {isCategoryMenuOpen && (
                  <nav aria-label="Категорії" className="p-space-20">
                    <ul className="list-none m-0 p-0 grid gap-1">
                      {[
                        { id: '__all__', slug: null as string | null, title: 'Всі товари' },
                        ...categories.map((c) => ({ id: c.id, slug: c.slug, title: c.title })),
                      ].map((item) => {
                        const isActive = item.slug
                          ? item.slug === activeCategorySlug
                          : !activeCategorySlug
                        return (
                          <li key={item.id} className="min-w-0">
                            <button
                              type="button"
                              onClick={() => {
                                setCategorySlug(item.slug)
                                setIsCategoryMenuOpen(false)
                              }}
                              className={clsx(
                                'w-full min-w-0',
                                'flex items-center justify-between gap-3 text-left',
                                'rounded-radius-primary',
                                'px-space-20 py-space-10',
                                'pobut-H3',
                                'transition-colors',
                                isActive
                                  ? 'bg-sys-chip-bg text-color-green-click'
                                  : 'text-sys-text hover:bg-sys-surface-2',
                              )}
                            >
                              <span
                                className={clsx(
                                  'min-w-0 whitespace-normal wrap-break-word leading-snug',
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
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                )}
              </div>
            </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-radius-primary border border-sys-accent bg-sys-surface p-space-20">
                <p className="m-0 text-sys-text-muted">Нічого не знайдено в цій категорії.</p>
              </div>
            ) : (
              <>
                <Grid className="auto-rows-fr grid-cols-2 wide:grid-cols-3 gap-layout-gap-1">
                  {pagedProducts.map((product) => (
                    <CatalogProductCard key={product.id} product={product} />
                  ))}
                </Grid>

                {totalPages > 1 && (
                  <nav aria-label="Пагінація" className="mt-space-20">
                    <div className="flex flex-col items-center gap-space-10">
                      <p className="m-0 pobut-caption text-sys-text-muted">
                        Показано {fromCount}-{toCount} з {totalProducts}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-space-10">
                        <button
                          type="button"
                          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className={clsx(
                            'h-10 px-5 rounded-radius-full',
                            'border border-sys-border bg-sys-surface text-sys-text',
                            'transition-colors',
                            'hover:bg-sys-surface-2',
                            'disabled:opacity-50 disabled:pointer-events-none',
                          )}
                        >
                          Назад
                        </button>

                        {paginationItems.map((item, index) =>
                          item === 'dots' ? (
                            <span
                              key={`dots-${index}`}
                              className="px-2 text-sys-text-muted pobut-caption"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={item}
                              type="button"
                              onClick={() => setCurrentPage(item)}
                              aria-current={item === currentPage ? 'page' : undefined}
                              className={clsx(
                                'h-10 min-w-[40px] px-4 rounded-radius-full',
                                'border transition-colors',
                                item === currentPage
                                  ? 'bg-sys-accent text-sys-text-on-accent border-sys-accent'
                                  : 'bg-sys-surface text-sys-text border-sys-border hover:bg-sys-surface-2',
                              )}
                            >
                              {item}
                            </button>
                          ),
                        )}

                        <button
                          type="button"
                          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className={clsx(
                            'h-10 px-5 rounded-radius-full',
                            'border border-sys-border bg-sys-surface text-sys-text',
                            'transition-colors',
                            'hover:bg-sys-surface-2',
                            'disabled:opacity-50 disabled:pointer-events-none',
                          )}
                        >
                          Далі
                        </button>
                      </div>
                    </div>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </Container>
    </Section>
  )
}

