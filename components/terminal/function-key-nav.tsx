"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"
import { cn } from "@/lib/utils"

interface NavItem {
  key: string
  label: string
  section: string
}

const NAV_ITEMS: NavItem[] = [
  { key: "F1", label: "PROJECTS", section: "projects" },
  { key: "F2", label: "PROFILE", section: "about" },
  { key: "F3", label: "SPECS", section: "tech" },
  { key: "F4", label: "COMMS", section: "contact" },
  { key: "F5", label: "THEME", section: "theme" },
]

interface FunctionKeyNavProps {
  activeSection?: string
  onNavigate?: (section: string) => void
  onThemeToggle?: () => void
  className?: string
  visible?: boolean
}

export function FunctionKeyNav({
  activeSection,
  onNavigate,
  onThemeToggle,
  className,
  visible = true,
}: FunctionKeyNavProps) {
  const { click } = useTerminalSounds()

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for F1-F5 keys
      if (e.key === "F1") {
        e.preventDefault()
        click()
        onNavigate?.("projects")
      } else if (e.key === "F2") {
        e.preventDefault()
        click()
        onNavigate?.("about")
      } else if (e.key === "F3") {
        e.preventDefault()
        click()
        onNavigate?.("tech")
      } else if (e.key === "F4") {
        e.preventDefault()
        click()
        onNavigate?.("contact")
      } else if (e.key === "F5") {
        e.preventDefault()
        click()
        onThemeToggle?.()
      } else if (e.key === "Escape") {
        e.preventDefault()
        click()
        onNavigate?.("hero")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onNavigate, onThemeToggle, click])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40",
            "border-t border-[var(--term-border)] bg-[var(--term-bg)]/95 backdrop-blur-sm",
            "font-[family-name:var(--font-ibm-plex-mono)]",
            className
          )}
        >
          <div className="flex items-center justify-center gap-1 px-2 py-2 md:gap-2 md:px-4">
            {NAV_ITEMS.map((item) => (
              <FunctionKey
                key={item.key}
                keyLabel={item.key}
                label={item.label}
                isActive={activeSection === item.section}
                onClick={() => {
                  click()
                  if (item.section === "theme") {
                    onThemeToggle?.()
                  } else {
                    onNavigate?.(item.section)
                  }
                }}
              />
            ))}

            {/* ESC key */}
            <div className="mx-2 hidden h-6 w-px bg-[var(--term-border)] md:block" />
            <FunctionKey
              keyLabel="ESC"
              label=""
              isActive={false}
              onClick={() => {
                click()
                onNavigate?.("hero")
              }}
              className="hidden md:flex"
            />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

interface FunctionKeyProps {
  keyLabel: string
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

function FunctionKey({
  keyLabel,
  label,
  isActive,
  onClick,
  className,
}: FunctionKeyProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 transition-all duration-150",
        "group",
        className
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center",
          "min-w-[2rem] px-1.5 py-1 text-[10px] md:min-w-[2.5rem] md:px-2 md:text-xs",
          "border transition-all duration-150",
          isActive
            ? "border-[var(--term-green)] bg-[var(--term-green)] text-[var(--term-bg)]"
            : "border-[var(--term-border)] bg-[var(--term-bg-elevated)] text-[var(--term-text-muted)]",
          "group-hover:border-[var(--term-green)] group-hover:text-[var(--term-green)]",
          isActive && "group-hover:bg-[var(--term-green)] group-hover:text-[var(--term-bg)]"
        )}
      >
        {keyLabel}
      </span>
      {label && (
        <span
          className={cn(
            "hidden text-[10px] transition-colors duration-150 sm:inline md:text-xs",
            isActive ? "text-[var(--term-green)]" : "text-[var(--term-text-dim)]",
            "group-hover:text-[var(--term-green)]"
          )}
        >
          {label}
        </span>
      )}
    </button>
  )
}

/**
 * Scroll progress indicator for the terminal
 */
export function ScrollProgress({ progress = 0 }: { progress: number }) {
  const blocks = 20
  const filledBlocks = Math.floor((progress / 100) * blocks)

  return (
    <div className="flex items-center gap-2 text-xs text-[var(--term-text-muted)]">
      <span>[</span>
      <div className="flex">
        {Array.from({ length: blocks }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-1.5 text-center",
              i < filledBlocks ? "text-[var(--term-green)]" : "text-[var(--term-border)]"
            )}
          >
            {i < filledBlocks ? "█" : "░"}
          </span>
        ))}
      </div>
      <span>]</span>
      <span className="w-8 text-right">{Math.floor(progress)}%</span>
    </div>
  )
}
