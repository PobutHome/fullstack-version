'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs'

const LABELS: Record<string, string> = {
  account: 'Профіль',
  cart: 'Кошик',
  catalog: 'Каталог',
  checkout: 'Оформлення',
  'create-account': 'Реєстрація',
  login: 'Вхід',
  products: 'Товар',
  'recover-password': 'Відновлення пароля',
}

function titleizeSegment(segment: string): string {
  const clean = segment.replace(/[-_]+/g, ' ').trim()
  return clean ? clean[0].toUpperCase() + clean.slice(1) : clean
}

export function AppBreadcrumbs() {
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash || '')
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const items = useMemo<BreadcrumbItem[]>(() => {
    if (!pathname || pathname === '/') return []

    const segments = pathname.split('/').filter(Boolean)
    const crumbs: BreadcrumbItem[] = [{ label: 'Головна', href: '/' }]

    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1
      const label = LABELS[segment] || titleizeSegment(segment)
      const href = `/${segments.slice(0, index + 1).join('/')}`

      if (segment === 'catalog') {
        crumbs.push({
          label,
          href,
          onClick: () => {
            if (typeof window !== 'undefined') window.location.hash = ''
          },
        })
        return
      }

      if (segment === 'products') {
        crumbs.push({ label, href })
        return
      }

      crumbs.push(isLast ? { label } : { label, href })
    })

    if (segments[0] === 'catalog' && hash) {
      const decoded = decodeURIComponent(hash.replace('#', '')).trim()
      if (decoded) crumbs.push({ label: titleizeSegment(decoded) })
    }

    return crumbs
  }, [hash, pathname])

  if (!items.length) return null

  return <Breadcrumbs className="mb-space-20" items={items} variant="accent" />
}
