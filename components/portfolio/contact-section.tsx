"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  GithubLogo,
  XLogo,
  EnvelopeSimple,
  ArrowSquareOut,
  Copy,
  Check,
} from "@phosphor-icons/react"
import { AtariStripe, StatusDot, TerminalCursor } from "@/components/terminal"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"
import { cn } from "@/lib/utils"
import type { SocialLink } from "@/lib/portfolio-data"

interface ContactSectionProps {
  email: string
  socialLinks: SocialLink[]
}

const socialIcons = {
  github: GithubLogo,
  twitter: XLogo,
  email: EnvelopeSimple,
}

const channelLabels = {
  github: "GITHUB.COM",
  twitter: "X.COM",
  email: "MAILTO",
}

function SignalStrength({ strength = 85 }: { strength?: number }) {
  const bars = 12
  const filledBars = Math.round((strength / 100) * bars)

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-[var(--term-text-muted)]">SIGNAL:</span>
      <div className="flex gap-0.5">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "h-3 w-1",
              i < filledBars ? "bg-[var(--term-green)]" : "bg-[var(--term-border)]"
            )}
          />
        ))}
      </div>
      <span className={cn(
        "uppercase",
        strength > 70 ? "text-[var(--term-success)]" :
        strength > 40 ? "text-[var(--term-warning)]" :
        "text-[var(--term-error)]"
      )}>
        {strength > 70 ? "STRONG" : strength > 40 ? "MODERATE" : "WEAK"}
      </span>
    </div>
  )
}

function ChannelCard({ link, index }: { link: SocialLink; index: number }) {
  const Icon = socialIcons[link.platform]
  const [isHovered, setIsHovered] = React.useState(false)
  const label = channelLabels[link.platform]
  const { click } = useTerminalSounds()

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => click()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative border border-[var(--term-border)] bg-[var(--term-bg-card)]",
        "transition-all duration-300",
        "hover:border-[var(--term-cyan)] hover:shadow-[0_0_15px_var(--term-cyan-subtle)]"
      )}
    >
      {/* Channel header */}
      <div className="flex items-center justify-between border-b border-[var(--term-border)] px-4 py-2">
        <span className="font-mono text-[10px] text-[var(--term-text-muted)]">
          CH_{String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          <StatusDot status="online" />
          <span className="text-[10px] text-[var(--term-success)]">ACTIVE</span>
        </div>
      </div>

      {/* Channel content */}
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className={cn(
            "flex size-12 items-center justify-center border border-[var(--term-border)] bg-[var(--term-bg-elevated)]",
            "transition-all duration-300",
            isHovered && "border-[var(--term-cyan)] shadow-[0_0_10px_var(--term-cyan-subtle)]"
          )}>
            <Icon
              className={cn(
                "size-6 transition-colors",
                isHovered ? "text-[var(--term-cyan)]" : "text-[var(--term-text-muted)]"
              )}
              weight="regular"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h4 className={cn(
              "text-sm font-semibold uppercase tracking-wide transition-colors",
              isHovered ? "text-[var(--term-cyan)]" : "text-[var(--term-text)]"
            )}>
              {link.label}
            </h4>
            <span className="text-xs text-[var(--term-text-muted)]">{label}</span>
          </div>

          {/* Connect button */}
          <div className={cn(
            "flex items-center gap-2 border px-3 py-2 text-xs transition-all",
            isHovered
              ? "border-[var(--term-cyan)] bg-[var(--term-cyan-subtle)] text-[var(--term-cyan)]"
              : "border-[var(--term-border)] text-[var(--term-text-muted)]"
          )}>
            <span>{">"} CONNECT</span>
            <ArrowSquareOut
              className={cn(
                "size-3.5 transition-transform",
                isHovered && "translate-x-0.5 -translate-y-0.5"
              )}
              weight="bold"
            />
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 border border-[var(--term-cyan)]"
        style={{
          boxShadow: "inset 0 0 20px var(--term-cyan-subtle)",
        }}
      />
    </motion.a>
  )
}

function EmailTerminal({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false)
  const { click, beep } = useTerminalSounds()

  const handleCopy = async () => {
    click()
    await navigator.clipboard.writeText(email)
    setCopied(true)
    beep() // Confirmation beep
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
      className="border border-[var(--term-border)] bg-[var(--term-bg-card)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--term-border)] px-4 py-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--term-magenta)]">█</span>
          <span className="uppercase tracking-widest text-[var(--term-text-muted)]">
            PRIMARY_CHANNEL
          </span>
        </div>
        <span className="text-[10px] text-[var(--term-text-dim)]">ENCRYPTED</span>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Email display */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
              TRANSMISSION_ADDRESS
            </span>
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-3"
            >
              <EnvelopeSimple className="size-5 text-[var(--term-magenta)]" weight="bold" />
              <span className="text-lg font-semibold text-[var(--term-text)] transition-colors group-hover:text-[var(--term-magenta)] md:text-xl">
                {email}
              </span>
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-2 border px-4 py-2 text-xs transition-all",
                copied
                  ? "border-[var(--term-success)] bg-[var(--term-success)]/10 text-[var(--term-success)]"
                  : "border-[var(--term-border)] text-[var(--term-text-muted)] hover:border-[var(--term-magenta)] hover:text-[var(--term-magenta)]"
              )}
            >
              {copied ? (
                <>
                  <Check className="size-4" weight="bold" />
                  COPIED
                </>
              ) : (
                <>
                  <Copy className="size-4" weight="bold" />
                  COPY
                </>
              )}
            </button>
            <a
              href={`mailto:${email}`}
              onClick={() => click()}
              className="flex items-center gap-2 border border-[var(--term-magenta)] bg-[var(--term-magenta)]/10 px-4 py-2 text-xs text-[var(--term-magenta)] transition-all hover:bg-[var(--term-magenta)]/20"
            >
              {">"} OPEN_CHANNEL
              <ArrowSquareOut className="size-4" weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ContactSection({ email, socialLinks }: ContactSectionProps) {
  return (
    <section className="relative px-4 py-16 font-[family-name:var(--font-ibm-plex-mono)] md:px-8 md:py-24 lg:px-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="border border-[var(--term-border)] bg-[var(--term-bg-elevated)]">
          {/* Atari stripe */}
          <AtariStripe />

          {/* Header bar */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-lg text-[var(--term-magenta)]">▓▓</span>
              <span className="text-sm text-[var(--term-text)] md:text-base">
                COMMUNICATIONS TERMINAL
              </span>
              <span className="text-lg text-[var(--term-magenta)]">▓▓</span>
            </div>
            <SignalStrength strength={92} />
          </div>
        </div>
      </motion.div>

      {/* Section Title & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-12 space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--term-green-dim)]">
          {">"} INITIATE_CONTACT
        </p>
        <h2 className="text-2xl font-bold text-[var(--term-text)] md:text-4xl lg:text-5xl">
          LET&apos;S_BUILD
          <br />
          <span className="text-[var(--term-text-muted)]">SOMETHING_TOGETHER</span>
          <TerminalCursor className="ml-2 inline-block" />
        </h2>
        <p className="max-w-lg text-sm text-[var(--term-text-muted)]">
          Ready to collaborate on your next project? Open a communication channel and let&apos;s discuss.
        </p>
      </motion.div>

      {/* Primary Email Channel */}
      <div className="mb-8">
        <EmailTerminal email={email} />
      </div>

      {/* External Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="mb-4 flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-[var(--term-cyan)]">
            █ EXTERNAL_CHANNELS
          </span>
          <div className="h-px flex-1 bg-[var(--term-border)]" />
          <span className="text-[10px] text-[var(--term-text-dim)]">
            {socialLinks.length} AVAILABLE
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {socialLinks.map((link, index) => (
            <ChannelCard key={link.platform} link={link} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="border-t border-[var(--term-border)] pt-8"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* System info */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-[var(--term-text-dim)]">
            <span>SYSTEM: TERM-01</span>
            <span>|</span>
            <span>MODEL: PORTFOLIO.v2</span>
            <span>|</span>
            <span>OPERATOR: NICO EPP</span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[var(--term-text-muted)]">
            <span className="text-[var(--term-green)]">{">"}</span> BUILT_BY_NICO © {new Date().getFullYear()}
          </div>
        </div>

        {/* Decorative bottom line */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-[var(--term-text-dim)]">
          <span>─────────────</span>
          <span>END_TRANSMISSION</span>
          <span>─────────────</span>
        </div>
      </motion.div>

      {/* Decorative corner elements */}
      <div className="pointer-events-none absolute left-4 top-4 text-[var(--term-border)] md:left-8 md:top-8">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1 1 L1 8 M1 1 L8 1" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 text-[var(--term-border)] md:bottom-8 md:right-8">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M19 19 L19 12 M19 19 L12 19" />
        </svg>
      </div>
    </section>
  )
}
