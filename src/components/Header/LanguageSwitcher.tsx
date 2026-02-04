'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/Button'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import type { AppLocale } from '@/utilities/locale'

import { setLocaleAction } from './localeActions'

type Props = {
  locale: AppLocale
}

const labelByLocale: Record<AppLocale, string> = {
  ua: 'УКР',
  ru: 'РУС',
}

export function LanguageSwitcher({ locale }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const redirectTo = useMemo(() => {
    const qs = searchParams?.toString()
    return `${pathname}${qs ? `?${qs}` : ''}`
  }, [pathname, searchParams])

  const otherLocale: AppLocale = locale === 'ua' ? 'ru' : 'ua'

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current) return
      const target = event.target as Node | null
      if (target && ref.current.contains(target)) return
      setOpen(false)
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div className="relative inline-flex" ref={ref}>
      <Button
        variant="primary"
        size="sm"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2"
      >
        {labelByLocale[locale]}
        <ChevronDownIcon className="size-[17px]" />
      </Button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-[1000] mt-2 w-full flex flex-col items-stretch"
        >
          <form action={setLocaleAction} role="none">
            <input type="hidden" name="locale" value={otherLocale} />
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <button
              type="submit"
              role="menuitem"
              className="pobut-body inline-flex w-full items-center justify-center rounded-radius-full px-6 py-btn-py text-sm bg-neutral-400 text-white hover:bg-neutral-500 active:bg-neutral-600"
            >
              {labelByLocale[otherLocale]}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  )
}
