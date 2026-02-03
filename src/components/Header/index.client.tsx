'use client'
import { Button } from '@/components/Button'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { Container } from '@/components/Container'
import { Search } from '@/components/Search'
import type { AppLocale } from '@/utilities/locale'
import Link from 'next/link'
import { Suspense } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

import { CatalogIcon } from '@/components/icons/CatalogIcon'
import { LogoIcon } from '@/components/icons/logo'
import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { UserRoundIcon } from '@/components/icons/UserRoundIcon'

type Props = {
  locale: AppLocale
  mobileMenuCategories: Array<{
    id: string
    title: string
    slug?: string | null
    products: Array<{
      id: string
      title: string
      slug: string
    }>
  }>
}

const headerCopy: Record<
  AppLocale,
  {
    catalog: string
    profileAria: string
    callAria: string
  }
> = {
  ua: {
    catalog: 'Каталог',
    profileAria: 'Профіль',
    callAria: 'Подзвонити',
  },
  ru: {
    catalog: 'Каталог',
    profileAria: 'Профиль',
    callAria: 'Позвонить',
  },
}

export function HeaderClient({ locale, mobileMenuCategories }: Props) {
  const t = headerCopy[locale]

  return (
    <div className="relative z-20">
      <Container>
        <div className="md:hidden">
          <nav className="flex items-center gap-2 py-layout-gap-2">
            <Suspense fallback={null}>
              <MobileMenu locale={locale} categories={mobileMenuCategories} />
            </Suspense>

            <Link className="flex items-center" href="/">
              <LogoIcon className="h-10 w-auto" />
            </Link>

            <div className="flex-1 min-w-0">
              <Search className="min-w-0" locale={locale} />
            </div>

            <Suspense fallback={<OpenCartButton locale={locale} />}>
              <Cart locale={locale} />
            </Suspense>
          </nav>
        </div>

        <nav className="hidden md:grid grid-cols-[auto_1fr_auto] items-center gap-layout-gap-1 py-layout-gap-2">
          <div className="flex items-center gap-layout-gap-1">
            <Link className="hidden md:flex items-center" href="/">
              <LogoIcon className="h-10 w-auto" />
            </Link>

            <div className="hidden md:inline-flex">
              <Button asChild variant="outline" size="sm">
                <Link href="/catalog">
                  <CatalogIcon className="size-5" />
                  <span>{t.catalog}</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="col-start-2 justify-self-center w-full">
            <div className="w-full mx-auto">
              <Search locale={locale} />
            </div>
          </div>

          <div className="col-start-3 justify-self-end flex items-center gap-3">
            <div className="hidden md:flex items-center gap-layout-gap-1">
              <Link
                aria-label={t.profileAria}
                className="inline-flex items-center justify-center size-9 rounded-md text-sys-btn-interactive-fg hover:text-sys-btn-interactive-fg-hover active:text-sys-btn-interactive-fg-active"
                href="/account"
              >
                <UserRoundIcon className="size-[30px]" />
              </Link>
              <a
                aria-label={t.callAria}
                className="inline-flex items-center justify-center size-9 rounded-md text-sys-btn-interactive-fg hover:text-sys-btn-interactive-fg-hover active:text-sys-btn-interactive-fg-active"
                href="tel:+380987307280"
              >
                <PhoneIcon className="size-[30px]" />
              </a>

              <Suspense
                fallback={
                  <OpenCartButton
                    locale={locale}
                    className="text-sys-btn-interactive-fg hover:text-sys-btn-interactive-fg-hover active:text-sys-btn-interactive-fg-active"
                  />
                }
              >
                <Cart locale={locale} />
              </Suspense>

              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </nav>
      </Container>
    </div>
  )
}
