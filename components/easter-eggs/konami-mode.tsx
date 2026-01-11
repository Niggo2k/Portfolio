"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { useEasterEggs } from "@/hooks/use-easter-eggs"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"

/**
 * Konami Mode - Unlocked with ↑↑↓↓←→←→BA
 * Shows Matrix rain effect and achievement notification
 */
export function KonamiMode() {
  const { state, unlockAchievement } = useEasterEggs()
  const { beep } = useTerminalSounds()
  const [showNotification, setShowNotification] = React.useState(false)
  const [matrixActive, setMatrixActive] = React.useState(false)
  const hasTriggeredRef = React.useRef(false)

  // Show notification and Matrix effect when Konami is unlocked
  React.useEffect(() => {
    if (state.konamiUnlocked && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      beep()
      unlockAchievement("konami")
      setShowNotification(true)
      setMatrixActive(true)

      const notifTimer = setTimeout(() => setShowNotification(false), 5000)
      const matrixTimer = setTimeout(() => setMatrixActive(false), 10000)

      return () => {
        clearTimeout(notifTimer)
        clearTimeout(matrixTimer)
      }
    }
  }, [state.konamiUnlocked, beep, unlockAchievement])

  return (
    <>
      {/* Unlock notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed left-1/2 top-4 z-[10000] -translate-x-1/2 border border-[var(--term-green)] bg-[var(--term-bg-elevated)] px-6 py-4 font-mono shadow-lg"
            style={{
              boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            <div className="crt-glow text-center text-[var(--term-green)]">
              <div className="text-xs uppercase tracking-widest text-[var(--term-amber)]">
                Achievement Unlocked
              </div>
              <div className="mt-1 text-lg font-bold">RETRO GAMER</div>
              <div className="mt-1 text-xs text-[var(--term-text-muted)]">
                You found the Konami code!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix rain effect */}
      <AnimatePresence>
        {matrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MatrixRain() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Matrix characters (mix of NICO OS text and katakana)
    const chars = "NICOOS01ニコアイウエオカキクケコサシスセソタチツテト10"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    const draw = () => {
      // Fade effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Green matrix text
      ctx.fillStyle = "#00ff41"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Random brightness for depth effect
        const brightness = Math.random() > 0.9 ? 1 : 0.5 + Math.random() * 0.3
        ctx.fillStyle = `rgba(0, 255, 65, ${brightness})`

        ctx.fillText(char, x, y)

        // Reset drop when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9995] opacity-50"
    />
  )
}
