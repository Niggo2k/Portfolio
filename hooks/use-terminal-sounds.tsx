"use client"

import * as React from "react"
import {
  playClick,
  playClickSoft,
  playBeep,
  playError,
  playHover,
  initAudio,
} from "@/lib/sounds"

// Global sound enabled state (persisted in localStorage)
const SOUND_KEY = "terminal-sounds-enabled"

interface TerminalSoundsContext {
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
  click: () => void
  clickSoft: () => void
  beep: () => void
  error: () => void
  hover: () => void
}

const SoundsContext = React.createContext<TerminalSoundsContext | null>(null)

export function TerminalSoundsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [soundEnabled, setSoundEnabledState] = React.useState(true)
  const [initialized, setInitialized] = React.useState(false)

  // Load preference from localStorage
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SOUND_KEY)
      if (stored !== null) {
        setSoundEnabledState(stored === "true")
      }
      setInitialized(true)
    }
  }, [])

  // Initialize audio on first user interaction
  React.useEffect(() => {
    if (!initialized) return

    const handleInteraction = () => {
      initAudio()
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
    }

    document.addEventListener("click", handleInteraction, { once: true })
    document.addEventListener("keydown", handleInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
    }
  }, [initialized])

  const setSoundEnabled = React.useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled)
    if (typeof window !== "undefined") {
      localStorage.setItem(SOUND_KEY, String(enabled))
    }
  }, [])

  const click = React.useCallback(() => {
    if (soundEnabled) playClick()
  }, [soundEnabled])

  const clickSoft = React.useCallback(() => {
    if (soundEnabled) playClickSoft()
  }, [soundEnabled])

  const beep = React.useCallback(() => {
    if (soundEnabled) playBeep()
  }, [soundEnabled])

  const error = React.useCallback(() => {
    if (soundEnabled) playError()
  }, [soundEnabled])

  const hover = React.useCallback(() => {
    if (soundEnabled) playHover()
  }, [soundEnabled])

  const value = React.useMemo(
    () => ({
      soundEnabled,
      setSoundEnabled,
      click,
      clickSoft,
      beep,
      error,
      hover,
    }),
    [soundEnabled, setSoundEnabled, click, clickSoft, beep, error, hover]
  )

  return (
    <SoundsContext.Provider value={value}>{children}</SoundsContext.Provider>
  )
}

export function useTerminalSounds(): TerminalSoundsContext {
  const context = React.useContext(SoundsContext)
  if (!context) {
    // Return no-op functions if used outside provider
    return {
      soundEnabled: false,
      setSoundEnabled: () => {},
      click: () => {},
      clickSoft: () => {},
      beep: () => {},
      error: () => {},
      hover: () => {},
    }
  }
  return context
}

/**
 * Hook that returns click handler with sound
 */
export function useClickSound<T extends HTMLElement = HTMLElement>(
  onClick?: (e: React.MouseEvent<T>) => void
) {
  const { click } = useTerminalSounds()

  return React.useCallback(
    (e: React.MouseEvent<T>) => {
      click()
      onClick?.(e)
    },
    [click, onClick]
  )
}
