'use client'

import dynamic from 'next/dynamic'
import type { SaleSlide } from './index'

const SalesCarousel = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-40 p-layout-gap-2">
      <p className="text-sys-text-muted">Завантаження...</p>
    </div>
  ),
})

type Props = {
  slides: SaleSlide[]
}

export function SalesCarouselWrapper({ slides }: Props) {
  return <SalesCarousel slides={slides} />
}

