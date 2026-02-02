'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { cn } from '@/utilities/cn'

type Props = {
  href: string
  children: ReactNode
  className?: string
  /** Defaults to strict `pathname === href` */
  isActive?: (pathname: string) => boolean
}

export function PillNavLink({ href, children, className, isActive }: Props) {
  const pathname = usePathname()
  const active = isActive ? isActive(pathname) : pathname === href

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap',
        'rounded-radius-full border px-6 py-3',
        'text-sm font-semibold transition-colors',
        active
          ? 'bg-sys-surface-accent text-sys-text-on-accent border-sys-border-strong'
          : 'bg-sys-surface text-sys-text border-sys-border-strong hover:bg-sys-surface-2',
        className,
      )}
    >
      {children}
    </Link>
  )
}

