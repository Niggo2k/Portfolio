"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { HeroSection } from "@/components/portfolio/hero-section"
import {
  BootSequence,
  CRTEffects,
} from "@/components/terminal"
import { TerminalSoundsProvider, useTerminalSounds } from "@/hooks/use-terminal-sounds"
import FaultyTerminal from "@/components/FaultyTerminal"

const BOOT_STORAGE_KEY = "nico-os-booted"

function HomeContent() {
  // Check if user has already seen boot sequence
  const [hasSeenBoot, setHasSeenBoot] = React.useState<boolean | null>(null)
  const [isBooted, setIsBooted] = React.useState(false)
  const router = useRouter()
  const { click } = useTerminalSounds()

  // Check localStorage on mount
  React.useEffect(() => {
    const seen = localStorage.getItem(BOOT_STORAGE_KEY)
    setHasSeenBoot(seen === "true")
  }, [])

  // Handle boot completion
  const handleBootComplete = React.useCallback(() => {
    localStorage.setItem(BOOT_STORAGE_KEY, "true")
    setIsBooted(true)
  }, [])

  // Handle keyboard shortcuts for navigation
  React.useEffect(() => {
    // Only enable shortcuts after boot is complete or skipped
    if (hasSeenBoot === null) return
    if (!hasSeenBoot && !isBooted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault()
        click()
        router.push("/projects")
      } else if (e.key === "F2") {
        e.preventDefault()
        click()
        router.push("/about")
      } else if (e.key === "F3") {
        e.preventDefault()
        click()
        router.push("/tech")
      } else if (e.key === "F4") {
        e.preventDefault()
        click()
        router.push("/contact")
      } else if (e.key === "F5") {
        e.preventDefault()
        click()
        document.documentElement.classList.toggle("dark")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [hasSeenBoot, isBooted, router, click])

  // Show nothing while checking localStorage (prevents flash)
  if (hasSeenBoot === null) {
    return (
      <div className="fixed inset-0 bg-[var(--term-bg)]" />
    )
  }

  // Determine if we should show content
  const showContent = hasSeenBoot || isBooted

  return (
    <>
      {/* Boot Sequence - only on first visit */}
      {!hasSeenBoot && !isBooted && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {/* Main Content */}
      {showContent && (
        <CRTEffects scanlines vignette>
          <main className="relative bg-[var(--term-bg)]">
            <HeroSection />



            {/* <div className="absolute inset-0">
            <FaultyTerminal
              tint="#a7ef9e"
              scale={3}
              digitSize={1.2}
              timeScale={0.5}
              noiseAmp={1}
              brightness={0.6}
              scanlineIntensity={0.5}
              curvature={.2}
              mouseReact={true}
              mouseStrength={2}
            />
          </div> */}
          </main>
        </CRTEffects>
      )}
    </>
  )
}

export default function Page() {
  return (
    <TerminalSoundsProvider>
      <HomeContent />
    </TerminalSoundsProvider>
  )
}
