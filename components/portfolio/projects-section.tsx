"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ProjectFileCard } from "@/components/terminal"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/portfolio-data"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = React.useState<"all" | "live" | "wip">("all")
  const { click, clickSoft } = useTerminalSounds()

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    return project.status === filter
  })

  const stats = {
    total: projects.length,
    live: projects.filter((p) => p.status === "live").length,
    wip: projects.filter((p) => p.status === "wip").length,
  }

  return (
    <section className="relative px-4 py-16 font-[family-name:var(--font-ibm-plex-mono)] md:px-8 md:py-24 lg:px-16">
      {/* Section Header - Database Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 md:mb-12"
      >
        {/* Terminal-style header bar */}
        <div className="mb-6 border border-[var(--term-border)] bg-[var(--term-bg-elevated)]">
          <div className="flex items-center justify-between border-b border-[var(--term-border)] px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-[var(--term-green)]">█</span>
              <span className="text-sm text-[var(--term-text)] md:text-base">
                PROJECT ARCHIVE DATABASE
              </span>
            </div>
            <span className="text-xs text-[var(--term-text-muted)]">
              v1.0.{stats.total}
            </span>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 px-4 py-3 text-xs md:gap-8">
            <div className="flex items-center gap-2">
              <span className="text-[var(--term-text-muted)]">RECORDS_FOUND:</span>
              <span className="text-[var(--term-cyan)]">{filteredProjects.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--term-text-muted)]">OPERATIONAL:</span>
              <span className="text-[var(--term-success)]">{stats.live}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--term-text-muted)]">IN_DEV:</span>
              <span className="text-[var(--term-warning)]">{stats.wip}</span>
            </div>

            {/* Filter controls */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[var(--term-text-muted)]">FILTER:</span>
              <div className="flex">
                {(["all", "live", "wip"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      clickSoft()
                      setFilter(option)
                    }}
                    className={cn(
                      "border px-2 py-1 text-[10px] uppercase transition-all",
                      filter === option
                        ? "border-[var(--term-green)] bg-[var(--term-green)] text-[var(--term-bg)]"
                        : "border-[var(--term-border)] text-[var(--term-text-muted)] hover:border-[var(--term-green)] hover:text-[var(--term-green)]"
                    )}
                  >
                    {option === "all" ? "ALL" : option === "live" ? "LIVE" : "WIP"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-[var(--term-green-dim)]"
          >
            {">"} SELECTED_WORK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-[var(--term-text)] md:text-3xl lg:text-4xl"
          >
            PROJECT_ARCHIVES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-lg text-sm text-[var(--term-text-muted)]"
          >
            Classified project files from the development archives. Select a record to access system.
          </motion.p>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectFileCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <span className="text-4xl text-[var(--term-text-dim)]">∅</span>
          <p className="mt-4 text-sm text-[var(--term-text-muted)]">
            NO_RECORDS_FOUND
          </p>
          <button
            onClick={() => {
              click()
              setFilter("all")
            }}
            className="mt-4 border border-[var(--term-border)] px-4 py-2 text-xs text-[var(--term-cyan)] transition-colors hover:border-[var(--term-cyan)]"
          >
            CLEAR_FILTER
          </button>
        </motion.div>
      )}

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 flex items-center justify-center gap-4 text-xs text-[var(--term-text-dim)]"
      >
        <span>─────────────</span>
        <span>END_OF_ARCHIVE</span>
        <span>─────────────</span>
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
