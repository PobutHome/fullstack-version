'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/Auth'
import type { AppLocale } from '@/utilities/locale'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  locale: AppLocale
}

const menuCopy: Record<
  AppLocale,
  {
    storeTitle: string
    catalog: string
    about: string
    contacts: string
    accountTitle: string
    orders: string
    addresses: string
    manageAccount: string
    logout: string
    login: string
    createAccount: string
    or: string
  }
> = {
  ua: {
    storeTitle: 'Магазин',
    catalog: 'Каталог',
    about: 'Про нас',
    contacts: 'Контакти',
    accountTitle: 'Мій акаунт',
    orders: 'Замовлення',
    addresses: 'Адреси',
    manageAccount: 'Профіль',
    logout: 'Вийти',
    login: 'Увійти',
    createAccount: 'Створити акаунт',
    or: 'або',
  },
  ru: {
    storeTitle: 'Магазин',
    catalog: 'Каталог',
    about: 'О нас',
    contacts: 'Контакты',
    accountTitle: 'Мой аккаунт',
    orders: 'Заказы',
    addresses: 'Адреса',
    manageAccount: 'Профиль',
    logout: 'Выйти',
    login: 'Войти',
    createAccount: 'Создать аккаунт',
    or: 'или',
  },
}

export function MobileMenu({ locale }: Props) {
  const { user } = useAuth()
  const t = menuCopy[locale]

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex items-center justify-center rounded-md text-sys-accent transition-colors">
        <MenuIcon className="size-[30px]" />
      </SheetTrigger>

      <SheetContent side="left" className="px-4">
        <SheetHeader className="px-0 pt-4 pb-0">
          <SheetTitle>{t.storeTitle}</SheetTitle>

          <SheetDescription />
        </SheetHeader>

        <div className="py-4">
          <ul className="flex w-full flex-col">
            <li className="py-2">
              <Link href="/catalog">{t.catalog}</Link>
            </li>
            <li className="py-2">
              <Link href="/">{t.about}</Link>
            </li>
            <li className="py-2">
              <Link href="/">{t.contacts}</Link>
            </li>
          </ul>
        </div>

        {user ? (
          <div className="mt-4">
            <h2 className="text-xl mb-4">{t.accountTitle}</h2>
            <hr className="my-2" />
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/orders">{t.orders}</Link>
              </li>
              <li>
                <Link href="/account/addresses">{t.addresses}</Link>
              </li>
              <li>
                <Link href="/account">{t.manageAccount}</Link>
              </li>
              <li className="mt-6">
                <Button asChild variant="outline">
                  <Link href="/logout">{t.logout}</Link>
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">{t.accountTitle}</h2>
            <div className="flex items-center gap-2 mt-4">
              <Button asChild className="w-full" variant="outline">
                <Link href="/login">{t.login}</Link>
              </Button>
              <span>{t.or}</span>
              <Button asChild className="w-full">
                <Link href="/create-account">{t.createAccount}</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
