'use client'

import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

type Props = {
  center: [number, number]
  zoom?: number
  markerTitle?: string
}

/**
 * Client-only Leaflet map (OpenStreetMap tiles).
 * Kept small and deterministic: no extra plugins, no heavy markers.
 */
export function LeafletMap({ center, zoom = 14, markerTitle }: Props) {
  // Fix default marker icon paths in bundlers (Next.js).
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
      iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
      shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
    })
  }, [])

  const markerPosition = useMemo(() => center, [center])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      dragging={true}
      attributionControl={true}
      zoomControl={true}
      preferCanvas={true}
      className="h-full w-full"
    >
      <TileLayer
        // Public OSM tile server. If you anticipate high traffic, consider a paid tile provider.
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={markerPosition} title={markerTitle} />
    </MapContainer>
  )
}

