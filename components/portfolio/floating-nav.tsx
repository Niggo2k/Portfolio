"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { SunIcon, MoonIcon } from "@phosphor-icons/react"
import { useTheme } from "next-themes"

export function FloatingNav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const { scrollY } = useScroll()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  if (!mounted) return null

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-foreground/10 bg-background/80 p-1.5 backdrop-blur-xl">
        {/* Nav items */}
        <NavLink href="#work">Work</NavLink>
        <NavLink href="#contact">Contact</NavLink>

        {/* Divider */}
        <div className="mx-2 h-4 w-px bg-foreground/10" />

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="group flex size-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/5"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <MoonIcon className="size-4 text-foreground/60 transition-colors group-hover:text-foreground" weight="fill" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <SunIcon className="size-4 text-foreground/60 transition-colors group-hover:text-foreground" weight="fill" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-full px-4 py-2 text-sm font-medium text-foreground/60 transition-colors hover:bg-accent-color/5 hover:text-accent-color"
    >
      {children}
    </a>
  )
}
