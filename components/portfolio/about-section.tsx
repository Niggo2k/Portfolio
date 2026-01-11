"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Map, MapMarker, MarkerContent } from "@/components/ui/map"
import { AtariStripe, StatusDot } from "@/components/terminal"
import { cn } from "@/lib/utils"

interface AboutSectionProps {
  latitude: number
  longitude: number
  zoom?: number
}

// Convert decimal coordinates to DMS format
function toDMS(coord: number, isLat: boolean): string {
  const absolute = Math.abs(coord)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60)
  const direction = isLat ? (coord >= 0 ? "N" : "S") : coord >= 0 ? "E" : "W"
  return `${degrees}°${minutes}'${seconds}"${direction}`
}

export function AboutSection({ latitude, longitude, zoom = 11 }: AboutSectionProps) {
  const [scanAngle, setScanAngle] = React.useState(0)

  // Radar scan animation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative px-4 py-16 font-[family-name:var(--font-ibm-plex-mono)] md:px-8 md:py-24 lg:px-16">
      {/* Personnel File Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="border border-[var(--term-border)] bg-[var(--term-bg-elevated)]">
          {/* Atari stripe */}
          <AtariStripe />

          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-lg text-[var(--term-green)]">▓▓</span>
              <span className="text-sm text-[var(--term-text)] md:text-base">
                PERSONNEL FILE - CLASSIFIED LEVEL: PUBLIC
              </span>
              <span className="text-lg text-[var(--term-green)]">▓▓</span>
            </div>
            <span className="hidden text-xs text-[var(--term-text-muted)] md:inline">
              LAST_UPDATED: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short" }).toUpperCase()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Subject Info */}
        <div className="space-y-6">
          {/* Subject Header Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-[var(--term-border)] bg-[var(--term-bg-card)] p-6"
          >
            <div className="flex flex-col gap-6 sm:flex-row">
              {/* Photo placeholder with scanlines */}
              <div className="relative mx-auto size-32 shrink-0 overflow-hidden border border-[var(--term-border)] sm:mx-0">
                {/* Placeholder avatar */}
                <div className="flex h-full w-full items-center justify-center bg-[var(--term-bg-elevated)]">
                  <span className="text-4xl text-[var(--term-green-dim)]">N</span>
                </div>
                {/* Scanlines overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent 0px,
                      transparent 2px,
                      rgba(0, 255, 65, 0.03) 2px,
                      rgba(0, 255, 65, 0.03) 4px
                    )`,
                  }}
                />
                {/* Corner decorations */}
                <div className="absolute left-1 top-1 h-3 w-3 border-l border-t border-[var(--term-green)]" />
                <div className="absolute right-1 top-1 h-3 w-3 border-r border-t border-[var(--term-green)]" />
                <div className="absolute bottom-1 left-1 h-3 w-3 border-b border-l border-[var(--term-green)]" />
                <div className="absolute bottom-1 right-1 h-3 w-3 border-b border-r border-[var(--term-green)]" />
              </div>

              {/* Subject details */}
              <div className="flex-1 space-y-3 text-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
                    SUBJECT
                  </span>
                  <p className="mt-1 text-xl font-bold text-[var(--term-text)]">NICO</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
                      ID
                    </span>
                    <p className="mt-0.5 text-[var(--term-cyan)]">OPR-2020-DE-001</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
                      CLEARANCE
                    </span>
                    <p className="mt-0.5 text-[var(--term-green)]">DEVELOPER.FULL</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
                    HOME.SECTOR
                  </span>
                  <p className="mt-0.5 text-[var(--term-text)]">STUTTGART.DE</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
                    RECRUITMENT.DATE
                  </span>
                  <p className="mt-0.5 text-[var(--term-text)]">2020</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subject Brief */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="border border-[var(--term-border)] bg-[var(--term-bg-card)] p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-xs">
              <span className="text-[var(--term-green)]">█</span>
              <span className="uppercase tracking-widest text-[var(--term-text-muted)]">
                SUBJECT BRIEF
              </span>
            </div>
            <div className="h-px bg-[var(--term-border)]" />
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--term-text-muted)]">
              <p>
                <span className="text-[var(--term-green)]">{">"}</span> Software developer based in Stuttgart, Germany. Specializes in building products that solve real problems and make people&apos;s lives easier.
              </p>
              <p>
                <span className="text-[var(--term-green)]">{">"}</span> Currently focused on web development, indie hacking, and exploring the intersection of design and engineering.
              </p>
            </div>
          </motion.div>

          {/* Operational Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="border border-[var(--term-border)] bg-[var(--term-bg-card)] p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-xs">
              <span className="text-[var(--term-cyan)]">█</span>
              <span className="uppercase tracking-widest text-[var(--term-text-muted)]">
                OPERATIONAL METRICS
              </span>
            </div>
            <div className="h-px bg-[var(--term-border)]" />

            <div className="mt-4 grid grid-cols-3 gap-4">
              <MetricGauge label="PROJECTS_SHIPPED" value={3} max={10} suffix="+" />
              <MetricGauge label="YEARS_ACTIVE" value={4} max={10} suffix="+" />
              <MetricGauge label="IDEAS_QUEUED" value={99} max={99} suffix="+" isInfinite />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Location Intel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="border border-[var(--term-border)] bg-[var(--term-bg-card)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--term-border)] px-4 py-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[var(--term-green)]">█</span>
              <span className="uppercase tracking-widest text-[var(--term-text-muted)]">
                LOCATION INTEL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status="online" />
              <span className="text-[10px] text-[var(--term-success)]">SIGNAL_ACTIVE</span>
            </div>
          </div>

          {/* Radar-style map */}
          <div className="relative aspect-square md:aspect-[4/3]">
            {/* Map */}
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
              >
                <MapMarker latitude={latitude} longitude={longitude}>
                  <MarkerContent>
                    <div className="relative">
                      {/* Radar ping animation */}
                      <div className="absolute inset-0 -m-6 animate-ping rounded-full border border-[var(--term-green)] opacity-20" />
                      <div className="absolute inset-0 -m-4 animate-pulse rounded-full border border-[var(--term-green)] opacity-40" />
                      <div className="absolute inset-0 -m-2 rounded-full border border-[var(--term-green)] opacity-60" />
                      {/* Center dot */}
                      <div className="relative size-3 rounded-full bg-[var(--term-green)] shadow-[0_0_10px_var(--term-green)]" />
                    </div>
                  </MarkerContent>
                </MapMarker>
              </Map>
            </div>

            {/* Green tint overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[var(--term-green)]/5" />

            {/* Grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(var(--term-green) 1px, transparent 1px),
                  linear-gradient(90deg, var(--term-green) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Radar scan line */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden"
              style={{
                background: `conic-gradient(
                  from ${scanAngle}deg at 50% 50%,
                  transparent 0deg,
                  var(--term-green) 5deg,
                  transparent 30deg
                )`,
                opacity: 0.15,
              }}
            />

            {/* Scanlines */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 2px,
                  rgba(0, 0, 0, 0.1) 2px,
                  rgba(0, 0, 0, 0.1) 4px
                )`,
              }}
            />

            {/* Corner brackets */}
            <div className="pointer-events-none absolute inset-4">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[var(--term-green)]" />
              <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[var(--term-green)]" />
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[var(--term-green)]" />
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[var(--term-green)]" />
            </div>

            {/* Vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          </div>

          {/* Coordinates footer */}
          <div className="border-t border-[var(--term-border)] px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-[var(--term-text-muted)]">LAT:</span>{" "}
                  <span className="font-mono text-[var(--term-green)]">{toDMS(latitude, true)}</span>
                </div>
                <div>
                  <span className="text-[var(--term-text-muted)]">LON:</span>{" "}
                  <span className="font-mono text-[var(--term-green)]">{toDMS(longitude, false)}</span>
                </div>
              </div>
              <div className="text-[var(--term-text)]">
                STUTTGART, GERMANY
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative corners */}
      <div className="pointer-events-none absolute left-4 top-4 text-[var(--term-border)] md:left-8 md:top-8">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 1 L1 8 M1 1 L8 1" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 text-[var(--term-border)] md:bottom-8 md:right-8">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M19 19 L19 12 M19 19 L12 19" />
        </svg>
      </div>
    </section>
  )
}

/**
 * Metric gauge component for operational stats
 */
function MetricGauge({
  label,
  value,
  max,
  suffix = "",
  isInfinite = false,
}: {
  label: string
  value: number
  max: number
  suffix?: string
  isInfinite?: boolean
}) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="text-center">
      {/* Value */}
      <div className="mb-2 text-2xl font-bold text-[var(--term-cyan)] md:text-3xl">
        {isInfinite ? "∞" : value}
        {!isInfinite && suffix}
      </div>

      {/* Progress bar */}
      <div className="mx-auto mb-2 h-1.5 w-full max-w-[80px] overflow-hidden bg-[var(--term-border)]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className={cn(
            "h-full",
            isInfinite ? "bg-[var(--term-magenta)]" : "bg-[var(--term-cyan)]"
          )}
        />
      </div>

      {/* Label */}
      <div className="text-[9px] uppercase tracking-wider text-[var(--term-text-muted)]">
        {label}
      </div>
    </div>
  )
}
