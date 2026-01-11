"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { playBootSound, playBootComplete, playTypewriter, playTypewriterReturn, initAudio } from "@/lib/sounds"

interface BootSequenceProps {
  onComplete: () => void
  duration?: number
  className?: string
}

const BOOT_LINES = [
  { text: "NICO OS v1.0                        BUILD: 2000", delay: 0 },
  { text: "ROM BIOS (C) 2020 NICO SYSTEMS", delay: 80 },
  { text: "", delay: 150 },
  { text: "MEMORY CHECK: 640K OK", delay: 200 },
  { text: "DISPLAY: CRT-P31 GREEN PHOSPHOR", delay: 280 },
  { text: "", delay: 340 },
  { text: "OPERATOR INFO:", delay: 400 },
  { text: "  NAME........... NICO", delay: 480 },
  { text: "  BORN........... 2000", delay: 560 },
  { text: "  LOCATION....... STUTTGART.DE", delay: 640 },
  { text: "  ROLE........... FULL-STACK.DEV", delay: 720 },
  { text: "  ACTIVE_SINCE... 2020", delay: 800 },
  { text: "", delay: 880 },
  { text: "LOADING SYSTEM...", delay: 960 },
]

const FUN_FACTS = [
  "INIT: Coffee module loaded (3+ cups/day)",
  "INIT: Gaming subsystem ready",
  "INIT: Lo-fi beats initialized",
  "INIT: TypeScript compiler standing by",
  "INIT: Next.js framework online",
  "INIT: Creative mode engaged",
]

const FINAL_LINES = [
  { text: "> BOOT SEQUENCE COMPLETE", delay: 0 },
  { text: "> WELCOME TO NICO OS", delay: 120 },
]

export function BootSequence({
  onComplete,
  className,
}: BootSequenceProps) {
  const [phase, setPhase] = React.useState<"waiting" | "flicker" | "post" | "loading" | "final" | "complete">("waiting")
  const [visibleLines, setVisibleLines] = React.useState<number>(0)
  const [progress, setProgress] = React.useState(0)
  const [finalLines, setFinalLines] = React.useState<number>(0)
  const [funFact] = React.useState(() => FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)])

  // Handle user interaction to start boot (required for audio)
  const handleStartBoot = React.useCallback(() => {
    if (phase !== "waiting") return

    // Initialize audio context with user interaction
    initAudio()

    // Start boot sequence
    setPhase("flicker")

    // Play boot sound after a tiny delay
    setTimeout(() => {
      playBootSound()
    }, 50)
  }, [phase])

  // Listen for click or keypress to start
  React.useEffect(() => {
    if (phase !== "waiting") return

    const handleInteraction = () => {
      handleStartBoot()
    }

    window.addEventListener("click", handleInteraction)
    window.addEventListener("keydown", handleInteraction)

    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
    }
  }, [phase, handleStartBoot])

  // Phase 1: Screen flicker
  React.useEffect(() => {
    if (phase !== "flicker") return

    const flickerTimer = setTimeout(() => {
      setPhase("post")
    }, 200)
    return () => clearTimeout(flickerTimer)
  }, [phase])

  // Phase 2: POST screen lines
  React.useEffect(() => {
    if (phase !== "post") return

    const timers: NodeJS.Timeout[] = []
    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1)
        // Play typewriter sound for non-empty lines
        if (line.text.trim()) {
          playTypewriter()
        } else {
          // Play return sound for empty lines (line breaks)
          playTypewriterReturn()
        }
        if (index === BOOT_LINES.length - 1) {
          setTimeout(() => setPhase("loading"), 100)
        }
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [phase])

  // Phase 3: Loading progress bar
  React.useEffect(() => {
    if (phase !== "loading") return

    const startTime = Date.now()
    const loadDuration = 500

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / loadDuration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setPhase("final"), 100)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [phase])

  // Phase 4: Final initialization lines
  React.useEffect(() => {
    if (phase !== "final") return

    const timers: NodeJS.Timeout[] = []
    FINAL_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setFinalLines(index + 1)
        // Play typewriter sound for each final line
        playTypewriter()
        if (index === FINAL_LINES.length - 1) {
          // Play boot complete chime
          playBootComplete()
          setTimeout(() => setPhase("complete"), 400)
        }
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [phase])

  // Complete - notify parent
  React.useEffect(() => {
    if (phase === "complete") {
      const timer = setTimeout(onComplete, 200)
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 }
          }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "bg-[var(--term-bg)] font-[family-name:var(--font-ibm-plex-mono)]",
            className
          )}
        >
          {/* Waiting for user interaction */}
          {phase === "waiting" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="text-[var(--term-green)] text-lg md:text-xl mb-4 crt-glow">
                NICO OS v1.0
              </div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-[var(--term-text-muted)] text-sm"
              >
                [ Press any key or click to boot ]
              </motion.div>
              <div className="mt-8 text-[var(--term-text-dim)] text-xs">
                Audio enabled on interaction
              </div>
            </motion.div>
          )}

          {/* Screen flicker effect */}
          {phase === "flicker" && (
            <motion.div
              className="absolute inset-0 bg-[#1a1a1a]"
              animate={{
                opacity: [0, 1, 0, 1, 0, 1],
              }}
              transition={{
                duration: 0.15,
                times: [0, 0.1, 0.2, 0.3, 0.5, 1],
              }}
            />
          )}

          {/* Terminal content */}
          <div className="w-full max-w-3xl px-8">
            {/* POST Lines */}
            {(phase === "post" || phase === "loading" || phase === "final") && (
              <div className="space-y-1 text-sm md:text-base">
                {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "text-[var(--term-green)] crt-glow",
                      line.text.startsWith("NICO OS") && "text-[var(--term-text)] font-bold",
                      line.text.startsWith("  ") && "text-[var(--term-cyan)]",
                      line.text.includes("OK") && "text-[var(--term-green)]"
                    )}
                    style={{
                      textShadow: "0 0 5px var(--term-green-glow)",
                      minHeight: "1.5em"
                    }}
                  >
                    {line.text}
                  </motion.div>
                ))}

                {/* Progress bar */}
                {(phase === "loading" || phase === "final") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4"
                  >
                    {/* Fun fact during loading */}
                    <div className="text-[var(--term-amber)] text-xs mb-2 opacity-80">
                      {funFact}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--term-green)]">
                      <span>[</span>
                      <div className="relative h-4 flex-1 overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-[var(--term-green)]"
                          style={{
                            width: `${progress}%`,
                            boxShadow: "0 0 10px var(--term-green-glow)"
                          }}
                        />
                        {/* Block characters for retro look */}
                        <div className="absolute inset-0 flex">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "flex-1 border-r border-[var(--term-bg)]",
                                i < Math.floor(progress / 5) ? "bg-[var(--term-green)]" : "bg-transparent"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <span>]</span>
                      <span className="w-12 text-right">{Math.floor(progress)}%</span>
                    </div>
                  </motion.div>
                )}

                {/* Final lines */}
                {phase === "final" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 space-y-1"
                  >
                    {FINAL_LINES.slice(0, finalLines).map((line, index) => (
                      <motion.div
                        key={`final-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "text-[var(--term-green)]",
                          line.text.includes("WELCOME") && "text-xl font-bold mt-4 crt-glow"
                        )}
                        style={{
                          textShadow: line.text.includes("WELCOME")
                            ? "0 0 10px var(--term-green), 0 0 20px var(--term-green-glow)"
                            : "0 0 5px var(--term-green-glow)",
                          minHeight: "1.5em"
                        }}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Session ID at bottom */}
            {phase === "final" && finalLines >= FINAL_LINES.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-xs text-[var(--term-text-muted)]"
              >
                SESSION: {generateSessionId()} | TIMEZONE: Europe/Berlin
              </motion.div>
            )}
          </div>

          {/* Scanlines overlay */}
          <div
            className="pointer-events-none fixed inset-0 z-[9998]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0) 0px,
                rgba(0, 0, 0, 0) 1px,
                rgba(0, 0, 0, 0.1) 1px,
                rgba(0, 0, 0, 0.1) 2px
              )`,
            }}
          />

          {/* Vignette */}
          <div
            className="pointer-events-none fixed inset-0 z-[9997]"
            style={{
              background: `radial-gradient(
                ellipse at center,
                transparent 0%,
                transparent 50%,
                rgba(0, 0, 0, 0.5) 100%
              )`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function generateSessionId(): string {
  return Math.random().toString(16).slice(2, 10).toUpperCase()
}
