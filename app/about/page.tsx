"use client"

import * as React from "react"
import { TerminalLayout, TerminalPageHeader } from "@/components/terminal"
import { TerminalSoundsProvider } from "@/hooks/use-terminal-sounds"
import { AboutSection } from "@/components/portfolio/about-section"
import { stuttgartCoords } from "@/lib/portfolio-data"

export default function AboutPage() {
  return (
    <TerminalSoundsProvider>
      <TerminalLayout>
        <div className="min-h-screen">
          <TerminalPageHeader
            title="PERSONNEL DOSSIER"
            subtitle="SECTOR-F2"
          />
          <AboutSection
            latitude={stuttgartCoords.latitude}
            longitude={stuttgartCoords.longitude}
            zoom={stuttgartCoords.zoom}
          />
          {/* Bottom padding for nav */}
          <div className="h-16" />
        </div>
      </TerminalLayout>
    </TerminalSoundsProvider>
  )
}
