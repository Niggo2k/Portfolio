"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/portfolio-data"

interface ProjectCardProps {
  project: Project
  className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { title, description, url, status } = project

  return (
    <div
      className={cn(
        "group flex h-full flex-col justify-between p-6",
        className
      )}
    >
      {/* Top section with icon and badge */}
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5 text-xl font-bold text-white/80 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:ring-white/20">
          {title.charAt(0)}
        </div>

        {/* Status badge */}
        {status === "wip" && (
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-400/80 ring-1 ring-amber-500/20">
            WIP
          </span>
        )}
        {status === "live" && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400/80 ring-1 ring-emerald-500/20">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-auto space-y-3 pt-6">
        {/* Title with arrow */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-white">
            {title}
          </h3>
          <ArrowUpRightIcon
            className={cn(
              "size-4 text-white/40",
              "transition-all duration-300",
              "translate-y-1 opacity-0",
              "group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-white/60"
            )}
            weight="bold"
          />
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/50">
          {description}
        </p>

        {/* URL */}
        <p className="text-xs text-white/30 transition-colors duration-300 group-hover:text-white/40">
          {url.replace(/^https?:\/\//, "")}
        </p>
      </div>
    </div>
  )
}
