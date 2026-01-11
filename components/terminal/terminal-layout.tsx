"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { CRTEffects, ScanlineGlitch } from "@/components/terminal/crt-effects"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"
import { cn } from "@/lib/utils"

interface NavItem {
  key: string
  label: string
  href: string
  section: string
}

const NAV_ITEMS: NavItem[] = [
  { key: "F1", label: "PROJECTS", href: "/projects", section: "projects" },
  { key: "F2", label: "PROFILE", href: "/about", section: "about" },
  { key: "F3", label: "SPECS", href: "/tech", section: "tech" },
  { key: "F4", label: "COMMS", href: "/contact", section: "contact" },
  { key: "F5", label: "THEME", href: "#theme", section: "theme" },
]

interface TerminalLayoutProps {
  children: React.ReactNode
  showNav?: boolean
  className?: string
}

/**
 * Terminal layout wrapper with CRT effects and navigation
 */
export function TerminalLayout({
  children,
  showNav = true,
  className,
}: TerminalLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { click } = useTerminalSounds()
  const [isNavVisible, setIsNavVisible] = React.useState(false)

  // Show nav after a short delay
  React.useEffect(() => {
    if (showNav) {
      const timer = setTimeout(() => setIsNavVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [showNav])

  // Determine active section from pathname
  const activeSection = React.useMemo(() => {
    if (pathname === "/") return "hero"
    return pathname.slice(1) || "hero"
  }, [pathname])

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault()
        click()
        router.push("/projects")
      } else if (e.key === "F2") {
        e.preventDefault()
        click()
        router.push("/about")
      } else if (e.key === "F3") {
        e.preventDefault()
        click()
        router.push("/tech")
      } else if (e.key === "F4") {
        e.preventDefault()
        click()
        router.push("/contact")
      } else if (e.key === "F5") {
        e.preventDefault()
        click()
        document.documentElement.classList.toggle("dark")
      } else if (e.key === "Escape") {
        e.preventDefault()
        click()
        router.push("/")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router, click])

  return (
    <CRTEffects scanlines vignette flicker className={className}>
      {/* Scanline Glitch Effect */}
      <ScanlineGlitch interval={4000} />

      {/* Scanlines grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-[9996] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <main className="relative bg-[var(--term-bg)]">
        {children}
      </main>

      {/* Fixed Navigation Bar */}
      <AnimatePresence>
        {showNav && isNavVisible && (
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-40",
              "border-t border-[var(--term-border)] bg-[var(--term-bg)]/95 backdrop-blur-sm",
              "font-[family-name:var(--font-ibm-plex-mono)]"
            )}
          >
            <div className="flex items-center justify-center gap-1 px-2 py-2 md:gap-2 md:px-4">
              {NAV_ITEMS.map((item) => (
                <NavButton
                  key={item.key}
                  keyLabel={item.key}
                  label={item.label}
                  href={item.href}
                  isActive={activeSection === item.section}
                  onClick={() => click()}
                />
              ))}

              {/* ESC key - back to home */}
              <div className="mx-2 hidden h-6 w-px bg-[var(--term-border)] md:block" />
              <NavButton
                keyLabel="ESC"
                label=""
                href="/"
                isActive={false}
                onClick={() => click()}
                className="hidden md:flex"
              />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </CRTEffects>
  )
}

interface NavButtonProps {
  keyLabel: string
  label: string
  href: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

function NavButton({
  keyLabel,
  label,
  href,
  isActive,
  onClick,
  className,
}: NavButtonProps) {
  // Handle theme toggle specially
  if (href === "#theme") {
    return (
      <button
        onClick={() => {
          onClick?.()
          document.documentElement.classList.toggle("dark")
        }}
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
            "border-[var(--term-border)] bg-[var(--term-bg-elevated)] text-[var(--term-text-muted)]",
            "group-hover:border-[var(--term-green)] group-hover:text-[var(--term-green)]"
          )}
        >
          {keyLabel}
        </span>
        {label && (
          <span
            className={cn(
              "hidden text-[10px] transition-colors duration-150 sm:inline md:text-xs",
              "text-[var(--term-text-dim)]",
              "group-hover:text-[var(--term-green)]"
            )}
          >
            {label}
          </span>
        )}
      </button>
    )
  }

  return (
    <Link
      href={href}
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
    </Link>
  )
}

/**
 * Page header for subpages
 */
export function TerminalPageHeader({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  const [time, setTime] = React.useState<string>("")

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex items-center justify-between border-b border-[var(--term-border)] bg-[var(--term-bg-elevated)]/90 px-4 py-2 backdrop-blur-sm md:px-6",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-xs text-[var(--term-green)] md:text-sm">
          {title}
        </span>
        {subtitle && (
          <>
            <span className="hidden text-[var(--term-text-muted)] md:inline">│</span>
            <span className="hidden text-xs text-[var(--term-text-muted)] md:inline">
              {subtitle}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-xs text-[var(--term-text-muted)] transition-colors hover:text-[var(--term-green)]"
        >
          [ESC] BACK
        </Link>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-xs text-[var(--term-green)] md:text-sm"
        >
          {time}
        </motion.span>
      </div>
    </motion.div>
  )
}
