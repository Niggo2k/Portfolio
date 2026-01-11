"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

// ASCII art font for the name - Block style
const ASCII_FONT: Record<string, string[]> = {
  N: [
    "███╗   ██╗",
    "████╗  ██║",
    "██╔██╗ ██║",
    "██║╚██╗██║",
    "██║ ╚████║",
    "╚═╝  ╚═══╝",
  ],
  I: [
    "██╗",
    "██║",
    "██║",
    "██║",
    "██║",
    "╚═╝",
  ],
  C: [
    " ██████╗",
    "██╔═══╝",
    "██║     ",
    "██║     ",
    "╚██████╗",
    " ╚══════╝",
  ],
  O: [
    "  ██████╗ ",
    " ██╔═══██╗",
    "  ██║     ██║",
    "  ██║     ██║",
    "╚██████╔╝",
    " ╚═════╝ ",
  ],
  " ": [
    "   ",
    "   ",
    "   ",
    "   ",
    "   ",
    "   ",
  ],
}

interface ASCIITextProps {
  text: string
  className?: string
  animate?: boolean
  delay?: number
  color?: "green" | "cyan" | "amber"
}

/**
 * Renders text as ASCII art with optional typewriter animation
 */
export function ASCIIText({
  text,
  className,
  animate = true,
  delay = 0,
  color = "green",
}: ASCIITextProps) {
  const [visibleChars, setVisibleChars] = React.useState(animate ? 0 : text.length)
  const lines = 7// Number of lines in our ASCII font

  React.useEffect(() => {
    if (!animate) return

    const chars = text.toUpperCase().split("")
    let currentChar = 0

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentChar++
        setVisibleChars(currentChar)

        if (currentChar >= chars.length) {
          clearInterval(interval)
        }
      }, 150) // Speed of character reveal

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [animate, delay, text])

  const colorClass = {
    green: "text-[var(--term-green)]",
    cyan: "text-[var(--term-cyan)]",
    amber: "text-[var(--term-amber)]",
  }[color]

  const glowStyle = {
    green: "drop-shadow-[0_0_10px_var(--term-green-glow)]",
    cyan: "drop-shadow-[0_0_10px_var(--term-cyan-glow)]",
    amber: "drop-shadow-[0_0_10px_var(--term-amber-glow)]",
  }[color]

  const chars = text.toUpperCase().split("")

  return (
    <div
      className={cn(
        "font-mono text-[0.5rem] leading-none sm:text-[0.6rem] md:text-xs lg:text-sm",
        colorClass,
        glowStyle,
        className
      )}
      style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
    >
      {Array.from({ length: lines }).map((_, lineIndex) => (
        <div key={lineIndex} className="flex whitespace-pre">
          {chars.slice(0, visibleChars).map((char, charIndex) => {
            const asciiChar = ASCII_FONT[char]
            if (!asciiChar) return null
            return (
              <React.Fragment key={`${charIndex}-${lineIndex}`}>
                <motion.span
                  initial={animate ? { opacity: 0 } : { opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {asciiChar[lineIndex]}
                </motion.span>
                {/* Add spacing between letters */}
                {charIndex < visibleChars - 1 && <span>  </span>}
              </React.Fragment>
            )
          })}
        </div>
      ))}
    </div>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number
  onComplete?: () => void
  cursor?: boolean
}

/**
 * Typewriter effect for regular text
 */
export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 50,
  onComplete,
  cursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = React.useState("")
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const startTyping = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalId)
          setIsComplete(true)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(intervalId)
    }

    timeoutId = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [text, delay, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      {cursor && !isComplete && (
        <span className="terminal-cursor ml-0.5" />
      )}
      {cursor && isComplete && (
        <span className="terminal-cursor ml-0.5 animate-pulse" />
      )}
    </span>
  )
}

interface TerminalLineProps {
  children: React.ReactNode
  prefix?: string
  className?: string
  delay?: number
}

/**
 * A single terminal line with optional prefix
 */
export function TerminalLine({
  children,
  prefix = ">",
  className,
  delay = 0,
}: TerminalLineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.3 }}
      className={cn("flex items-center gap-2", className)}
    >
      <span className="text-[var(--term-green-dim)]">{prefix}</span>
      <span>{children}</span>
    </motion.div>
  )
}

interface TerminalBlockProps {
  children: React.ReactNode
  title?: string
  className?: string
}

/**
 * A bordered terminal block/box
 */
export function TerminalBlock({
  children,
  title,
  className,
}: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "border border-[var(--term-border)] bg-[var(--term-bg-elevated)] p-4",
        className
      )}
    >
      {title && (
        <div className="mb-2 text-xs uppercase tracking-widest text-[var(--term-text-muted)]">
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
