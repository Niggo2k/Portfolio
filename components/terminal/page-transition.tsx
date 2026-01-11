"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

const TRANSITION_LINES = [
  "ACCESSING SECTOR...",
  "DECRYPTING DATA STREAM...",
  "LOADING MODULE...",
  "ESTABLISHING CONNECTION...",
]

/**
 * Terminal-style page transition with loading animation
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const [displayChildren, setDisplayChildren] = React.useState(children)
  const [transitionLine, setTransitionLine] = React.useState(TRANSITION_LINES[0])
  const [progress, setProgress] = React.useState(0)
  const previousPathRef = React.useRef(pathname)

  React.useEffect(() => {
    // Only trigger transition if pathname actually changed
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname
      setIsTransitioning(true)
      setTransitionLine(TRANSITION_LINES[Math.floor(Math.random() * TRANSITION_LINES.length)])
      setProgress(0)

      // Animate progress
      const startTime = Date.now()
      const duration = 600

      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newProgress = Math.min((elapsed / duration) * 100, 100)
        setProgress(newProgress)

        if (newProgress >= 100) {
          clearInterval(progressInterval)
        }
      }, 30)

      // Complete transition
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
      }, 700)

      return () => {
        clearTimeout(timer)
        clearInterval(progressInterval)
      }
    } else {
      setDisplayChildren(children)
    }
  }, [pathname, children])

  return (
    <div className={cn("relative min-h-screen", className)}>
      {/* Page Content */}
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {displayChildren}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--term-bg)] font-[family-name:var(--font-ibm-plex-mono)]"
          >
            {/* Scan line animation */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-[var(--term-green)]"
              initial={{ top: 0, opacity: 0 }}
              animate={{
                top: ["0%", "100%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 0.6,
                ease: "linear"
              }}
              style={{
                boxShadow: "0 0 20px var(--term-green), 0 0 40px var(--term-green-glow)"
              }}
            />

            {/* Content */}
            <div className="w-full max-w-md px-8">
              {/* Terminal prompt */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4 text-sm text-[var(--term-green)]"
                style={{ textShadow: "0 0 5px var(--term-green-glow)" }}
              >
                <span className="text-[var(--term-text-muted)]">&gt;</span> {transitionLine}
                <span className="terminal-cursor ml-1" />
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-2 text-[var(--term-green)]"
              >
                <span>[</span>
                <div className="relative h-4 flex-1 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex-1 border-r border-[var(--term-bg)]",
                          i < Math.floor(progress / 5) ? "bg-[var(--term-green)]" : "bg-transparent"
                        )}
                        style={i < Math.floor(progress / 5) ? {
                          boxShadow: "0 0 4px var(--term-green-glow)"
                        } : {}}
                      />
                    ))}
                  </div>
                </div>
                <span>]</span>
                <span className="w-12 text-right text-xs">{Math.floor(progress)}%</span>
              </motion.div>

              {/* Route info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-xs text-[var(--term-text-muted)]"
              >
                NAVIGATING TO: <span className="text-[var(--term-cyan)]">{pathname.toUpperCase() || "/ROOT"}</span>
              </motion.div>
            </div>

            {/* Scanlines overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  rgba(0, 0, 0, 0) 0px,
                  rgba(0, 0, 0, 0) 1px,
                  rgba(0, 0, 0, 0.15) 1px,
                  rgba(0, 0, 0, 0.15) 2px
                )`,
              }}
            />

            {/* Vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(
                  ellipse at center,
                  transparent 0%,
                  transparent 60%,
                  rgba(0, 0, 0, 0.5) 100%
                )`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// TransitionLink is just a re-export of Next.js Link for semantic clarity
// The PageTransitionWrapper handles the actual transition animation
export { default as TransitionLink } from "next/link"
