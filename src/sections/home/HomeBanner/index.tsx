'use client'

import { Section } from '@/components/Section'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './homeBanner.css'

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
      setRawIndex((prev) => Math.max(prev - 1, 0))
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
    <Section id="home-banner" >
    <div
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="carousel-window"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${displayIndex * 100}%)`,
          }}
        >
          {images.map((src, i) => (
            <div className="carousel-slide" key={i}>
              <img src={src} alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === displayIndex ? 'active' : ''}`}
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