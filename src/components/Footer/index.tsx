import { Container } from '@/components/Container'
import type { AppLocale } from '@/utilities/locale'
import { getRequestLocale } from '@/utilities/locale'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

const footerCopy: Record<
  AppLocale,
  {
    contacts: string
    address: string
    information: string
    categories: string
    wholesale: string
    catalog: string
    offers: string
    reviews: string
    about: string
    contactsLink: string
    addressLink: string
  }
> = {
  ua: {
    contacts: 'Контакти',
    address: 'Адреса',
    information: 'Інформація',
    categories: 'Категорії',
    wholesale: 'Оптовим клієнтам',
    catalog: 'Каталог',
    offers: 'Акції і пропозиції',
    reviews: 'Відгуки',
    about: 'Про Нас',
    contactsLink: 'Контакти',
    addressLink: 'Адреса',
  },
  ru: {
    contacts: 'Контакты',
    address: 'Адрес',
    information: 'Информация',
    categories: 'Категории',
    wholesale: 'Оптовым клиентам',
    catalog: 'Каталог',
    offers: 'Акции и предложения',
    reviews: 'Отзывы',
    about: 'О нас',
    contactsLink: 'Контакты',
    addressLink: 'Адрес',
  },
}

const footerInfoLinks: Record<
  AppLocale,
  Array<{ label: keyof (typeof footerCopy)['ua']; href: string }>
> = {
  ua: [
    { label: 'wholesale', href: '/#catalog' },
    { label: 'catalog', href: '/catalog' },
    { label: 'offers', href: '/#offers' },
    { label: 'reviews', href: '/#testimonials' },
    { label: 'about', href: '/#about' },
    { label: 'contactsLink', href: '/#about' },
    { label: 'addressLink', href: '/#about' },
  ],
  ru: [
    { label: 'wholesale', href: '/#catalog' },
    { label: 'catalog', href: '/catalog' },
    { label: 'offers', href: '/#offers' },
    { label: 'reviews', href: '/#testimonials' },
    { label: 'about', href: '/#about' },
    { label: 'contactsLink', href: '/#about' },
    { label: 'addressLink', href: '/#about' },
  ],
}

export async function Footer() {
  const locale = await getRequestLocale()
  const t = footerCopy[locale]
  const payload = await getPayload({ config: configPromise })

  const categoriesResult = await payload.find({
    collection: 'categories',
    locale,
    pagination: false,
    sort: 'title',
    select: {
      id: true,
      title: true,
      slug: true,
    },
  })

  const categories = categoriesResult.docs
    .filter((category) => category && typeof category === 'object')
    .map((category) => ({
      id: String(category.id),
      title: String(category.title),
    }))

  const currentYear = new Date().getFullYear()
  const brand = process.env.SITE_NAME || 'PobutHome'

  return (
    <footer className="bg-sys-accent text-sys-text-on-accent py-layout-gap-3">
      <Container>
        <div className="py-space-20 grid grid-cols-2 gap-layout-gap-2 desktop:grid-cols-4 desktop:gap-layout-gap-3">
          <div className="min-w-0 grid gap-layout-gap-2 col-start-1 row-start-1 md:col-start-auto md:row-start-auto">
            <div className="min-w-0 grid gap-space-10">
              <h2 className="m-0 pobut-H1">{t.contacts}</h2>
              <p className="m-0 pobut-body">
                <a className="hover:underline" href="tel:+3809807307280">
                  +38 (098) 730 72 80
                </a>
              </p>
            </div>

            <div className="min-w-0 grid gap-space-10">
              <h2 className="m-0 pobut-H1">{t.address}</h2>
              <p className="m-0 pobut-body">
                ТОВ &quot;Pobut Home&quot;, 29000, Хмельницька обл., м. Хмельницький, вул.
                Деповська, 19/2
              </p>
            </div>
          </div>

          <div className="min-w-0 grid gap-layout-gap-1 col-start-1 row-start-2 desktop:col-start-auto desktop:row-start-auto">
            <h2 className="m-0 pobut-H1">{t.information}</h2>
            <nav aria-label={t.information}>
              <ul className="m-0 p-0 list-none grid gap-layout-gap-1">
                {footerInfoLinks[locale].map((item) => (
                  <li key={item.label}>
                    <Link className="pobut-body hover:underline" href={item.href}>
                      {t[item.label]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="min-w-0 grid gap-layout-gap-1 col-start-2 row-start-1 row-span-2 desktop:col-start-auto desktop:row-start-auto desktop:col-span-2 desktop:row-span-1">
            <h2 className="m-0 pobut-H1 tablet:text-center desktop:text-left">{t.categories}</h2>
            <nav aria-label={t.categories}>
              <ul className="m-0 p-0 list-none grid grid-cols-1 tablet:grid-cols-2 gap-x-layout-gap-3 gap-y-space-10">
                {categories.map((category) => (
                  <li key={category.id} className="min-w-0">
                    <Link
                      className="pobut-body hover:underline block truncate"
                      href={`/catalog?category=${category.id}`}
                      title={category.title}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
          <p className="m-0 pobut-body text-center pt-layout-gap-3">{currentYear} {brand}©</p>
      </Container>
    </footer>
  )
}
