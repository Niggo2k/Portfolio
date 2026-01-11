"use client"

import * as React from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

export function useKonamiCode(onActivate: () => void) {
  const [inputSequence, setInputSequence] = React.useState<string[]>([])
  const onActivateRef = React.useRef(onActivate)

  // Keep callback ref up to date
  React.useEffect(() => {
    onActivateRef.current = onActivate
  }, [onActivate])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code

      setInputSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length)

        // Check if sequence matches
        if (
          newSequence.length === KONAMI_CODE.length &&
          newSequence.every((k, i) => k === KONAMI_CODE[i])
        ) {
          // Reset sequence and trigger callback
          setTimeout(() => {
            onActivateRef.current()
          }, 0)
          return []
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return {
    reset: () => setInputSequence([]),
    progress: inputSequence.length / KONAMI_CODE.length,
  }
}
