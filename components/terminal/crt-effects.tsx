"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CRTEffectsProps {
  children: React.ReactNode
  scanlines?: boolean
  vignette?: boolean
  flicker?: boolean
  className?: string
}

/**
 * CRT Effects wrapper component
 * Applies retro CRT monitor effects: scanlines, vignette, and subtle flicker
 */
export function CRTEffects({
  children,
  scanlines = true,
  vignette = true,
  flicker = true,
  className,
}: CRTEffectsProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen",
        className
      )}
    >
      <VHSTracking />
      {scanlines && <Scanlines intensity={0.2} flicker={flicker} />}
      {vignette && <Vignette intensity={0.4} />}
      {children}
    </div>
  )
}

/**
 * Scanlines overlay - can be used standalone
 */
export function Scanlines({ intensity = 100, className, flicker }: { intensity?: number, className?: string, flicker?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 z-9998", className, flicker && "animate-crt-flicker")}
      style={{
        background: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, 0) 0px,
          rgba(0, 0, 0, 0) 1px,
          rgba(0, 0, 0, ${intensity}) 1px,
          rgba(0, 0, 0, ${intensity}) 2px
        )`,
      }}
    />
  )
}

/**
 * Vignette overlay - darkens corners
 */
export function Vignette({ intensity = 0.4 }: { intensity?: number }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{
        background: `radial-gradient(
          ellipse at center,
          transparent 0%,
          transparent 60%,
          rgba(0, 0, 0, ${intensity}) 100%
        )`,
      }}
    />
  )
}

/**
 * VHS Tracking line effect
 */
export function VHSTracking() {
  return (
    <div className="vhs-tracking pointer-events-none fixed inset-0 z-[9999]" />
  )
}

/**
 * Chromatic aberration effect on text
 */
export function ChromaticText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn("chromatic-hover", className)}>
      {children}
    </span>
  )
}

/**
 * Glitch text effect
 * Uses data-text attribute for the glitch overlay
 */
export function GlitchText({
  children,
  className,
  text,
}: {
  children: React.ReactNode
  className?: string
  text?: string
}) {
  const textContent = text || (typeof children === "string" ? children : "")

  return (
    <span className={cn("glitch-text", className)} data-text={textContent}>
      {children}
    </span>
  )
}

/**
 * Terminal cursor - blinking block cursor
 */
export function TerminalCursor({ className }: { className?: string }) {
  return <span className={cn("terminal-cursor", className)} />
}

/**
 * CRT glow wrapper
 */
export function CRTGlow({
  children,
  color = "green",
  className,
}: {
  children: React.ReactNode
  color?: "green" | "cyan" | "amber"
  className?: string
}) {
  const glowClass = {
    green: "crt-glow",
    cyan: "crt-glow-cyan",
    amber: "crt-glow-amber",
  }[color]

  return (
    <span className={cn(glowClass, className)}>
      {children}
    </span>
  )
}

/**
 * Atari rainbow stripe decoration
 */
export function AtariStripe({ className }: { className?: string }) {
  return <div className={cn("atari-stripe", className)} />
}

/**
 * Punch card holes decoration
 */
export function PunchHoles({ className }: { className?: string }) {
  return <div className={cn("punch-holes", className)} />
}

/**
 * Status dot indicator
 */
export function StatusDot({
  status = "online",
  className,
}: {
  status?: "online" | "warning" | "offline"
  className?: string
}) {
  return <span className={cn("status-dot", status, className)} />
}

/**
 * Realistic CRT Scanline Glitch Effect
 * Based on https://github.com/unframework/threejs-crt-shader
 *
 * Features:
 * - VHS-style horizontal tearing
 * - Screen displacement/distortion
 * - Static noise in glitch bands
 * - Chromatic aberration
 * - Realistic signal interference patterns
 */
export function ScanlineGlitch({
  interval = 6000,
  className,
}: {
  interval?: number
  className?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [glitchState, setGlitchState] = React.useState<{
    active: boolean
    bands: GlitchBand[]
    screenShift: number
    noiseOpacity: number
  }>({
    active: false,
    bands: [],
    screenShift: 0,
    noiseOpacity: 0,
  })

  React.useEffect(() => {
    let animationRef: number | null = null
    let startTime: number | null = null

    const createGlitchBands = (): GlitchBand[] => {
      const bands: GlitchBand[] = []
      const numBands = 2 + Math.floor(Math.random() * 4)

      for (let i = 0; i < numBands; i++) {
        bands.push({
          y: Math.random() * 100,
          height: 2 + Math.random() * 15,
          offset: (Math.random() - 0.5) * 60,
          speed: 0.5 + Math.random() * 2,
          color: Math.random() > 0.5 ? 'cyan' : 'magenta',
          noiseIntensity: Math.random(),
        })
      }
      return bands
    }

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
        setGlitchState(prev => ({
          ...prev,
          active: true,
          bands: createGlitchBands(),
        }))
      }

      const elapsed = timestamp - startTime
      const duration = 300 + Math.random() * 400
      const progress = elapsed / duration

      if (progress >= 1) {
        setGlitchState({
          active: false,
          bands: [],
          screenShift: 0,
          noiseOpacity: 0,
        })
        animationRef = null
        return
      }

      // Update glitch intensity based on progress
      const intensity = Math.sin(progress * Math.PI) // Peak in middle
      const shake = (Math.random() - 0.5) * 8 * intensity

      setGlitchState(prev => ({
        ...prev,
        screenShift: shake,
        noiseOpacity: intensity * 0.15,
        bands: prev.bands.map(band => ({
          ...band,
          offset: band.offset + (Math.random() - 0.5) * 20 * intensity,
          y: band.y + band.speed * (Math.random() > 0.5 ? 1 : -1),
        })),
      }))

      animationRef = requestAnimationFrame(animate)
    }

    const triggerGlitch = () => {
      if (animationRef) return
      startTime = null
      animationRef = requestAnimationFrame(animate)
    }

    // Initial delay
    const initialTimeout = setTimeout(triggerGlitch, 1500)

    // Periodic glitches with some randomness
    const scheduleNext = () => {
      const nextInterval = interval * (0.7 + Math.random() * 0.6)
      return setTimeout(() => {
        triggerGlitch()
        glitchTimeout = scheduleNext()
      }, nextInterval)
    }
    let glitchTimeout = scheduleNext()

    return () => {
      clearTimeout(initialTimeout)
      clearTimeout(glitchTimeout)
      if (animationRef) cancelAnimationFrame(animationRef)
    }
  }, [interval])

  if (!glitchState.active) return null

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 z-[9999]", className)}
      style={{
        transform: `translateX(${glitchState.screenShift}px)`,
      }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: glitchState.noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Glitch bands */}
      {glitchState.bands.map((band, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 overflow-hidden"
          style={{
            top: `${band.y}%`,
            height: `${band.height}px`,
            transform: `translateX(${band.offset}px) skewX(${band.offset * 0.1}deg)`,
          }}
        >
          {/* Main glitch bar */}
          <div
            className="absolute inset-0"
            style={{
              background: band.color === 'cyan'
                ? 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), rgba(0, 255, 65, 0.3), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.4), rgba(0, 255, 65, 0.3), transparent)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Chromatic aberration layers */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(255, 0, 0, 0.15)',
              transform: 'translateX(-3px)',
              mixBlendMode: 'screen',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(0, 255, 255, 0.15)',
              transform: 'translateX(3px)',
              mixBlendMode: 'screen',
            }}
          />

          {/* Static noise within band */}
          {band.noiseIntensity > 0.5 && (
            <div
              className="absolute inset-0"
              style={{
                opacity: band.noiseIntensity * 0.5,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
              }}
            />
          )}
        </div>
      ))}

      {/* Horizontal tear lines */}
      {glitchState.bands.slice(0, 2).map((band, i) => (
        <div
          key={`tear-${i}`}
          className="absolute left-0 right-0"
          style={{
            top: `${band.y + band.height}%`,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.8) 50%, transparent 80%)',
            boxShadow: '0 0 4px rgba(0, 255, 65, 0.8)',
            transform: `translateX(${band.offset * 0.5}px)`,
          }}
        />
      ))}

      {/* Screen edge distortion */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: `
            inset ${glitchState.screenShift * 2}px 0 20px rgba(0, 255, 65, 0.1),
            inset ${-glitchState.screenShift * 2}px 0 20px rgba(255, 0, 255, 0.1)
          `,
        }}
      />
    </div>
  )
}

interface GlitchBand {
  y: number
  height: number
  offset: number
  speed: number
  color: 'cyan' | 'magenta'
  noiseIntensity: number
}

/**
 * Full-screen glitch overlay
 * Periodic screen distortion effect
 */
export function GlitchOverlay({
  intensity = "medium",
  className,
}: {
  intensity?: "low" | "medium" | "high"
  className?: string
}) {
  const [glitchPhase, setGlitchPhase] = React.useState(0)

  React.useEffect(() => {
    const intervals = {
      low: 15000,
      medium: 8000,
      high: 4000,
    }

    const triggerGlitch = () => {
      setGlitchPhase(1)
      setTimeout(() => setGlitchPhase(2), 100)
      setTimeout(() => setGlitchPhase(3), 200)
      setTimeout(() => setGlitchPhase(0), 400)
    }

    const initialDelay = setTimeout(triggerGlitch, 3000)
    const interval = setInterval(triggerGlitch, intervals[intensity])

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [intensity])

  if (glitchPhase === 0) return null

  return (
    <div
      className={cn(
        "glitch-overlay pointer-events-none fixed inset-0 z-[9999]",
        `glitch-phase-${glitchPhase}`,
        className
      )}
    />
  )
}
