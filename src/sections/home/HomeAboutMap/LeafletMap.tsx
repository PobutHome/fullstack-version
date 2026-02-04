'use client'

import { useEffect } from 'react'
import { CircleMarker, MapContainer, TileLayer, useMap } from 'react-leaflet'

type Props = {
  center: [number, number]
  zoom?: number
  markerTitle?: string
}

function KeepCentered({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom, { animate: false })
    // Ensure correct rendering after dynamic load / resize.
    // Leaflet can initialize before container has final size.
    const t = window.setTimeout(() => map.invalidateSize(), 0)
    return () => window.clearTimeout(t)
  }, [center, map, zoom])

  return null
}

/**
 * Client-only Leaflet map (OpenStreetMap tiles).
 * Kept small and deterministic: no extra plugins, no heavy markers.
 */
export function LeafletMap({ center, zoom = 14, markerTitle }: Props) {
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

      <KeepCentered center={center} zoom={zoom} />

      {/* Red "point" marker (lightweight + crisp at any zoom) */}
      <CircleMarker
        center={center}
        radius={10}
        pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 1 }}
      >
        {markerTitle ? <title>{markerTitle}</title> : null}
      </CircleMarker>
    </MapContainer>
  )
}

