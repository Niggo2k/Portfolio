"use client"

import * as React from "react"
import { TerminalLayout, TerminalPageHeader } from "@/components/terminal"
import { TerminalSoundsProvider } from "@/hooks/use-terminal-sounds"
import { ContactSection } from "@/components/portfolio/contact-section"
import { socialLinks } from "@/lib/portfolio-data"

export default function ContactPage() {
  return (
    <TerminalSoundsProvider>
      <TerminalLayout>
        <div className="min-h-screen">
          <TerminalPageHeader
            title="COMMUNICATIONS TERMINAL"
            subtitle="SECTOR-F4"
          />
          <ContactSection email="hello@nico.dev" socialLinks={socialLinks} />
          {/* Bottom padding for nav */}
          <div className="h-16" />
        </div>
      </TerminalLayout>
    </TerminalSoundsProvider>
  )
}
