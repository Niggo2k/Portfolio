'use client'

import * as React from 'react'
import { Suspense, useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'

// Lazy load the 3D component
const Lanyard3D = dynamic(() => import('./lanyard-3d'), { ssr: false })

// Check if WebGL is supported
function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

// Check if user prefers reduced motion
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Loading skeleton
function LanyardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-6 h-16 bg-gray-300 dark:bg-gray-700 rounded-sm" />
        <div className="w-40 h-56 bg-gray-300 dark:bg-gray-700 rounded-lg" />
      </div>
    </div>
  )
}

// Fallback for no WebGL
function LanyardFallback({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center text-gray-400', className)}>
      <p className="text-sm">3D not supported</p>
    </div>
  )
}

interface LanyardWrapperProps {
  className?: string
  eventSource?: React.RefObject<HTMLElement | null>
}

export function LanyardWrapper({ className, eventSource }: LanyardWrapperProps) {
  const [shouldRender3D, setShouldRender3D] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    const canRender3D = isWebGLSupported() && !prefersReducedMotion()
    setShouldRender3D(canRender3D)
  }, [])

  // Viewport-triggered loading with IntersectionObserver
  useEffect(() => {
    if (!isClient || !shouldRender3D || !containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px', threshold: 0 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isClient, shouldRender3D])

  // Server-side or during hydration: show skeleton
  if (!isClient) {
    return <LanyardSkeleton className={className} />
  }

  // Show fallback if 3D is not supported
  if (!shouldRender3D) {
    return <LanyardFallback className={className} />
  }

  // Show skeleton until in viewport
  if (!isInViewport) {
    return (
      <div ref={containerRef} className={className}>
        <LanyardSkeleton className="h-full" />
      </div>
    )
  }

  // Render 3D with lazy loading
  return (
    <Suspense fallback={<LanyardSkeleton className={className} />}>
      <Lanyard3D className={className} eventSource={eventSource} />
    </Suspense>
  )
}
