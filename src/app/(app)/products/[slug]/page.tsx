import type { Media, Product } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Container } from '@/components/Container'
import { Media as AppMedia } from '@/components/Media'
import { Price } from '@/components/Price'
import { Gallery } from '@/components/product/Gallery'
import { ProductDescription } from '@/components/product/ProductDescription'
import { getRequestLocale } from '@/utilities/locale'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })

  if (!product) return notFound()

  const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const canIndex = product._status === 'published'

  const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined)

  return {
    description: product.meta?.description || '',
    openGraph: seoImage?.url
      ? {
          images: [
            {
              alt: seoImage?.alt,
              height: seoImage.height!,
              url: seoImage?.url,
              width: seoImage.width!,
            },
          ],
        }
      : null,
    robots: {
      follow: canIndex,
      googleBot: {
        follow: canIndex,
        index: canIndex,
      },
      index: canIndex,
    },
    title: product.meta?.title || product.title,
  }
}

export default async function ProductPage({ params }: Args) {
  const { slug } = await params
  const locale = await getRequestLocale()
  const product = await queryProductBySlug({ slug })

  if (!product) return notFound()

  const gallery =
    product.gallery
      ?.filter((item) => typeof item.image === 'object')
      .map((item) => ({
        ...item,
        image: item.image as Media,
      })) || []

  const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((variant) => {
        if (typeof variant !== 'object') return false
        return variant.inventory && variant?.inventory > 0
      })
    : product.inventory! > 0

  let price = product.priceInUAH

  if (product.enableVariants && product?.variants?.docs?.length) {
    price = product?.variants?.docs?.reduce((acc, variant) => {
      if (typeof variant === 'object' && variant?.priceInUAH && acc && variant?.priceInUAH > acc) {
        return variant.priceInUAH
      }
      return acc
    }, price)
  }

  const productJsonLd = {
    name: product.title,
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: product.description,
    image: metaImage?.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: hasStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      price: price,
      priceCurrency: 'UAH',
    },
  }

  const relatedProducts =
    product.relatedProducts?.filter((relatedProduct) => typeof relatedProduct === 'object') ?? []

  return (
    <React.Fragment>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
        type="application/ld+json"
      />
      <Container>
        <div className="grid gap-layout-gap-2 py-space-20 desktop:grid-cols-2 desktop:items-start">
          <div className="h-full w-full">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-radius-primary bg-sys-surface-2" />
              }
            >
              {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
            </Suspense>
          </div>

          <div className="w-full">
            <ProductDescription product={product} />
          </div>
        </div>
      </Container>

      {product.layout?.length ? <RenderBlocks blocks={product.layout} /> : <></>}

      {relatedProducts.length ? (
        <Container>
          <RelatedProducts locale={locale} products={relatedProducts as Product[]} />
        </Container>
      ) : (
        <></>
      )}
    </React.Fragment>
  )
}

function RelatedProducts({ locale, products }: { locale: 'ua' | 'ru'; products: Product[] }) {
  if (!products.length) return null

  const title = locale === 'ru' ? 'Вам может понравиться' : 'Вам можуть сподобатись'
  const inStockLabel = locale === 'ru' ? 'в наличии' : 'в наявності'
  const outOfStockLabel = locale === 'ru' ? 'нет в наличии' : 'немає в наявності'

  return (
    <div className="grid gap-space-10 pb-space-20">
      <h2 className="pobut-H1 text-sys-text">{title}</h2>
      <ul className="grid grid-cols-2 gap-space-10 pt-1 desktop:grid-cols-3">
        {products.map((item) => {
          const firstGalleryImage =
            typeof item.gallery?.[0]?.image === 'object' ? (item.gallery[0].image as Media) : null
          const image = firstGalleryImage
          const inStock = (item.inventory || 0) > 0

          return (
            <li className="w-full" key={item.id}>
              <Link
                className="group flex h-full flex-col overflow-hidden rounded-radius-primary border border-sys-card-border bg-sys-card-bg"
                href={`/products/${item.slug}`}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-sys-surface-2">
                  {image ? (
                    <AppMedia
                      resource={image}
                      className="relative h-full w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      fill
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sys-text-muted pobut-caption">
                      No image
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-space-10 p-space-10">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${inStock ? 'bg-sys-accent' : 'bg-sys-text-muted'}`}
                    />
                    <span
                      className={`pobut-caption ${inStock ? 'text-sys-accent' : 'text-sys-text-muted'}`}
                    >
                      {inStock ? inStockLabel : outOfStockLabel}
                    </span>
                  </div>

                  <p className="pobut-body text-sys-text line-clamp-2">{item.title}</p>

                  <Price
                    amount={item.priceInUAH || 0}
                    className="mt-auto pobut-H1 text-sys-accent"
                    as="span"
                  />
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const locale = await getRequestLocale()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 3,
    draft,
    locale,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
    populate: {
      variants: {
        title: true,
        priceInUAH: true,
        inventory: true,
        options: true,
      },
    },
  })

  return result.docs?.[0] || null
}
