import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

export const DeliveryMethods: CollectionConfig = {
  slug: 'delivery-methods',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    group: 'Магазин',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Вартість доставки в базових одиницях (наприклад, 2500 = ₴25.00).',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
