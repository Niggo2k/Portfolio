"use client"

import * as React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { ProjectListItem } from "./project-list-item"
import { useScrollRevealAll } from "@/hooks/use-scroll-reveal"
import type { Project } from "@/lib/portfolio-data"

interface ProjectListProps {
  projects: Project[]
  className?: string
}

export function ProjectList({ projects, className }: ProjectListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  useScrollRevealAll(containerRef)

  if (projects.length === 0) return null

  return (
    <div
      ref={containerRef}
      className={cn("w-full px-8 md:px-16 py-20", className)}
    >
      {/* Section Header */}
      <div className="scroll-reveal mb-6">
        <p className="text-sm text-gray-400 font-medium mb-1">More Work</p>
        <h2 className="text-2xl font-semibold text-gray-900">Other Projects</h2>
      </div>

      {/* Project List */}
      <div className="divide-y divide-gray-100">
        {projects.map((project, index) => (
          <ProjectListItem
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
