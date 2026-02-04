'use client'

import { SearchIcon as SearchSvgIcon } from '@/components/icons/SearchIcon'
import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  className?: string
  locale?: import('@/utilities/locale').AppLocale
}

const placeholderByLocale: Record<import('@/utilities/locale').AppLocale, string> = {
  ua: 'Шукати продукт або бренд',
  ru: 'Искать товар или бренд',
}

export const Search: React.FC<Props> = ({ className, locale = 'ua' }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const search = String(formData.get('search') ?? '').trim()
    const newParams = new URLSearchParams(searchParams.toString())

    if (search) {
      newParams.set('q', search)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/catalog', newParams))
  }

  return (
    <form className={cn('relative w-full', className)} onSubmit={onSubmit}>
      <div className="pointer-events-none absolute left-0 top-0 ml-3 flex h-full items-center">
        <SearchSvgIcon className="size-[30px] text-primary" />
      </div>
      <input
        autoComplete="off"
        className="w-full rounded-radius-full bg-[#F9F9F9] py-3 pr-4 pl-14 pobut-body placeholder:text-neutral-500"
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder={placeholderByLocale[locale]}
        type="text"
      />
    </form>
  )
}
