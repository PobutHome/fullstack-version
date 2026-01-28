'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

type Props = {
  center: [number, number]
  zoom?: number
  markerTitle?: string
  className?: string
}

function MapSkeleton() {
  return (
    <div
      className={[
        'h-full w-full',
        'bg-sys-surface-2',
        'animate-pulse',
      ].join(' ')}
      aria-label="Loading map…"
    />
  )
}

const LeafletMap = dynamic(() => import('./LeafletMap').then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

/**
 * Loads Leaflet only when the wrapper is near the viewport.
 * Keeps homepage JS + network light until the user scrolls.
 */
export function LazyLeafletMap({ center, zoom, markerTitle, className = '' }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return
    const el = wrapperRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      // Start loading slightly before it becomes visible.
      { rootMargin: '300px 0px', threshold: 0.01 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [shouldLoad])

  return (
    <div ref={wrapperRef} className={className}>
      {shouldLoad ? (
        <LeafletMap center={center} zoom={zoom} markerTitle={markerTitle} />
      ) : (
        <MapSkeleton />
      )}
    </div>
  )
}

