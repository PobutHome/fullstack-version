import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/cn'
import type { AppLocale } from '@/utilities/locale'
import { getClientLocale } from '@/utilities/localeClient'
import React from 'react'

function CartBagIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 20 25"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 6.25V5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5V6.25H18.75C19.44 6.25 20 6.81125 20 7.50875V22.51C20 23.885 18.8813 25 17.5075 25H2.4925C1.83188 25 1.19828 24.7377 0.73092 24.2708C0.263557 23.804 0.000662607 23.1706 0 22.51V7.51C0 6.8125 0.55625 6.25 1.25 6.25H5ZM6.5 6.25H13.5V5C13.5 4.07174 13.1313 3.1815 12.4749 2.52513C11.8185 1.86875 10.9283 1.5 10 1.5C9.07174 1.5 8.1815 1.86875 7.52513 2.52513C6.86875 3.1815 6.5 4.07174 6.5 5V6.25ZM5 7.75H1.5V22.51C1.5 23.055 1.945 23.5 2.4925 23.5H17.5075C17.7703 23.5 18.0224 23.3958 18.2084 23.2102C18.3945 23.0246 18.4993 22.7728 18.5 22.51V7.75H15V11.25H13.5V7.75H6.5V11.25H5V7.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function OpenCartButton({
  className,
  locale,
  quantity,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Button> & { locale?: AppLocale; quantity?: number }) {
  const resolvedLocale = locale ?? getClientLocale()

  return (
    <Button
      variant="nav"
      size="clear"
      className={cn(
        'navLink relative flex items-center justify-center hover:cursor-pointer',
        'p-0',
        'text-sys-btn-interactive-fg hover:text-sys-btn-interactive-fg-hover active:text-sys-btn-interactive-fg-active',
        className,
      )}
      {...rest}
    >
      <span className="sr-only">{resolvedLocale === 'ru' ? 'Корзина' : 'Кошик'}</span>

      <CartBagIcon className="size-[30px]" />

      {quantity ? (
        <span
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center rounded-full',
            'min-w-4 h-4 px-1 text-[10px] leading-none',
            'bg-sys-btn-primary-bg text-sys-btn-primary-fg',
          )}
        >
          {quantity > 99 ? '99+' : quantity}
        </span>
      ) : null}
    </Button>
  )
}
