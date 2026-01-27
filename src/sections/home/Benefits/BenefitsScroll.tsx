'use client'

import { PercentIcon } from '@/components/icons/PercentIcon'
import { SpeedIcon } from '@/components/icons/SpeedIcon'
import { TrayIcon } from '@/components/icons/TrayIcon'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

const MIN_THUMB_PX = 24

export function BenefitsScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [thumbStyle, setThumbStyle] = useState<{
    width: number
    left: number
    visible: boolean
    scrollPercent: number
  }>({ width: 0, left: 0, visible: false, scrollPercent: 0 })
  const dragRef = useRef<{ startX: number; startScrollLeft: number } | null>(null)
  const thumbWidthRef = useRef(0)

  const updateThumb = useCallback(() => {
    const scroll = scrollRef.current
    const track = trackRef.current
    if (!scroll || !track) return

    const { scrollWidth, clientWidth, scrollLeft } = scroll
    const maxScroll = scrollWidth - clientWidth
    const trackWidth = track.offsetWidth

    if (maxScroll <= 0 || trackWidth <= 0) {
      setThumbStyle({ width: 0, left: 0, visible: false, scrollPercent: 0 })
      return
    }

    const ratio = clientWidth / scrollWidth
    const width = Math.max(MIN_THUMB_PX, Math.round(ratio * trackWidth))
    const range = trackWidth - width
    const left = range <= 0 ? 0 : (scrollLeft / maxScroll) * range
    const scrollPercent = Math.round((scrollLeft / maxScroll) * 100)
    thumbWidthRef.current = width

    setThumbStyle({ width, left, visible: true, scrollPercent })
  }, [])

  useEffect(() => {
    const scroll = scrollRef.current
    const track = trackRef.current
    if (!scroll || !track) return

    const ro = new ResizeObserver(updateThumb)
    ro.observe(scroll)
    ro.observe(track)
    scroll.addEventListener('scroll', updateThumb)
    updateThumb()

    return () => {
      ro.disconnect()
      scroll.removeEventListener('scroll', updateThumb)
    }
  }, [updateThumb])

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const scroll = scrollRef.current
      const track = trackRef.current
      if (!scroll || !track || !thumbStyle.visible) return

      const { scrollWidth, clientWidth } = scroll
      const maxScroll = scrollWidth - clientWidth
      const trackWidth = track.offsetWidth
      const thumbWidth = thumbStyle.width
      const range = trackWidth - thumbWidth
      if (range <= 0) return

      const rect = track.getBoundingClientRect()
      const x = e.clientX - rect.left
      const left = Math.max(0, Math.min(range, x - thumbWidth / 2))
      const scrollLeft = (left / range) * maxScroll
      scroll.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    },
    [thumbStyle.visible, thumbStyle.width],
  )

  const handleThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const scroll = scrollRef.current
      const thumb = thumbRef.current
      if (!scroll || !thumb || !thumbStyle.visible) return
      dragRef.current = { startX: e.clientX, startScrollLeft: scroll.scrollLeft }
    },
    [thumbStyle.visible],
  )

  const handleThumbTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const scroll = scrollRef.current
      const thumb = thumbRef.current
      if (!scroll || !thumb || !thumbStyle.visible) return
      dragRef.current = {
        startX: e.touches[0].clientX,
        startScrollLeft: scroll.scrollLeft,
      }
    },
    [thumbStyle.visible],
  )

  useEffect(() => {
    const move = (clientX: number) => {
      const d = dragRef.current
      const scroll = scrollRef.current
      const track = trackRef.current
      if (!d || !scroll || !track) return

      const { scrollWidth, clientWidth } = scroll
      const maxScroll = scrollWidth - clientWidth
      const trackWidth = track.offsetWidth
      const tw = thumbWidthRef.current
      const range = trackWidth - tw
      if (range <= 0) return

      const deltaX = clientX - d.startX
      const deltaScroll = (deltaX / range) * maxScroll
      const nextLeft = Math.max(0, Math.min(maxScroll, d.startScrollLeft + deltaScroll))
      scroll.scrollLeft = nextLeft
      dragRef.current = { startX: clientX, startScrollLeft: nextLeft }
    }

    const onMouseMove = (e: MouseEvent) => move(e.clientX)
    const onMouseUp = () => { dragRef.current = null }
    const onTouchMove = (e: TouchEvent) => {
      if (dragRef.current) move(e.touches[0].clientX)
    }
    const onTouchEnd = () => { dragRef.current = null }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('touchend', onTouchEnd)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div className="benefits-scroll-wrap">
      <div
        id="benefits-scroll"
        ref={scrollRef}
        className="benefits-scroll grid items-start w-full min-w-0 gap-layout-gap-2 max-tablet:gap-space-10 max-tablet:grid-flow-col max-tablet:auto-cols-[minmax(50%,_1fr)] max-tablet:overflow-x-scroll max-tablet:overflow-y-hidden max-tablet:h-[140px] max-tablet:items-center tablet:grid-cols-3 tablet:justify-between tablet:items-center desktop:grid-cols-[1fr_auto_1fr_auto_1fr] desktop:gap-layout-gap-2"
        role="region"
        aria-label="Переваги для оптових клієнтів"
      >
        <div className="grid gap-layout-gap-1 justify-items-center text-center min-w-0">
          <div className="w-full max-w-[3.125rem] aspect-square rounded-full bg-sys-surface border border-sys-accent flex items-center justify-center shrink-0 transition-all duration-300 md:max-w-[9.375rem] lg:max-w-[18.75rem]">
            <PercentIcon aria-hidden="true" className="w-[60%] h-auto aspect-square shrink-0 transition-all duration-300" />
          </div>
          <p className="text-sys-accent">Індивідуальні знижки для бізнесу</p>
        </div>

        <div className="hidden w-[25px] h-[25px] bg-sys-accent rounded-full self-center justify-self-center shrink-0 desktop:block" aria-hidden="true" />

        <div className="grid gap-layout-gap-1 justify-items-center text-center min-w-0">
          <div className="w-full max-w-[3.125rem] aspect-square rounded-full bg-sys-surface border border-sys-accent flex items-center justify-center shrink-0 transition-all duration-300 md:max-w-[9.375rem] lg:max-w-[18.75rem]">
            <SpeedIcon aria-hidden="true" className="w-[60%] h-auto aspect-square shrink-0 transition-all duration-300" />
          </div>
          <p className="text-sys-accent">Швидка доставка по Україні</p>
        </div>

        <div className="hidden w-[25px] h-[25px] bg-sys-accent rounded-full self-center justify-self-center shrink-0 desktop:block" aria-hidden="true" />

        <div className="grid gap-layout-gap-1 justify-items-center text-center min-w-0">
          <div className="w-full max-w-[3.125rem] aspect-square rounded-full bg-sys-surface border border-sys-accent flex items-center justify-center shrink-0 transition-all duration-300 md:max-w-[9.375rem] lg:max-w-[18.75rem]">
            <TrayIcon aria-hidden="true" className="w-[60%] h-auto aspect-square shrink-0 transition-all duration-300" />
          </div>
          <p className="text-sys-accent">Персональний менеджер для оптових клієнтів</p>
        </div>
      </div>

      <div
        className="benefits-scrollbar max-tablet:block tablet:hidden"
        role="scrollbar"
        aria-controls="benefits-scroll"
        aria-orientation="horizontal"
        aria-valuenow={thumbStyle.scrollPercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          ref={trackRef}
          className="benefits-scrollbar-track"
          onClick={handleTrackClick}
          role="presentation"
        >
          {thumbStyle.visible && (
            <div
              ref={thumbRef}
              className="benefits-scrollbar-thumb"
              style={{ width: thumbStyle.width, transform: `translateX(${thumbStyle.left}px)` }}
              onMouseDown={handleThumbMouseDown}
              onTouchStart={handleThumbTouchStart}
              onClick={(e) => e.stopPropagation()}
              role="presentation"
            />
          )}
        </div>
      </div>
    </div>
  )
}
