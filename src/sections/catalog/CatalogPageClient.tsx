'use client'

import { CatalogProductCard } from '@/components/CatalogProductCard'
import { Container } from '@/components/Container'
import { Grid } from '@/components/Grid'
import { Section } from '@/components/Section'
import type { Category, Product } from '@/payload-types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CategoryAccordion } from './CategoryAccordion'
import type { CategoryItem } from './CategoryList'
import { CategorySidebar } from './CategorySidebar'
import { CatalogPagination } from './CatalogPagination'

type Props = {
  categories: Category[]
  products: Product[]
}

const PAGE_SIZE = 15

type PriceFilterValues = {
  retailMin: string
  retailMax: string
  wholesaleMin: string
  wholesaleMax: string
  inStockOnly: boolean
}

type FilterPanel = 'retail' | 'wholesale' | 'stock' | null

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
  const [openFilter, setOpenFilter] = useState<FilterPanel>(null)
  const [priceFilters, setPriceFilters] = useState<PriceFilterValues>({
    retailMin: '',
    retailMax: '',
    wholesaleMin: '',
    wholesaleMax: '',
    inStockOnly: false,
  })
  const filterRef = useRef<HTMLDivElement>(null)

  const categoryItems = useMemo<CategoryItem[]>(
    () => [
      { id: '__all__', slug: null, title: 'Всі товари' },
      ...categories.map((c) => ({ id: c.id, slug: c.slug, title: c.title })),
    ],
    [categories],
  )

  const setCategorySlug = useCallback((slug: string | null) => {
    const next = slug ? encodeURIComponent(slug) : ''
    window.location.hash = next
  }, [])

  const handleCategorySelect = useCallback(
    (slug: string | null) => {
      setCategorySlug(slug)
      setIsCategoryMenuOpen(false)
    },
    [setCategorySlug],
  )

  const handleToggleMenu = useCallback(() => {
    setIsCategoryMenuOpen((prev) => !prev)
  }, [])

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

  const pricedProducts = useMemo(() => {
    return products.map((product) => {
      const docs = product.variants?.docs || []
      const variants = docs.filter((v): v is Exclude<typeof v, string> => typeof v === 'object')
      const defaultVariant = product.enableVariants
        ? variants.find((v) => (v.inventory || 0) > 0) || variants[0]
        : null
      const retailPrice =
        product.enableVariants && defaultVariant && typeof defaultVariant.priceInUAH === 'number'
          ? defaultVariant.priceInUAH
          : typeof product.priceInUAH === 'number'
            ? product.priceInUAH
            : null
      const wholesalePrice = typeof retailPrice === 'number' ? retailPrice : null
      const inStock = product.enableVariants
        ? (defaultVariant?.inventory || 0) > 0
        : (product.inventory || 0) > 0

      return { product, retailPrice, wholesalePrice, inStock }
    })
  }, [products])

  const filteredProducts = useMemo(() => {
    const retailMin = priceFilters.retailMin ? Number(priceFilters.retailMin) : null
    const retailMax = priceFilters.retailMax ? Number(priceFilters.retailMax) : null
    const wholesaleMin = priceFilters.wholesaleMin ? Number(priceFilters.wholesaleMin) : null
    const wholesaleMax = priceFilters.wholesaleMax ? Number(priceFilters.wholesaleMax) : null

    const hasRetailMin = typeof retailMin === 'number' && !Number.isNaN(retailMin)
    const hasRetailMax = typeof retailMax === 'number' && !Number.isNaN(retailMax)
    const hasWholesaleMin = typeof wholesaleMin === 'number' && !Number.isNaN(wholesaleMin)
    const hasWholesaleMax = typeof wholesaleMax === 'number' && !Number.isNaN(wholesaleMax)

    return pricedProducts.filter(({ product, retailPrice, wholesalePrice, inStock }) => {
      if (activeCategorySlug) {
        const cats = product.categories || []
        const matchesCategory = cats.some((cat) => {
          if (!cat) return false
          if (typeof cat === 'string') return false
          return cat.slug === activeCategorySlug
        })
        if (!matchesCategory) return false
      }

      if (priceFilters.inStockOnly && !inStock) return false

      if (hasRetailMin && (typeof retailPrice !== 'number' || retailPrice < retailMin)) return false
      if (hasRetailMax && (typeof retailPrice !== 'number' || retailPrice > retailMax)) return false
      if (hasWholesaleMin && (typeof wholesalePrice !== 'number' || wholesalePrice < wholesaleMin)) return false
      if (hasWholesaleMax && (typeof wholesalePrice !== 'number' || wholesalePrice > wholesaleMax)) return false

      return true
    })
  }, [activeCategorySlug, priceFilters, pricedProducts])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategorySlug, priceFilters])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setOpenFilter(null)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const totalProducts = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, totalPages])

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE).map((item) => item.product)
  }, [currentPage, filteredProducts])

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  const fromCount = totalProducts === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const toCount = Math.min(totalProducts, currentPage * PAGE_SIZE)
  const activeCategoryTitle = activeCategory ? activeCategory.title : 'Каталог'

  return (
    <Section className="pb-space-50">
      <Container>
        <div className="mt-space-20 grid gap-layout-gap-2 desktop:grid-cols-[320px_minmax(0,1fr)] items-start">
          <CategorySidebar
            title="Каталог"
            items={categoryItems}
            activeSlug={activeCategorySlug}
            onSelect={setCategorySlug}
          />

          <main className="min-w-0">
            <div className="flex items-start justify-between gap-layout-gap-1 flex-col tablet:flex-row tablet:items-end mb-space-20">
              <CategoryAccordion
                title={activeCategoryTitle}
                items={categoryItems}
                activeSlug={activeCategorySlug}
                isOpen={isCategoryMenuOpen}
                onToggle={handleToggleMenu}
                onSelect={handleCategorySelect}
              />
            </div>

            <div className="mb-space-20 grid gap-space-10">
              <h2 className="m-0 pobut-H3 text-sys-text">Фільтри</h2>
              <div className="relative" ref={filterRef}>
                <div className="flex flex-wrap items-center gap-space-10">
                <button
                  type="button"
                  className={[
                    'rounded-radius-full border border-sys-accent px-5 py-2 text-sm',
                    'text-sys-accent hover:bg-sys-surface-2',
                    openFilter === 'retail' ? 'bg-sys-surface-2' : 'bg-sys-surface',
                  ].join(' ')}
                  onClick={() =>
                    setOpenFilter((prev) => (prev === 'retail' ? null : 'retail'))
                  }
                >
                  Роздрібна ціна
                </button>
                <button
                  type="button"
                  className={[
                    'rounded-radius-full border border-sys-accent px-5 py-2 text-sm',
                    'text-sys-accent hover:bg-sys-surface-2',
                    openFilter === 'wholesale' ? 'bg-sys-surface-2' : 'bg-sys-surface',
                  ].join(' ')}
                  onClick={() =>
                    setOpenFilter((prev) => (prev === 'wholesale' ? null : 'wholesale'))
                  }
                >
                  Оптова ціна
                </button>
                <button
                  type="button"
                  className={[
                    'rounded-radius-full border border-sys-accent px-5 py-2 text-sm',
                    'text-sys-accent hover:bg-sys-surface-2',
                    openFilter === 'stock' ? 'bg-sys-surface-2' : 'bg-sys-surface',
                  ].join(' ')}
                  onClick={() => setOpenFilter((prev) => (prev === 'stock' ? null : 'stock'))}
                >
                  Наявність
                </button>
                <button
                  type="button"
                  className="rounded-radius-full border border-sys-accent px-5 py-2 text-sm text-sys-accent hover:bg-sys-surface-2"
                  onClick={() =>
                    setPriceFilters({
                      retailMin: '',
                      retailMax: '',
                      wholesaleMin: '',
                      wholesaleMax: '',
                      inStockOnly: false,
                    })
                  }
                >
                  Скинути фільтри
                </button>
              </div>

                {openFilter && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-space-10">
                    {openFilter === 'retail' && (
                      <div className="rounded-radius-primary border border-sys-accent bg-sys-surface p-space-20 grid gap-space-10 shadow-shadow-sm">
                        <p className="m-0 font-semibold text-sys-text">Роздрібна ціна</p>
                        <div className="grid gap-space-10 sm:grid-cols-2">
                          <label className="grid gap-1 text-sm text-sys-text">
                            Від (грн)
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              value={priceFilters.retailMin}
                              onChange={(e) =>
                                setPriceFilters((prev) => ({
                                  ...prev,
                                  retailMin: e.target.value,
                                }))
                              }
                              className="h-10 rounded-radius-full border border-sys-border px-4"
                            />
                          </label>
                          <label className="grid gap-1 text-sm text-sys-text">
                            До (грн)
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              value={priceFilters.retailMax}
                              onChange={(e) =>
                                setPriceFilters((prev) => ({
                                  ...prev,
                                  retailMax: e.target.value,
                                }))
                              }
                              className="h-10 rounded-radius-full border border-sys-border px-4"
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {openFilter === 'wholesale' && (
                      <div className="rounded-radius-primary border border-sys-accent bg-sys-surface p-space-20 grid gap-space-10 shadow-shadow-sm">
                        <p className="m-0 font-semibold text-sys-text">Оптова ціна</p>
                        <div className="grid gap-space-10 sm:grid-cols-2">
                          <label className="grid gap-1 text-sm text-sys-text">
                            Від (грн)
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              value={priceFilters.wholesaleMin}
                              onChange={(e) =>
                                setPriceFilters((prev) => ({
                                  ...prev,
                                  wholesaleMin: e.target.value,
                                }))
                              }
                              className="h-10 rounded-radius-full border border-sys-border px-4"
                            />
                          </label>
                          <label className="grid gap-1 text-sm text-sys-text">
                            До (грн)
                            <input
                              type="number"
                              min="0"
                              inputMode="numeric"
                              value={priceFilters.wholesaleMax}
                              onChange={(e) =>
                                setPriceFilters((prev) => ({
                                  ...prev,
                                  wholesaleMax: e.target.value,
                                }))
                              }
                              className="h-10 rounded-radius-full border border-sys-border px-4"
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {openFilter === 'stock' && (
                      <div className="rounded-radius-primary border border-sys-accent bg-sys-surface p-space-20 shadow-shadow-sm">
                        <label className="flex items-center gap-3 text-sm text-sys-text">
                          <input
                            type="checkbox"
                            checked={priceFilters.inStockOnly}
                            onChange={(e) =>
                              setPriceFilters((prev) => ({
                                ...prev,
                                inStockOnly: e.target.checked,
                              }))
                            }
                          />
                          В наявності
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-radius-primary border border-sys-accent bg-sys-surface p-space-20">
                <p className="m-0 text-sys-text-muted">
                  Нічого не знайдено за вибраними фільтрами.
                </p>
              </div>
            ) : (
              <>
                <Grid className="auto-rows-fr grid-cols-2 tablet:grid-cols-2 wide:grid-cols-3 gap-layout-gap-1">
                  {pagedProducts.map((product) => (
                    <CatalogProductCard key={product.id} product={product} />
                  ))}
                </Grid>

                <CatalogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalProducts={totalProducts}
                  fromCount={fromCount}
                  toCount={toCount}
                  paginationItems={paginationItems}
                  onPrev={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  onNext={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  onSelect={(page) => setCurrentPage(page)}
                />
              </>
            )}
          </main>
        </div>
      </Container>
    </Section>
  )
}
