"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          "bg-muted text-muted-foreground",
          className
        )}
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      className={cn(
        "flex size-9 items-center justify-center rounded-full",
        "bg-muted text-muted-foreground",
        "transition-colors duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunIcon
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        )}
        weight="fill"
      />
      <MoonIcon
        className={cn(
          "absolute size-4 transition-all duration-300",
          theme === "dark"
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        )}
        weight="fill"
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
