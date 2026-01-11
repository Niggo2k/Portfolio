"use client"

import { useKonamiCode } from "@/hooks/use-konami-code"
import { useEasterEggs } from "@/hooks/use-easter-eggs"

export function KonamiListener() {
  const { unlockKonami } = useEasterEggs()

  useKonamiCode(() => {
    unlockKonami()
  })

  return null
}
