"use client"

import * as React from "react"
import { useEasterEggs } from "@/hooks/use-easter-eggs"
import { usePathname } from "next/navigation"

export function ClickTracker({ children }: { children: React.ReactNode }) {
  const { incrementClicks, visitPage } = useEasterEggs()
  const pathname = usePathname()

  // Track clicks globally
  React.useEffect(() => {
    const handleClick = () => {
      incrementClicks()
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [incrementClicks])

  // Track page visits
  React.useEffect(() => {
    visitPage(pathname)
  }, [pathname, visitPage])

  return <>{children}</>
}
