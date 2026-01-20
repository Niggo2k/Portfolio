"use client"

import * as React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ProjectCard } from "./project-card"
import type { Project } from "@/lib/portfolio-data"

interface ProjectGridProps {
  projects: Project[]
  className?: string
}

export function ProjectGrid({ projects, className }: ProjectGridProps) {
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observeElements = (container: HTMLElement | null) => {
      if (!container) return

      const elements = container.querySelectorAll(".scroll-reveal")
      if (elements.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      )

      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }

    const cleanupDesktop = observeElements(desktopRef.current)
    const cleanupMobile = observeElements(mobileRef.current)

    return () => {
      cleanupDesktop?.()
      cleanupMobile?.()
    }
  }, [projects])

  return (
    <>
      {/* Desktop Grid */}
      <div
        ref={desktopRef}
        className={cn(
          "hidden md:grid gap-8 grid-cols-2 px-16 pt-4 pb-4 relative shrink-0 w-full",
          className
        )}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Mobile Stack */}
      <div
        ref={mobileRef}
        className="md:hidden flex flex-col gap-8 px-8 py-4 relative shrink-0 w-full"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </>
  )
}
