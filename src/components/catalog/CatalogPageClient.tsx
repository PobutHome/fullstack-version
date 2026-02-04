'use client'

import type { Category, Product } from '@/payload-types'
import { Container } from '@/components/Container'
import { Grid } from '@/components/Grid'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

import { CatalogProductCard } from '@/components/CatalogProductCard'

type Props = {
  categories: Category[]
  products: Product[]
}

function normalizeHashToSlug(hash: string): string | null {
  const raw = (hash || '').trim()
  if (!raw || raw === '#') return null
  const noHash = raw.startsWith('#') ? raw.slice(1) : raw
  const decoded = decodeURIComponent(noHash).trim()
  return decoded.length ? decoded : null
}

export function CatalogPageClient({ categories, products }: Props) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null)

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

  const breadcrumbLabel = activeCategory?.title || 'Каталог'

  return (
    <div className="py-space-20">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-space-20">
          <ol className="flex flex-wrap items-center gap-2 list-none m-0 p-0 text-sys-text-muted">
            <li>
              <Link href="/" className="no-underline hover:underline text-sys-text-muted">
                Головна
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-60">
              →
            </li>
            <li>
              <Link
                href="/catalog"
                className="no-underline hover:underline text-sys-text-muted"
                onClick={() => {
                  // clear hash while staying on catalog
                  if (typeof window !== 'undefined') window.location.hash = ''
                }}
              >
                Каталог
              </Link>
            </li>
            {activeCategory ? (
              <>
                <li aria-hidden="true" className="opacity-60">
                  →
                </li>
                <li className="text-sys-accent font-medium">{breadcrumbLabel}</li>
              </>
            ) : null}
          </ol>
        </nav>

        <div className="grid gap-layout-gap-2 desktop:grid-cols-[280px_1fr] items-start">
          {/* Desktop aside */}
          <aside className="hidden desktop:block sticky top-[88px]">
            <div className="rounded-radius-primary border border-sys-accent bg-sys-surface overflow-hidden">
              <div className="px-space-20 py-space-10 border-b border-sys-accent">
                <p className="m-0 font-semibold text-sys-accent">Категорії</p>
              </div>
              <nav aria-label="Категорії" className="p-space-10">
                <ul className="list-none m-0 p-0 grid gap-1">
                  <li>
                    <a
                      href="#"
                      className={[
                        'block rounded-radius-primary px-space-10 py-space-10 no-underline',
                        !activeCategorySlug
                          ? 'bg-sys-overlay text-sys-accent'
                          : 'text-sys-text hover:bg-sys-overlay',
                      ].join(' ')}
                    >
                      Всі товари
                    </a>
                  </li>
                  {categories.map((c) => {
                    const isActive = c.slug === activeCategorySlug
                    return (
                      <li key={c.id}>
                        <a
                          href={`#${encodeURIComponent(c.slug)}`}
                          className={[
                            'block rounded-radius-primary px-space-10 py-space-10 no-underline',
                            isActive
                              ? 'bg-sys-overlay text-sys-accent'
                              : 'text-sys-text hover:bg-sys-overlay',
                          ].join(' ')}
                        >
                          {c.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="min-w-0">
            <div className="flex items-start justify-between gap-layout-gap-1 flex-col tablet:flex-row tablet:items-center mb-space-20">
              <div className="min-w-0">
                <h1 className="m-0 text-sys-accent">
                  {activeCategory ? activeCategory.title : 'Каталог'}
                </h1>
                <p className="m-0 mt-1 text-sys-text-muted">
                  {activeCategory
                    ? 'Перегляньте товари у вибраній категорії та швидко додайте у кошик.'
                    : 'Оберіть категорію або переглядайте всі товари.'}
                </p>
              </div>

              {/* Mobile category selector */}
              <div className="w-full tablet:w-auto desktop:hidden">
                <label className="sr-only" htmlFor="catalog-category">
                  Категорія
                </label>
                <select
                  id="catalog-category"
                  className={[
                    'w-full tablet:w-[320px]',
                    'rounded-radius-primary border border-sys-accent bg-sys-surface',
                    'px-space-20 py-space-10',
                  ].join(' ')}
                  value={activeCategorySlug ?? ''}
                  onChange={(e) => {
                    const next = e.target.value
                    window.location.hash = next ? encodeURIComponent(next) : ''
                  }}
                >
                  <option value="">Всі товари</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-radius-primary border border-sys-accent bg-sys-surface p-space-20">
                <p className="m-0 text-sys-text-muted">Нічого не знайдено в цій категорії.</p>
              </div>
            ) : (
              <Grid className="grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 gap-layout-gap-1">
                {filteredProducts.map((product) => (
                  <CatalogProductCard key={product.id} product={product} />
                ))}
              </Grid>
            )}
          </main>
        </div>
      </Container>
    </div>
  )
}

