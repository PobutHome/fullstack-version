'use client'

import { CatalogProductCard } from '@/components/CatalogProductCard'
import { Container } from '@/components/Container'
import { Grid } from '@/components/Grid'
import { Section } from '@/components/Section'
import type { Category, Product } from '@/payload-types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CategoryAccordion } from './CategoryAccordion'
import type { CategoryItem } from './CategoryList'
import { CategorySidebar } from './CategorySidebar'
import { CatalogPagination } from './CatalogPagination'

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

            {filteredProducts.length === 0 ? (
              <div className="rounded-radius-primary border border-sys-accent bg-sys-surface p-space-20">
                <p className="m-0 text-sys-text-muted">Нічого не знайдено в цій категорії.</p>
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
