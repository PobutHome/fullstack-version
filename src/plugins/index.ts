import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig, Plugin } from 'payload'

import { liqpayAdapter } from '@/payments/liqpay'

import { adminOnly } from '@/access/adminOnly'
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess'
import { adminOrCustomerOwner } from '@/access/adminOrCustomerOwner'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import { customerOnlyFieldAccess } from '@/access/customerOnlyFieldAccess'
import { ProductsCollection } from '@/collections/Products'
import { Page, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Product | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Магазин` : 'Магазин'
}

const generateURL: GenerateURL<Product | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formSubmissionOverrides: {
      admin: {
        group: 'Контент',
      },
    },
    formOverrides: {
      admin: {
        group: 'Контент',
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  ecommercePlugin({
    access: {
      adminOnly,
      adminOnlyFieldAccess,
      adminOrCustomerOwner,
      adminOrPublishedStatus,
      customerOnlyFieldAccess,
    },
    currencies: {
      defaultCurrency: 'UAH',
      supportedCurrencies: [
        {
          code: 'UAH',
          decimals: 2,
          label: 'Українська гривня',
          symbol: '₴',
        },
      ],
    },
    customers: {
      slug: 'users',
    },
    addresses: {
      supportedCountries: [
        {
          label: 'Україна',
          value: 'UA',
        },
      ],
    },
    carts: {
      cartsCollectionOverride: ({ defaultCollection }: { defaultCollection: CollectionConfig }) => {
        return {
          ...defaultCollection,
          access: {
            ...defaultCollection.access,
            // Нужно для guest checkout и для /api/payments/*/initiate,
            // т.к. initiatePaymentHandler читает cart через Local API без overrideAccess.
            read: () => true,
            update: () => true,
          },
        }
      },
    },
    payments: {
      paymentMethods: [
        liqpayAdapter({
          publicKey: process.env.LIQPAY_PUBLIC_KEY!,
          privateKey: process.env.LIQPAY_PRIVATE_KEY!,
          serverURL: getServerSideURL(),
          // Все основные методы оплаты для UA-магазина
          paytypes: 'card,privat24,apay,gpay,moment_part,paypart,qr,invoice',
          language: 'uk',
        }),
      ],
    },
    products: {
      productsCollectionOverride: ProductsCollection,
    },
  }),
]
