"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowSquareOut } from "@phosphor-icons/react"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"
import { cn } from "@/lib/utils"
import { StatusDot, AtariStripe, PunchHoles } from "./crt-effects"
import type { Project } from "@/lib/portfolio-data"

interface ProjectFileCardProps {
  project: Project
  index: number
  className?: string
}

/**
 * Terminal-style project card with punch card aesthetic
 * Inspired by Arc Raiders / Cassette Futurism
 */
export function ProjectFileCard({ project, index, className }: ProjectFileCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const { click } = useTerminalSounds()

  const statusLabel = {
    live: "OPERATIONAL",
    wip: "IN_DEVELOPMENT",
    archived: "DECOMMISSIONED",
  }[project.status]

  const statusType = {
    live: "online" as const,
    wip: "warning" as const,
    archived: "offline" as const,
  }[project.status]

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => click()}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative block",
        "border border-[var(--term-border)] bg-[var(--term-bg-card)]",
        "transition-all duration-300",
        "hover:border-[var(--term-green)] hover:shadow-[0_0_20px_var(--term-green-subtle)]",
        className
      )}
    >
      {/* Atari Rainbow Stripe */}
      <AtariStripe />

      {/* Card Content */}
      <div className="p-4 md:p-6">
        {/* Header Row: ID and Status */}
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--term-text-muted)]">
            PROJECT ID: {project.projectId || `PRJ-${String(index + 1).padStart(3, "0")}`}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                project.status === "live" &&
                  "border-[var(--term-success)] text-[var(--term-success)]",
                project.status === "wip" &&
                  "border-[var(--term-warning)] text-[var(--term-warning)]",
                project.status === "archived" &&
                  "border-[var(--term-text-dim)] text-[var(--term-text-dim)]"
              )}
            >
              {project.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4 h-px bg-[var(--term-border)]" />

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-[1fr,auto]">
          {/* Left: Text Content */}
          <div className="space-y-3">
            {/* Name Field */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
                NAME
              </span>
              <h3 className="mt-1 text-lg font-semibold text-[var(--term-text)] transition-colors group-hover:text-[var(--term-green)] md:text-xl">
                {project.title.toUpperCase().replace(/ /g, "_")}
              </h3>
            </div>

            {/* Description Field */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--term-text-muted)]">
                DESC
              </span>
              <p className="mt-1 text-sm leading-relaxed text-[var(--term-text-muted)]">
                {project.description}
              </p>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--term-border)] bg-[var(--term-bg-elevated)] px-2 py-0.5 text-[10px] font-medium text-[var(--term-cyan)]"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Image and Meta */}
          <div className="flex flex-col gap-3">
            {/* Thumbnail with scanlines */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[var(--term-border)] md:w-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 200px"
              />
              {/* Scanlines overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 2px,
                    rgba(0, 0, 0, 0.3) 2px,
                    rgba(0, 0, 0, 0.3) 4px
                  )`,
                }}
              />
              {/* Green tint on hover */}
              <motion.div
                initial={false}
                animate={{ opacity: isHovered ? 0.2 : 0 }}
                className="absolute inset-0 bg-[var(--term-green)]"
              />
            </div>

            {/* Status and Deploy Info */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[var(--term-text-muted)]">STATUS:</span>
                <span className="flex items-center gap-1.5">
                  <StatusDot status={statusType} />
                  <span
                    className={cn(
                      project.status === "live" && "text-[var(--term-success)]",
                      project.status === "wip" && "text-[var(--term-warning)]",
                      project.status === "archived" && "text-[var(--term-text-dim)]"
                    )}
                  >
                    {statusLabel}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--term-text-muted)]">DEPLOY:</span>
                <span className="text-[var(--term-text)]">
                  {new URL(project.url).hostname.toUpperCase()}
                </span>
              </div>
              {project.year && (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--term-text-muted)]">YEAR:</span>
                  <span className="text-[var(--term-text)]">{project.year}</span>
                </div>
              )}
            </div>

            {/* Access Button */}
            <motion.div
              initial={false}
              animate={{
                backgroundColor: isHovered ? "var(--term-green-subtle)" : "transparent",
                borderColor: isHovered ? "var(--term-green)" : "var(--term-border)",
              }}
              className="flex items-center justify-center gap-2 border px-3 py-2 text-xs transition-colors"
            >
              <span
                className={cn(
                  "transition-colors",
                  isHovered ? "text-[var(--term-green)]" : "text-[var(--term-text-muted)]"
                )}
              >
                {">"} ACCESS_SYSTEM
              </span>
              <ArrowSquareOut
                className={cn(
                  "size-3.5 transition-all",
                  isHovered
                    ? "text-[var(--term-green)] translate-x-0.5 -translate-y-0.5"
                    : "text-[var(--term-text-muted)]"
                )}
                weight="bold"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Punch Card Holes */}
      <PunchHoles />

      {/* Hover glow effect */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 border border-[var(--term-green)]"
        style={{
          boxShadow: "inset 0 0 30px var(--term-green-subtle)",
        }}
      />
    </motion.a>
  )
}
