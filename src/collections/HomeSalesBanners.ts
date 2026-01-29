import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { publicAccess } from '@/access/publicAccess'

export const HomeSalesBanners: CollectionConfig = {
  slug: 'home-sales-banners',
  labels: {
    singular: 'Акція / пропозиція (Home)',
    plural: 'Акції і пропозиції (Home)',
  },
  access: {
    read: publicAccess,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    group: 'Контент',
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'sortOrder', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link (optional)',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            description: 'Optional. Use /path for internal links or https://... for external links.',
            placeholder: '/shop',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.url),
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers show first.',
      },
    },
  ],
}

