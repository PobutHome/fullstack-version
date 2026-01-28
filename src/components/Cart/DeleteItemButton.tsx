'use client'

import type { CartItem } from '@/components/Cart'
import type { AppLocale } from '@/utilities/locale'
import { getClientLocale } from '@/utilities/localeClient'
import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import clsx from 'clsx'
import { XIcon } from 'lucide-react'
import React from 'react'

const deleteItemCopy: Record<AppLocale, { aria: string }> = {
  ua: { aria: 'Видалити товар з кошика' },
  ru: { aria: 'Удалить товар из корзины' },
}

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { removeItem } = useCart()
  const itemId = item.id

  const t = deleteItemCopy[getClientLocale()]

  return (
    <form>
      <button
        aria-disabled={!itemId}
        aria-label={t.aria}
        className={clsx(
          'ease hover:cursor-pointer flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
          {
            'cursor-not-allowed px-0': !itemId,
          },
        )}
        disabled={!itemId}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          if (itemId) removeItem(itemId)
        }}
        type="button"
      >
        <XIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
    </form>
  )
}
