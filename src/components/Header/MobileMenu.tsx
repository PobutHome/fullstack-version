'use client'

import { Button } from '@/components/Button'
import { UserRoundIcon } from '@/components/icons/UserRoundIcon'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetClose,
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
import { LanguageSwitcher } from './LanguageSwitcher'

interface Props {
  locale: AppLocale
  categories: Array<{
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

const menuCopy: Record<
  AppLocale,
  {
    catalog: string
    account: string
    emptyCategory: string
    viewCategory: string
    login: string
    logout: string
  }
> = {
  ua: {
    catalog: 'Каталог',
    account: 'Кабінет',
    emptyCategory: 'Поки немає товарів',
    viewCategory: 'Перейти до категорії',
    login: 'Увійти',
    logout: 'Вийти',
  },
  ru: {
    catalog: 'Каталог',
    account: 'Кабинет',
    emptyCategory: 'Пока нет товаров',
    viewCategory: 'Перейти к категории',
    login: 'Войти',
    logout: 'Выйти',
  },
}

export function MobileMenu({ locale, categories }: Props) {
  const { user } = useAuth()
  const t = menuCopy[locale]

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

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
      <SheetTrigger className="relative flex items-center justify-center rounded-md text-sys-accent transition-colors pobut-body-mobile">
        <MenuIcon className="size-[30px]" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-space-20 bg-sys-bg text-sys-text overflow-y-auto overscroll-contain"
      >
        <SheetHeader className="">
          <div className="flex items-center justify-between ">
            <LanguageSwitcher locale={locale} />
          </div>
          <SheetTitle className="sr-only">{t.catalog}</SheetTitle>
          <SheetDescription className="sr-only" />
        </SheetHeader>

        <div className=" flex flex-col gap-space-10 py-space-20">
          <SheetClose asChild>
            <Link className="flex items-center text-sys-text" href={user ? '/account' : '/login'}>
              <UserRoundIcon className="size-[25px]" />
              <span className="pl-2">{t.account}</span>
            </Link>
          </SheetClose>
          <Link href={'tel:+380987307280'}>
            {' '}
            <span>+38 (098) 730 72 80</span>
          </Link>
        </div>

        <Accordion type="multiple" className="w-full flex flex-col gap-space-10">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.id} className="border-b-0">
              <AccordionTrigger className=" hover:no-underline text-sys-text data-[state=open]:text-sys-accent [&>svg]:text-sys-text-muted data-[state=open]:[&>svg]:text-sys-accent">
                <SheetClose asChild>
                  <Link
                    className="pobut-H2"
                    href={
                      category.slug
                        ? `/catalog#${encodeURIComponent(category.slug)}`
                        : `/shop?category=${encodeURIComponent(category.id)}`
                    }
                    onClick={(event) => event.stopPropagation()}
                  >
                    {category.title}
                  </Link>
                </SheetClose>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                {category.products.length ? (
                  <ul className="flex flex-col gap-2 pl-4">
                    {category.products.map((product) => (
                      <li key={product.id}>
                        <SheetClose asChild>
                          <Link
                            className="pobut-body-mobile text-sys-text hover:text-sys-accent"
                            href={`/products/${product.slug}`}
                          >
                            {product.title}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sys-text-muted pl-4">{t.emptyCategory}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {user ? (
          <div className="py-space-20">
            <Button asChild variant="outline" size="sm">
              <SheetClose asChild>
                <Link href="/logout">{t.logout}</Link>
              </SheetClose>
            </Button>
          </div>
        ) : (
          <div className="py-space-20">
            <Button asChild variant="outline" size="sm">
              <SheetClose asChild>
                <Link href="/login">{t.login}</Link>
              </SheetClose>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
