"use client"

import * as React from "react"
import { TerminalLayout, TerminalPageHeader } from "@/components/terminal"
import { TerminalSoundsProvider } from "@/hooks/use-terminal-sounds"
import { TechStackSection } from "@/components/portfolio/tech-stack-section"

export default function TechPage() {
  return (
    <TerminalSoundsProvider>
      <TerminalLayout>
        <div className="min-h-screen">
          <TerminalPageHeader
            title="SYSTEM SPECIFICATIONS"
            subtitle="SECTOR-F3"
          />
          <TechStackSection />
          {/* Bottom padding for nav */}
          <div className="h-16" />
        </div>
      </TerminalLayout>
    </TerminalSoundsProvider>
  )
}
