"use client"

import * as React from "react"
import {
  Map,
  MapMarker,
  MarkerContent,
} from "@/components/ui/map"
import { cn } from "@/lib/utils"

interface MapCardProps {
  latitude: number
  longitude: number
  zoom?: number
  label?: string
  className?: string
}

export function MapCard({
  latitude,
  longitude,
  zoom = 11,
  label = "Stuttgart, Deutschland",
  className,
}: MapCardProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Map container */}
      <div className="absolute inset-0">
        <Map
          center={[longitude, latitude]}
          zoom={zoom}
          scrollZoom={false}
          dragPan={false}
          dragRotate={false}
          touchZoomRotate={false}
          doubleClickZoom={false}
          keyboard={false}
          attributionControl={{
            compact: true,
          }}
        >
          <MapMarker latitude={latitude} longitude={longitude}>
            <MarkerContent>
              {/* Custom marker */}
              <div className="relative">
                {/* Pulse ring */}
                <div className="absolute inset-0 -m-2 animate-ping rounded-full bg-white/20" />
                <div className="absolute inset-0 -m-1 animate-pulse rounded-full bg-white/30" />
                {/* Core dot */}
                <div className="relative size-4 rounded-full border-2 border-[#0a0a0a] bg-white shadow-lg shadow-white/20" />
              </div>
            </MarkerContent>
          </MapMarker>
        </Map>
      </div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

      {/* Location label */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
          Based in
        </p>
        <p className="mt-1 text-lg font-medium text-white">{label}</p>
      </div>
    </div>
  )
}
