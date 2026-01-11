"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

interface PageLoaderProps {
  children: React.ReactNode
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Minimum display time for the loader
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative flex flex-col items-center gap-8">
              {/* Animated logo/name */}
              <div className="relative overflow-hidden">
                <motion.div
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <span className="text-5xl font-bold tracking-tighter text-foreground md:text-7xl">
                    Nico
                  </span>
                </motion.div>
              </div>

              {/* Loading bar */}
              <div className="h-[2px] w-32 overflow-hidden rounded-full bg-foreground/10 md:w-48">
                <motion.div
                  className="h-full bg-accent-color"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with staggered reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  )
}
