"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { useEasterEggs, ACHIEVEMENTS } from "@/hooks/use-easter-eggs"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"

export function AchievementToast() {
  const { state } = useEasterEggs()
  const { beep } = useTerminalSounds()
  const [toast, setToast] = React.useState<{
    id: string
    name: string
    description: string
  } | null>(null)
  const prevAchievementsRef = React.useRef<string[]>([])
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    // Skip first render to avoid showing toasts for already unlocked achievements
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevAchievementsRef.current = state.achievements
      return
    }

    // Find newly unlocked achievements
    const newAchievements = state.achievements.filter(
      (a) => !prevAchievementsRef.current.includes(a)
    )

    if (newAchievements.length > 0) {
      const achievementId = newAchievements[0]
      const achievement = ACHIEVEMENTS[achievementId]

      if (achievement && achievementId !== "konami") {
        // Konami has its own notification
        beep()
        setToast({
          id: achievementId,
          name: achievement.name,
          description: achievement.description,
        })

        const timer = setTimeout(() => setToast(null), 4000)
        prevAchievementsRef.current = state.achievements
        return () => clearTimeout(timer)
      }
    }

    prevAchievementsRef.current = state.achievements
  }, [state.achievements, beep])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed right-4 top-4 z-[10000] border border-[var(--term-amber)] bg-[var(--term-bg-elevated)] px-4 py-3 font-mono shadow-lg"
          style={{
            boxShadow: "0 0 15px rgba(255, 176, 0, 0.2)",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--term-amber)]">
                Achievement Unlocked
              </div>
              <div className="mt-1 font-bold text-[var(--term-text)]">
                {toast.name}
              </div>
              <div className="mt-0.5 text-xs text-[var(--term-text-muted)]">
                {toast.description}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
