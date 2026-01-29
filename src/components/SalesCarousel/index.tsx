'use client'

import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import Image from 'next/image'
import Link from 'next/link'
import { type TouchEvent, useCallback, useEffect, useRef, useState } from 'react'

export type SaleSlide = {
  id: string
  imageUrl: string
  imageAlt: string
  href?: string
  openInNewTab?: boolean
}

type Props = {
  slides: SaleSlide[]
  itemsPerView?: number
  autoScrollInterval?: number
}

const DEFAULT_AUTO_SCROLL_INTERVAL = 6500

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

const getItemsPerView = (): number => {
  if (typeof window === 'undefined') return 1
  // 1 on mobile, 2 from md up (matches the mockups: 2 banners side-by-side)
  if (window.innerWidth >= 768) return 2
  return 1
}

export function SalesCarousel({
  slides,
  itemsPerView: initialItemsPerView,
  autoScrollInterval = DEFAULT_AUTO_SCROLL_INTERVAL,
}: Props) {
  const totalItems = slides.length
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const [itemsPerView, setItemsPerView] = useState<number>(() => {
    const base = initialItemsPerView ?? getItemsPerView()
    const safeCount = Math.max(1, slides.length)
    return Math.min(base, safeCount)
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = getItemsPerView()
      const safeCount = Math.max(1, slides.length)
      setItemsPerView(Math.min(newItemsPerView, safeCount))
      setCurrentIndex((prev) =>
        totalItems === 0 ? 0 : ((prev % totalItems) + totalItems) % totalItems,
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [slides.length, totalItems])

  const goToNext = useCallback(() => {
    if (totalItems === 0) return
    setCurrentIndex((prev) => (prev + 1) % totalItems)
  }, [totalItems])

  const goToPrevious = useCallback(() => {
    if (totalItems === 0) return
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }, [totalItems])

  useEffect(() => {
    if (totalItems === 0) return
    if (totalItems <= itemsPerView) return

    intervalRef.current = setInterval(goToNext, autoScrollInterval)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [goToNext, autoScrollInterval, totalItems, itemsPerView])

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const handleMouseLeave = () => {
    if (totalItems > itemsPerView) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  const startX = useRef<number>(0)
  const currentX = useRef<number>(0)

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    currentX.current = e.touches[0].clientX
  }

  const onTouchEnd = () => {
    const diff = startX.current - currentX.current
    if (diff > 50) goToNext()
    if (diff < -50) goToPrevious()

    if (totalItems > itemsPerView) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  if (!slides?.length) return null

  const displaySlides = Array.from({ length: itemsPerView }, (_, i) => {
    const index = (currentIndex + i) % totalItems
    return slides[index]
  })

  const showArrows = totalItems > itemsPerView

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="w-full" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full min-w-0 gap-layout-gap-2">
          {displaySlides.map((slide) => {
            return (
              <div key={slide.id} className="min-w-0">
                {slide.href ? (
                  isExternalHref(slide.href) || slide.openInNewTab ? (
                    <a
                      href={slide.href}
                      target={slide.openInNewTab ? '_blank' : undefined}
                      rel={slide.openInNewTab ? 'noreferrer' : undefined}
                      className={[
                        'relative block min-w-0 overflow-hidden rounded-radius-xl',
                        'bg-sys-surface',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sys-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sys-bg',
                      ].join(' ')}
                      aria-label={slide.imageAlt}
                    >
                      <div className="relative w-full aspect-16/7 sm:aspect-16/6">
                        <Image
                          src={slide.imageUrl}
                          alt={slide.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={slide.href}
                      className={[
                        'relative block min-w-0 overflow-hidden rounded-radius-xl',
                        'bg-sys-surface',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sys-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sys-bg',
                      ].join(' ')}
                      aria-label={slide.imageAlt}
                    >
                      <div className="relative w-full aspect-16/7 sm:aspect-16/6">
                        <Image
                          src={slide.imageUrl}
                          alt={slide.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={false}
                        />
                      </div>
                    </Link>
                  )
                ) : (
                  <div
                    className={[
                      'relative block min-w-0 overflow-hidden rounded-radius-xl',
                      'bg-sys-surface',
                    ].join(' ')}
                  >
                    <div className="relative w-full aspect-16/7 sm:aspect-16/6">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showArrows && (
        <div className="flex justify-center items-center gap-[clamp(80px,18vw,220px)] mt-layout-gap-2">
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer p-space-10 flex items-center justify-center transition-colors duration-200 ease-in-out text-sys-accent hover:text-sys-accent-hover active:text-sys-accent-active focus-visible:outline-2 focus-visible:outline-sys-focus focus-visible:outline-offset-2"
            onClick={goToPrevious}
            aria-label="Попередній банер"
          >
            <ArrowLeftIcon className="w-14 h-14" />
          </button>
          <button
            type="button"
            className="bg-transparent border-none cursor-pointer p-space-10 flex items-center justify-center transition-colors duration-200 ease-in-out text-sys-accent hover:text-sys-accent-hover active:text-sys-accent-active focus-visible:outline-2 focus-visible:outline-sys-focus focus-visible:outline-offset-2"
            onClick={goToNext}
            aria-label="Наступний банер"
          >
            <ArrowRightIcon className="w-14 h-14" />
          </button>
        </div>
      )}
    </div>
  )
}

export default SalesCarousel

