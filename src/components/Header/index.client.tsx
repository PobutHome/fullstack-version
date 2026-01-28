'use client'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { Search } from '@/components/Search'
import Link from 'next/link'
import { Suspense } from 'react'
import { MobileMenu } from './MobileMenu'

import { CatalogIcon } from '@/components/icons/CatalogIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { LogoIcon } from '@/components/icons/logo'
import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { UserRoundIcon } from '@/components/icons/UserRoundIcon'
import { cn } from '@/utilities/cn'

export function HeaderClient() {
  return (
    <div className="relative z-20 border-b">
      <nav className="container grid grid-cols-[auto_1fr_auto] items-center gap-3 py-2">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Suspense fallback={null}>
              <MobileMenu />
            </Suspense>
          </div>

          <Link className="hidden md:flex items-center" href="/">
            <LogoIcon className="h-10 w-auto" />
          </Link>

          <Link
            href="/catalog"
            className={cn(
              'hidden md:inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm',
              'border-primary/30 text-primary hover:border-primary/60',
            )}
          >
            <CatalogIcon className="size-5 text-sys-accent" />
            <span>Каталог</span>
          </Link>
        </div>

        <div className="col-start-2 justify-self-center w-full">
          <Link className="md:hidden flex items-center justify-center py-3" href="/">
            <LogoIcon className="h-10 w-auto" />
          </Link>
          <div className="hidden md:block w-full max-w-3xl mx-auto">
            <Search />
          </div>
        </div>

        <div className="col-start-3 justify-self-end flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 text-primary/70">
            <Link
              aria-label="Профіль"
              className="inline-flex items-center justify-center size-9 rounded-md hover:text-primary"
              href="/account"
            >
              <UserRoundIcon className="size-5" />
            </Link>
            <a
              aria-label="Подзвонити"
              className="inline-flex items-center justify-center size-9 rounded-md hover:text-primary"
              href="tel:+380987307280"
            >
              <PhoneIcon className="size-5" />
            </a>

            <Suspense fallback={<OpenCartButton className="text-primary/70 hover:text-primary" />}>
              <Cart />
            </Suspense>

            <button
              className={cn(
                'inline-flex items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-mono tracking-widest text-primary-foreground',
              )}
              type="button"
            >
              УКР
              <ChevronDownIcon className="size-4" />
            </button>
          </div>

          <div className="md:hidden">
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </div>
  )
}
