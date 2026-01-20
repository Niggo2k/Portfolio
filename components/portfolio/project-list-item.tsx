"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/portfolio-data"
import { IconGithub, IconArrowUpRight } from "@central-icons-react/round-outlined-radius-3-stroke-2"

interface ProjectListItemProps {
  project: Project
  className?: string
  index?: number
}

export function ProjectListItem({ project, className, index = 0 }: ProjectListItemProps) {
  const isGitHub = project.url.includes("github.com")
  const Icon = isGitHub ? IconGithub : IconArrowUpRight
  const tags = project.tags?.slice(0, 4) || []

  return (
    <div
      className={cn("scroll-reveal", className)}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex items-center gap-4 py-4 px-4 -mx-4 rounded-xl",
          "transition-colors duration-200",
          "hover:bg-gray-50"
        )}
      >
        {/* Year */}
        <span className="text-sm text-gray-400 font-medium w-24 shrink-0 hidden sm:block">
          {project.year || "—"}
        </span>

        {/* Title and Tags */}
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <span className="font-medium text-gray-900 shrink-0">
            {project.title}
          </span>

          {/* Tags - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 flex-wrap flex-1 justify-end">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Link Icon */}
        <Icon
          className="w-5 h-5 text-gray-400 shrink-0 transition-colors duration-200 group-hover:text-gray-600"
          size={20}
        />
      </a>
    </div>
  )
}
