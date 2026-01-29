'use client'

import { Section } from '@/components/Section'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export type HomeBannerSlide = {
  id: string
  imageUrl: string
  imageAlt: string
  href?: string | null
  openInNewTab?: boolean | null
}

type HomeBannerProps = {
  slides?: HomeBannerSlide[]
  autoScrollInterval?: number
}

const DEFAULT_AUTO_SCROLL_INTERVAL = 5000 // 5s

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href)
}

export const HomeBanner: React.FC<HomeBannerProps> = ({
  slides = [],
  autoScrollInterval = DEFAULT_AUTO_SCROLL_INTERVAL,
}) => {
  const [rawIndex, setRawIndex] = useState<number>(0)

  const slidesLength = slides?.length ?? 0

  const displayIndex = slidesLength > 0 ? rawIndex % slidesLength : 0

  const startX = useRef<number>(0)
  const currentX = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = (index: number): void => {
    setRawIndex(index)
  }

  const goToNext = useCallback((): void => {
    setRawIndex((prev) => prev + 1)
  }, [])

  const goToPrevious = useCallback((): void => {
    setRawIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    if (slidesLength <= 1) return

    intervalRef.current = setInterval(goToNext, autoScrollInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [goToNext, autoScrollInterval, slidesLength])

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startX.current = e.touches[0].clientX
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    currentX.current = e.touches[0].clientX
  }

  const onTouchEnd = (): void => {
    const diff = startX.current - currentX.current

    if (diff > 50) {
      goToNext()
    }

    if (diff < -50) {
      goToPrevious()
    }

    if (slidesLength > 1) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  const handleMouseEnter = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = (): void => {
    if (slidesLength > 1) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  if (!slides || slidesLength === 0) {
    return null
  }

  return (
    <Section id="home-banner">
      <div
        className="relative w-full max-w-full m-0 p-0 select-none overflow-hidden box-border"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="overflow-hidden rounded-none w-full relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-450 ease-in-out w-full"
            style={{
              transform: `translateX(-${displayIndex * 100}%)`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                className="min-w-full w-full h-[236px] md:h-[380px] lg:h-[500px] relative shrink-0"
                key={slide.id}
              >
                {slide.href ? (
                  isExternalHref(slide.href) || slide.openInNewTab ? (
                    <a
                      href={slide.href}
                      target={slide.openInNewTab ? '_blank' : undefined}
                      rel={slide.openInNewTab ? 'noreferrer' : undefined}
                      className="block h-full w-full"
                      aria-label={slide.imageAlt}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={slide.imageAlt}
                        className="w-full h-full object-cover block"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </a>
                  ) : (
                    <Link
                      href={slide.href}
                      className="block h-full w-full"
                      aria-label={slide.imageAlt}
                    >
                      <img
                        src={slide.imageUrl}
                        alt={slide.imageAlt}
                        className="w-full h-full object-cover block"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </Link>
                  )
                ) : (
                  <img
                    src={slide.imageUrl}
                    alt={slide.imageAlt}
                    className="w-full h-full object-cover block"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop-only navigation arrows */}
        {slidesLength > 1 && (
          <div className="pointer-events-none hidden desktop:flex items-center justify-between absolute inset-y-0 left-0 right-0 px-space-20">
            <button
              type="button"
              className="pointer-events-auto bg-transparent border-none text-sys-accent border border-sys-accent rounded-radius-full p-space-10 hover:bg-sys-accent hover:text-sys-text-on-accent transition-base"
              onClick={goToPrevious}
              aria-label="Попередній банер"
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              className="pointer-events-auto bg-transparent border-none text-sys-accent border border-sys-accent rounded-radius-full p-space-10 hover:bg-sys-accent hover:text-sys-text-on-accent transition-base"
              onClick={goToNext}
              aria-label="Наступний банер"
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}

        <div className="flex justify-center gap-1 mt-3.5 p-0 w-full box-border">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 md:w-4 md:h-4 lg:w-[25px] lg:h-[25px] rounded-full border border-sys-accent bg-color-default-background cursor-pointer ${i === displayIndex ? 'bg-sys-accent' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </Section>
  )
}