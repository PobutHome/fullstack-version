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
          'inline-flex size-6 items-center justify-center rounded-sm border transition-colors',
          'bg-sys-surface border-sys-btn-outline-border text-sys-btn-outline-fg',
          'hover:bg-sys-surface-2 hover:border-sys-btn-outline-border-hover hover:text-sys-btn-outline-fg-hover',
          'active:bg-sys-btn-outline-bg-active active:border-sys-btn-outline-border-active active:text-sys-btn-outline-fg-active',
          {
            'cursor-not-allowed opacity-50': !itemId,
          },
        )}
        disabled={!itemId}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          e.preventDefault()
          if (itemId) removeItem(itemId)
        }}
        type="button"
      >
        <XIcon className="size-4" />
      </button>
    </form>
  )
}
