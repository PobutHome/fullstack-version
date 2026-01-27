'use client'

import { Section } from '@/components/Section'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type HomeBannerProps = {
  images?: string[]
  autoScrollInterval?: number
}

const DEFAULT_IMAGES: string[] = [
  'https://picsum.photos/id/1011/1600/500',
  'https://picsum.photos/id/1015/1600/500',
  'https://picsum.photos/id/1016/1600/500',
  'https://picsum.photos/id/1020/1600/500',
]

const DEFAULT_AUTO_SCROLL_INTERVAL = 5000 // 5s

export const HomeBanner: React.FC<HomeBannerProps> = ({
  images = DEFAULT_IMAGES,
  autoScrollInterval = DEFAULT_AUTO_SCROLL_INTERVAL,
}) => {
  const [rawIndex, setRawIndex] = useState<number>(0)

  const displayIndex =
    rawIndex < images.length
      ? rawIndex
      : rawIndex % images.length

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
    if (images.length <= 1) return

    intervalRef.current = setInterval(goToNext, autoScrollInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [goToNext, autoScrollInterval, images.length])

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

    if (images.length > 1) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  const handleMouseEnter = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = (): void => {
    if (images.length > 1) {
      intervalRef.current = setInterval(goToNext, autoScrollInterval)
    }
  }

  if (!images || images.length === 0) {
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
            {images.map((src, i) => (
              <div
                className="min-w-full w-full h-[236px] md:h-[380px] lg:h-[500px] relative shrink-0"
                key={i}
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-cover block"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop-only navigation arrows */}
        {images.length > 1 && (
          <div className="pointer-events-none hidden desktop:flex items-center justify-between absolute inset-y-0 left-0 right-0 px-space-20">
            <button
              type="button"
              className="pointer-events-auto bg-transparent border-none text-sys-accent p-space-10 hover:bg-transparent active:bg-transparent transition-base"
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
          {images.map((_, i) => (
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