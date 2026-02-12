'use client'
import type { Product, Variant } from '@/payload-types'

import { AddToCart } from '@/components/Cart/AddToCart'
import {
  ApplePayLogo,
  GooglePayLogo,
  MastercardLogo,
  Privat24Logo,
  VisaLogo,
} from '@/components/icons/logos/payments'
import { NovaPoshtaLogo, UkrposhtaLogo } from '@/components/icons/logos/shipping'
import { Price } from '@/components/Price'
import { RichText } from '@/components/RichText'
import { getClientLocale } from '@/utilities/localeClient'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import { Banknote, ChevronDown, CreditCard, RotateCcw, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

function ShippingLogo({ type }: { type: 'nova' | 'ukr' }) {
  if (type === 'nova') {
    return (
      <span
        className="inline-flex h-8 min-w-8 items-center justify-center rounded-radius-md bg-white px-2"
        aria-label="Nova Poshta"
      >
        <Image src={NovaPoshtaLogo} alt="Nova Poshta" className="h-5 w-auto" />
      </span>
    )
  }

  return (
    <span
      className="inline-flex h-8 min-w-8 items-center justify-center rounded-radius-md px-2"
      aria-label="Ukrposhta"
    >
      <Image src={UkrposhtaLogo} alt="Ukrposhta" className="h-5 w-auto" />
    </span>
  )
}

function PaymentLogos() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="inline-flex h-8 items-center justify-center rounded-radius-md  bg-white px-2"
        aria-label="Visa"
      >
        <Image src={VisaLogo} alt="Visa" className="h-4 w-auto" />
      </span>

      <span
        className="inline-flex h-8 items-center justify-center rounded-radius-md  bg-white px-2"
        aria-label="Mastercard"
      >
        <Image src={MastercardLogo} alt="Mastercard" className="h-4 w-auto" />
      </span>

      <span
        className="inline-flex h-8 items-center justify-center rounded-radius-md  bg-white px-2"
        aria-label="Google Pay"
      >
        <Image src={GooglePayLogo} alt="Google Pay" className="h-4 w-auto" />
      </span>

      <span
        className="inline-flex h-8 items-center justify-center rounded-radius-md  bg-white px-2"
        aria-label="Apple Pay"
      >
        <Image src={ApplePayLogo} alt="Apple Pay" className="h-4 w-auto" />
      </span>

      <span
        className="inline-flex h-8 items-center justify-center rounded-radius-md  bg-white px-2"
        aria-label="Приват24"
      >
        <Image src={Privat24Logo} alt="Приват24" className="h-4 w-auto" />
      </span>
    </div>
  )
}

function SeeMoreLinks({ locale }: { locale: 'ua' | 'ru' }) {
  return (
    <details className="group text-sys-text-muted">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1 pobut-caption text-sys-text-muted hover:text-sys-text [&::-webkit-details-marker]:hidden">
        <span>{locale === 'ru' ? 'Смотреть ещё' : 'Дивитись ще'}</span>
        <ChevronDown className="size-3.5 transition-transform duration-200 group-open:rotate-180" />
      </summary>

      <div className="mt-space-10 grid gap-2 pl-1">
        <Link
          className="inline-flex items-center gap-2 pobut-body text-sys-link hover:text-sys-link-hover"
          href="/"
        >
          <RotateCcw className="size-4" />
          <span>{locale === 'ru' ? 'Условия возврата' : 'Умови повернення'}</span>
        </Link>

        <Link
          className="inline-flex items-center gap-2 pobut-body text-sys-link hover:text-sys-link-hover"
          href="/"
        >
          <ShieldCheck className="size-4" />
          <span>{locale === 'ru' ? 'Условия гарантии' : 'Умови гарантії'}</span>
        </Link>
      </div>
    </details>
  )
}

export function ProductDescription({ product }: { product: Product }) {
  const { currency } = useCurrency()
  const locale = getClientLocale()

  const inStock = product.enableVariants
    ? Boolean(
        product.variants?.docs?.some(
          (variant) => typeof variant === 'object' && (variant.inventory || 0) > 0,
        ),
      )
    : (product.inventory || 0) > 0

  let amount = 0,
    lowestAmount = 0,
    highestAmount = 0
  const priceField = `priceIn${currency.code}` as keyof Product
  const hasVariants = product.enableVariants && Boolean(product.variants?.docs?.length)

  if (hasVariants) {
    const priceField = `priceIn${currency.code}` as keyof Variant
    const variantsOrderedByPrice = product.variants?.docs
      ?.filter((variant) => variant && typeof variant === 'object')
      .sort((a, b) => {
        if (
          typeof a === 'object' &&
          typeof b === 'object' &&
          priceField in a &&
          priceField in b &&
          typeof a[priceField] === 'number' &&
          typeof b[priceField] === 'number'
        ) {
          return a[priceField] - b[priceField]
        }

        return 0
      }) as Variant[]

    const lowestVariant = variantsOrderedByPrice[0][priceField]
    const highestVariant = variantsOrderedByPrice[variantsOrderedByPrice.length - 1][priceField]
    if (
      variantsOrderedByPrice &&
      typeof lowestVariant === 'number' &&
      typeof highestVariant === 'number'
    ) {
      lowestAmount = lowestVariant
      highestAmount = highestVariant
    }
  } else if (product[priceField] && typeof product[priceField] === 'number') {
    amount = product[priceField]
  }

  return (
    <div className="grid gap-space-20 text-sys-text">
      <div className="grid gap-space-10">
        <div className="flex items-center gap-2 ">
          <span
            aria-hidden="true"
            className={`h-2 w-2 rounded-full ${inStock ? 'bg-sys-accent' : 'bg-sys-text-muted'}`}
          />
          <span className={`pobut-caption ${inStock ? 'text-sys-accent' : 'text-sys-text-muted'}`}>
            {inStock
              ? locale === 'ru'
                ? 'в наличии'
                : 'в наявності'
              : locale === 'ru'
                ? 'нет в наличии'
                : 'немає в наявності'}
          </span>
        </div>

        <h1 className="pobut-body text-sys-text">{product.title}</h1>

        <div className="flex items-center justify-between gap-space-10 border-b border-sys-border pb-space-10">
          <div className="w-full max-w-[600px]">
            <Suspense fallback={null}>
              <AddToCart className="flex-col items-start" product={product} />
            </Suspense>
          </div>

          <div className="shrink-0">
            {hasVariants ? (
              <Price
                highestAmount={highestAmount}
                lowestAmount={lowestAmount}
                className="pobut-H1 text-sys-accent"
                as="span"
              />
            ) : (
              <Price amount={amount} className="pobut-H1 text-sys-accent" as="span" />
            )}
          </div>
        </div>
      </div>

      <p className="pobut-body font-bold">
        {locale === 'ru' ? 'О товаре' : 'Про товар'}
      </p>

      {product.description ? (
        <RichText
          data={product.description}
          enableGutter={false}
          className="text-sys-text [&_p]:text-sys-text [&_li]:text-sys-text [&_ul]:text-sys-text [&_ol]:text-sys-text [&_h1]:text-sys-text [&_h2]:text-sys-text [&_h3]:text-sys-text [&_strong]:text-sys-text"
        />
      ) : null}

      {typeof product.inventory === 'number' ? (
        <div className="w-full max-w-[420px]">
          <div className="flex items-center justify-between rounded-radius-full border border-sys-btn-interactive-border bg-sys-surface px-space-20 py-space-10">
            <span className="pobut-body text-sys-text-muted">
              {locale === 'ru' ? 'Наличие' : 'Наявність'}:
            </span>
            <span className="pobut-body text-sys-text">
              {product.inventory} {locale === 'ru' ? 'шт' : 'шт'}
            </span>
          </div>
        </div>
      ) : null}

      <div className="grid gap-space-10">
        <h2 className="pobut-H3 text-sys-text">{locale === 'ru' ? 'Доставка' : 'Доставка'}</h2>

        <div className="grid gap-space-10 rounded-radius-primary border border-sys-border bg-sys-surface p-space-20">
          <div className="flex items-start gap-space-10">
            <ShippingLogo type="nova" />
            <div className="grid gap-1">
              <p className="pobut-body font-bold text-sys-text">
                {locale === 'ru' ? 'Новая Почта' : 'Нова Пошта'}
              </p>
              <p className="pobut-caption text-sys-text-muted">
                {locale === 'ru'
                  ? 'Доставка в отделение или почтомат по Украине'
                  : 'Доставка у відділення або поштомат по Україні'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-space-10">
            <ShippingLogo type="ukr" />
            <div className="grid gap-1">
              <p className="pobut-body font-bold text-sys-text">
                {locale === 'ru' ? 'Укрпочта' : 'Укрпошта'}
              </p>
              <p className="pobut-caption text-sys-text-muted">
                {locale === 'ru'
                  ? 'Доставка в отделение Укрпочты по Украине'
                  : 'Доставка у відділення Укрпошти по Україні'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-space-10">
        <h2 className="pobut-H3 text-sys-text">
          {locale === 'ru' ? 'Оплата и гарантии' : 'Оплата та гарантії'}
        </h2>

        <div className="grid gap-space-10 rounded-radius-primary border border-sys-border bg-sys-surface p-space-20">
          <div className="flex items-start gap-space-10">
            <CreditCard className="mt-1 size-5 text-sys-text" />
            <div className="grid gap-space-10">
              <p className="pobut-body font-bold text-sys-text">
                {locale === 'ru' ? 'Оплата картой' : 'Оплата карткою'}
              </p>

              <PaymentLogos />
            </div>
          </div>

          <div className="flex items-start gap-space-10">
            <Banknote className="mt-1 size-5 text-sys-text" />
            <div className="grid gap-1">
              <p className="pobut-body font-bold text-sys-text">
                {locale === 'ru' ? 'Наложенный платеж' : 'Післяплата'}
              </p>
              <p className="pobut-caption text-sys-text-muted">
                {locale === 'ru'
                  ? 'Оплата при получении в отделении перевозчика'
                  : 'Оплата при отриманні у відділенні перевізника'}
              </p>
            </div>
          </div>

          <SeeMoreLinks locale={locale} />
        </div>
      </div>
    </div>
  )
}
