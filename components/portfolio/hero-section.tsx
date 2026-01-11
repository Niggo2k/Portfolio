"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "motion/react"
import {
  FolderIcon,
  GithubLogoIcon,
  XLogoIcon,
  EnvelopeIcon,
} from "@phosphor-icons/react"
import { ASCIIText, TypewriterText, TerminalLine } from "@/components/terminal"
import { StatusDot, TerminalCursor } from "@/components/terminal"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"
import { cn } from "@/lib/utils"
import FaultyTerminal from "../FaultyTerminal"

// Dynamically import the 3D grid to avoid SSR issues
const WireframeGrid = dynamic(
  () => import("@/components/three/wireframe-grid").then((mod) => mod.WireframeGrid),
  { ssr: false }
)

interface HeroSectionProps {
  onNavigate?: (section: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [time, setTime] = React.useState<string>("")
  const [showContent, setShowContent] = React.useState(false)
  const { click } = useTerminalSounds()

  // Real-time clock (German timezone)
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("de-DE", {
          timeZone: "Europe/Berlin",
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

  // Stagger content appearance
  React.useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col font-[family-name:var(--font-ibm-plex-mono)]"
    >
      {/* 3D Wireframe Grid Background */}
      {/* <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <WireframeGrid className="h-full w-full" />
      </div> */}
      {/* Scan line animation */}
      {/* <motion.div
        className="absolute left-0 right-0 h-[2px] bg-[var(--term-green)] animate-crt-flicker-subtle z-99999"
        initial={{ top: 0 }}
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          boxShadow: "0 0 20px var(--term-green), 0 0 40px var(--term-green-glow)"
        }}
      /> */}

      {/* Terminal Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between border-b border-[var(--term-border)] bg-[var(--term-bg-elevated)]/90 px-4 py-2 backdrop-blur-sm md:px-6"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs text-[var(--term-green)] md:text-sm">
            NICO OS v1.0
          </span>
          <span className="hidden text-[var(--term-text-muted)] md:inline">│</span>
          <span className="hidden text-xs text-[var(--term-text-muted)] md:inline">
            STUTTGART.DE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-[var(--term-text-muted)] sm:inline">
            SESSION ACTIVE
          </span>
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-xs text-[var(--term-green)] md:text-sm"
          >
            {time}
          </motion.span>
        </div>
      </motion.div>

      {/* Main Terminal Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 py-8 md:px-8 lg:px-16">
        {showContent && (
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="flex-1 space-y-8">
              {/* ASCII Art Name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ASCIIText text="NICO" animate delay={400} color="green" />
              </motion.div>

              {/* Status Readouts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-2 text-sm md:text-base"
              >
                <TerminalLine prefix=">" delay={1300}>
                  <span className="text-[var(--term-text-muted)]">OPERATOR:</span>{" "}
                  <span className="text-[var(--term-text)]">NICO EPP</span>
                  <TerminalCursor className="ml-1" />
                </TerminalLine>

                <TerminalLine prefix=">" delay={1500}>
                  <span className="text-[var(--term-text-muted)]">DESIGNATION:</span>{" "}
                  <span className="text-[var(--term-cyan)]">FULL.STACK.DEVELOPER</span>
                </TerminalLine>

                <TerminalLine prefix=">" delay={1700}>
                  <span className="text-[var(--term-text-muted)]">LOCATION:</span>{" "}
                  <span className="text-[var(--term-text)]">NEAR-BY.STUTTGART.SECTOR.DE</span>
                </TerminalLine>

                <TerminalLine prefix=">" delay={2100}>
                  <span className="text-[var(--term-text-muted)]">STACK:</span>{" "}
                  <span className="text-[var(--term-amber)]">REACT</span>
                  <span className="text-[var(--term-text-muted)]"> / </span>
                  <span className="text-[var(--term-amber)]">NEXT.JS</span>
                  <span className="text-[var(--term-text-muted)]"> / </span>
                  <span className="text-[var(--term-amber)]">TYPESCRIPT</span>
                  <span className="text-[var(--term-text-muted)]"> / </span>
                  <span className="text-[var(--term-amber)]">TAILWIND CSS</span>
                </TerminalLine>

                <TerminalLine prefix=">" delay={2300}>
                  <span className="text-[var(--term-text-muted)]">EXPERIENCE:</span>{" "}
                  <span className="text-[var(--term-text)]">4+ YEARS</span>
                </TerminalLine>
              </motion.div>

              {/* Mission Brief Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 }}
                className="max-w-xl border border-[var(--term-border)] bg-[var(--term-bg-card)] p-4 md:p-6"
              >
                <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--term-text-muted)]">
                  ─ MISSION BRIEF
                </div>
                <p className="text-sm leading-relaxed text-[var(--term-text)] md:text-base">
                  <TypewriterText
                    text="Crafting digital experiences with care. Building products that solve real problems and make people's lives easier."
                    delay={3000}
                    speed={30}
                    cursor={false}
                  />
                </p>
              </motion.div>
            </div>

            {/* Right Column - Directory Folders & Socials */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.5 }}
              className="flex flex-col gap-6 lg:w-64"
            >
              {/* Folder Header */}
              <div className="text-xs uppercase tracking-[0.2em] text-[var(--term-text-muted)]">
                ─ FILE SYSTEM
              </div>

              {/* Folder Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "F1", label: "projects", href: "/projects", color: "amber" },
                  { key: "F2", label: "about", href: "/about", color: "cyan" },
                  { key: "F3", label: "tech", href: "/tech", color: "green" },
                  { key: "F4", label: "contact", href: "/contact", color: "magenta" },
                ].map((folder) => (
                  <Link
                    key={folder.key}
                    href={folder.href}
                    onClick={() => click()}
                    className={cn(
                      "group flex flex-col items-center gap-2 rounded-none border border-[var(--term-border)] bg-[var(--term-bg-card)] p-4 transition-all duration-200",
                      "hover:border-[var(--term-green)] hover:bg-[var(--term-bg-elevated)]"
                    )}
                  >
                    <FolderIcon
                      weight="duotone"
                      className={cn(
                        "size-8 transition-colors",
                        folder.color === "amber" && "text-[var(--term-amber)]",
                        folder.color === "cyan" && "text-[var(--term-cyan)]",
                        folder.color === "green" && "text-[var(--term-green)]",
                        folder.color === "magenta" && "text-[var(--term-magenta)]"
                      )}
                    />
                    <div className="text-center">
                      <span className="block text-xs text-[var(--term-text)] group-hover:text-[var(--term-green)]">
                        {folder.label}/
                      </span>
                      <span className="block text-[10px] text-[var(--term-text-muted)]">
                        [{folder.key}]
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Socials */}
              <div className="space-y-2">
                <span className="block text-xs uppercase tracking-[0.2em] text-[var(--term-text-muted)]">
                  ─ LINKS
                </span>
                <div className="flex gap-2">
                  {[
                    { icon: () => <svg viewBox="0 0 1024 1024" fill="none" className="size-4"><path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="currentColor" /></svg>, },
                    { icon: XLogoIcon, href: "https://x.com/made_by_nico", label: "Twitter/X" },
                    { icon: EnvelopeIcon, href: "mailto:hello@nico.dev", label: "Email" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.label === "Email" ? undefined : "_blank"}
                      rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                      onClick={() => click()}
                      className={cn(
                        "flex size-10 items-center justify-center border border-[var(--term-border)] bg-[var(--term-bg-card)] transition-all duration-200",
                        "text-[var(--term-text-muted)] hover:border-[var(--term-green)] hover:bg-[var(--term-bg-elevated)] hover:text-[var(--term-green)]"
                      )}
                    >
                      <social.icon className="size-5" weight="bold" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.8 }}
        className="relative z-10 border-t border-[var(--term-border)] bg-[var(--term-bg-elevated)]/90 px-4 py-3 backdrop-blur-sm md:px-6"
      >
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[var(--term-text-muted)]">
              OPERATOR: <span className="text-[var(--term-cyan)]">NICO</span>
            </span>
            <span className="hidden text-[var(--term-text-muted)] sm:inline">│</span>
            <span className="hidden text-[var(--term-text-muted)] sm:inline">
              TIMEZONE: <span className="text-[var(--term-green)]">Europe/Berlin</span>
            </span>
          </div>

          {/* Navigation indicator */}
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 text-[var(--term-text-muted)]"
          >
            <span className="hidden sm:inline">SYSTEM READY</span>
            <span className="sm:hidden">READY</span>
          </motion.div>

          <div className="hidden items-center gap-2 text-[var(--term-text-muted)] md:flex">
            <span>SINCE:</span>
            <span className="text-[var(--term-text)]">2020</span>
          </div>
        </div>
      </motion.div>

      {/* Decorative corner brackets */}
      <div className="pointer-events-none absolute left-4 top-16 text-[var(--term-border)] md:left-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M4 4 L4 12 M4 4 L12 4" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-16 right-4 text-[var(--term-border)] md:right-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M20 20 L20 12 M20 20 L12 20" />
        </svg>
      </div>
    </section>
  )
}
