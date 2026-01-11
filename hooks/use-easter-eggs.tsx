"use client"

import * as React from "react"

const EASTER_EGG_KEY = "nico-os-easter-eggs"

export interface Achievement {
  id: string
  name: string
  description: string
  unlockedAt?: number
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_click: {
    id: "first_click",
    name: "Hello World",
    description: "Made your first click",
  },
  click_100: {
    id: "click_100",
    name: "Click Master",
    description: "Clicked 100 times",
  },
  click_1000: {
    id: "click_1000",
    name: "Carpal Tunnel",
    description: "Clicked 1000 times",
  },
  konami: {
    id: "konami",
    name: "Retro Gamer",
    description: "Entered the Konami code",
  },
  coffee: {
    id: "coffee",
    name: "Caffeinated",
    description: "Found the coffee command",
  },
  matrix: {
    id: "matrix",
    name: "Red Pill",
    description: "Entered the Matrix",
  },
  explorer: {
    id: "explorer",
    name: "Explorer",
    description: "Visited all sections",
  },
  terminal_master: {
    id: "terminal_master",
    name: "Terminal Master",
    description: "Used 5 different commands",
  },
}

interface EasterEggState {
  konamiUnlocked: boolean
  secretCommands: string[]
  clickCount: number
  achievements: string[]
  visitedPages: string[]
}

const INITIAL_STATE: EasterEggState = {
  konamiUnlocked: false,
  secretCommands: [],
  clickCount: 0,
  achievements: [],
  visitedPages: [],
}

interface EasterEggContextValue {
  state: EasterEggState
  unlockKonami: () => void
  addSecretCommand: (command: string) => void
  incrementClicks: () => void
  unlockAchievement: (id: string) => void
  hasAchievement: (id: string) => boolean
  visitPage: (page: string) => void
  getAchievementDetails: (id: string) => Achievement | undefined
  totalAchievements: number
  unlockedCount: number
}

const EasterEggContext = React.createContext<EasterEggContextValue | null>(null)

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<EasterEggState>(INITIAL_STATE)
  const [loaded, setLoaded] = React.useState(false)
  const [newAchievement, setNewAchievement] = React.useState<string | null>(null)

  // Load from localStorage
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(EASTER_EGG_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setState((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // Ignore parse errors
    }
    setLoaded(true)
  }, [])

  // Save to localStorage
  React.useEffect(() => {
    if (loaded) {
      localStorage.setItem(EASTER_EGG_KEY, JSON.stringify(state))
    }
  }, [state, loaded])

  const unlockKonami = React.useCallback(() => {
    setState((prev) => {
      if (prev.konamiUnlocked) return prev
      return { ...prev, konamiUnlocked: true }
    })
  }, [])

  const addSecretCommand = React.useCallback((command: string) => {
    setState((prev) => ({
      ...prev,
      secretCommands: [...new Set([...prev.secretCommands, command])],
    }))
  }, [])

  const incrementClicks = React.useCallback(() => {
    setState((prev) => ({ ...prev, clickCount: prev.clickCount + 1 }))
  }, [])

  const unlockAchievement = React.useCallback((id: string) => {
    setState((prev) => {
      if (prev.achievements.includes(id)) return prev
      setNewAchievement(id)
      return {
        ...prev,
        achievements: [...prev.achievements, id],
      }
    })
  }, [])

  const hasAchievement = React.useCallback(
    (id: string) => {
      return state.achievements.includes(id)
    },
    [state.achievements]
  )

  const visitPage = React.useCallback((page: string) => {
    setState((prev) => {
      if (prev.visitedPages.includes(page)) return prev
      return {
        ...prev,
        visitedPages: [...new Set([...prev.visitedPages, page])],
      }
    })
  }, [])

  const getAchievementDetails = React.useCallback((id: string) => {
    return ACHIEVEMENTS[id]
  }, [])

  // Check for click-based achievements
  React.useEffect(() => {
    if (!loaded) return

    if (state.clickCount >= 1 && !state.achievements.includes("first_click")) {
      unlockAchievement("first_click")
    }
    if (state.clickCount >= 100 && !state.achievements.includes("click_100")) {
      unlockAchievement("click_100")
    }
    if (state.clickCount >= 1000 && !state.achievements.includes("click_1000")) {
      unlockAchievement("click_1000")
    }
  }, [state.clickCount, state.achievements, loaded, unlockAchievement])

  // Check for terminal master achievement
  React.useEffect(() => {
    if (!loaded) return

    if (
      state.secretCommands.length >= 5 &&
      !state.achievements.includes("terminal_master")
    ) {
      unlockAchievement("terminal_master")
    }
  }, [state.secretCommands, state.achievements, loaded, unlockAchievement])

  // Check for explorer achievement
  React.useEffect(() => {
    if (!loaded) return

    const requiredPages = ["/", "/projects", "/about", "/tech", "/contact"]
    const hasVisitedAll = requiredPages.every((page) =>
      state.visitedPages.includes(page)
    )

    if (hasVisitedAll && !state.achievements.includes("explorer")) {
      unlockAchievement("explorer")
    }
  }, [state.visitedPages, state.achievements, loaded, unlockAchievement])

  const value = React.useMemo(
    () => ({
      state,
      unlockKonami,
      addSecretCommand,
      incrementClicks,
      unlockAchievement,
      hasAchievement,
      visitPage,
      getAchievementDetails,
      totalAchievements: Object.keys(ACHIEVEMENTS).length,
      unlockedCount: state.achievements.length,
    }),
    [
      state,
      unlockKonami,
      addSecretCommand,
      incrementClicks,
      unlockAchievement,
      hasAchievement,
      visitPage,
      getAchievementDetails,
    ]
  )

  return (
    <EasterEggContext.Provider value={value}>
      {children}
      {/* Achievement notification handled by AchievementToast component */}
    </EasterEggContext.Provider>
  )
}

export function useEasterEggs() {
  const context = React.useContext(EasterEggContext)
  if (!context) {
    throw new Error("useEasterEggs must be used within EasterEggProvider")
  }
  return context
}
