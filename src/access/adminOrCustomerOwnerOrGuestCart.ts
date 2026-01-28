import type { Access, Where } from 'payload'

import { checkRole } from '@/access/utilities'

export const adminOrCustomerOwnerOrGuestCart: Access = ({ id, req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  if (user?.id) {
    const where: Where = {
      customer: {
        equals: user.id,
      },
    }

    return where
  }

  if (!id) return false

  const where: Where = {
    and: [
      {
        id: {
          equals: id,
        },
      },
      {
        or: [
          {
            customer: {
              equals: null,
            },
          },
          {
            customer: {
              exists: false,
            },
          },
        ],
      },
    ],
  }

  return where
}
