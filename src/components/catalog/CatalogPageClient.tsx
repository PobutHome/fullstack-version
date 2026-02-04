'use client'

import type { Category, Product } from '@/payload-types'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Container } from '@/components/Container'
import { Grid } from '@/components/Grid'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { Section } from '@/components/Section'
import clsx from 'clsx'
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

  return (
    <Section className="pt-space-20 pb-space-20">
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
          <aside className="hidden desktop:block sticky top-[88px]">
            <div
              className={clsx(
                'rounded-radius-primary border border-sys-border bg-sys-surface shadow-shadow-sm',
                'p-space-20',
              )}
            >
              <h2 className="pobut-H2 m-0 mb-space-20 text-sys-text">Каталог</h2>

              <nav aria-label="Категорії" className="min-w-0">
                <ul
                  className={clsx(
                    'list-none m-0 p-0 grid',
                    'max-h-[calc(100vh-180px)] overflow-auto pr-2',
                  )}
                >
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
                            'flex items-start justify-between gap-3 text-left',
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
                              'shrink-0 mt-[0.15em]',
                              isActive ? 'text-color-green-click' : 'text-sys-text',
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
                    setCategorySlug(e.target.value || null)
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
              <Grid className="auto-rows-fr grid-cols-2 wide:grid-cols-3 gap-layout-gap-1">
                {filteredProducts.map((product) => (
                  <CatalogProductCard key={product.id} product={product} />
                ))}
              </Grid>
            )}
          </main>
        </div>
      </Container>
    </Section>
  )
}

