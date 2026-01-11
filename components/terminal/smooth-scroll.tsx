"use client"

import * as React from "react"
import Lenis from "lenis"

interface SmoothScrollProps {
  children: React.ReactNode
}

const LenisContext = React.createContext<Lenis | null>(null)

export function useLenis() {
  return React.useContext(LenisContext)
}

/**
 * Smooth scroll provider using Lenis
 * Wraps children with Lenis smooth scrolling
 */
export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = React.useState<Lenis | null>(null)

  React.useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    setLenis(lenisInstance)

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

/**
 * Hook to scroll to a specific section
 */
export function useScrollTo() {
  const lenis = useLenis()

  return React.useCallback(
    (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
      if (!lenis) return

      lenis.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration ?? 1.2,
      })
    },
    [lenis]
  )
}

/**
 * Hook to stop/start smooth scrolling
 */
export function useScrollControl() {
  const lenis = useLenis()

  const stop = React.useCallback(() => {
    lenis?.stop()
  }, [lenis])

  const start = React.useCallback(() => {
    lenis?.start()
  }, [lenis])

  return { stop, start }
}
