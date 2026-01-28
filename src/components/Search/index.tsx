'use client'

import { cn } from '@/utilities/cn'
import { createUrl } from '@/utilities/createUrl'
import { SearchIcon as SearchSvgIcon } from '@/components/icons/SearchIcon'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
  className?: string
}

export const Search: React.FC<Props> = ({ className }) => {
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
        <SearchSvgIcon className="size-4 text-primary" />
      </div>
      <input
        autoComplete="off"
        className="w-full rounded-lg border bg-white py-2 pr-4 pl-10 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-black dark:text-white dark:placeholder:text-neutral-400"
        defaultValue={searchParams?.get('q') || ''}
        key={searchParams?.get('q')}
        name="search"
        placeholder="Шукати продукт або бренд"
        type="text"
      />
    </form>
  )
}
