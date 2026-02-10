'use client'

import type { ReactNode } from 'react'

import Link from 'next/link'

import { Container } from '@/components/Container'

export type BreadcrumbItem = {
  label: ReactNode
  href?: string
  onClick?: () => void
}

type Props = {
  items: BreadcrumbItem[]
  className?: string
  variant?: 'plain' | 'accent'
}

/**
 * Universal breadcrumb (matches AuthShell styling).
 */
export function Breadcrumbs({ items, className = '', variant = 'plain' }: Props) {
  if (!items?.length) return null

  const isAccent = variant === 'accent'

  const content = (
    <span>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1

          return (
            <span key={idx}>
              {item.href && !isLast ? (
                <Link
                  className={isAccent ? 'text-sys-text-inverse hover:underline' : 'hover:underline'}
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault()
                      item.onClick()
                    }
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast && !isAccent ? 'text-sys-text' : undefined}>
                  {item.label}
                </span>
              )}

              {!isLast ? (
                <span className={isAccent ? 'opacity-80' : 'opacity-60'}>{' '}→{' '}</span>
              ) : null}
            </span>
          )
        })}
      </span>
  )

  return (
    <nav
      aria-label="Breadcrumb"
      className={[
        isAccent ? 'w-full bg-sys-accent text-sys-text-inverse py-space-10' : 'text-sys-text-muted text-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')
        .trim()}
    >
      {isAccent ? (
        <Container>
          <div className="text-sm">{content}</div>
        </Container>
      ) : (
        content
      )}
    </nav>
  )
}

