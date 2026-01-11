"use client"

import * as React from "react"
import { TerminalLayout, TerminalPageHeader } from "@/components/terminal"
import { TerminalSoundsProvider } from "@/hooks/use-terminal-sounds"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { projects } from "@/lib/portfolio-data"

export default function ProjectsPage() {
  return (
    <TerminalSoundsProvider>
      <TerminalLayout>
        <div className="min-h-screen">
          <TerminalPageHeader
            title="PROJECT ARCHIVE DATABASE"
            subtitle="SECTOR-F1"
          />
          <ProjectsSection projects={projects} />
          {/* Bottom padding for nav */}
          <div className="h-16" />
        </div>
      </TerminalLayout>
    </TerminalSoundsProvider>
  )
}
