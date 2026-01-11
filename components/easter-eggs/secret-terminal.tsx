"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { useEasterEggs } from "@/hooks/use-easter-eggs"
import { useTerminalSounds } from "@/hooks/use-terminal-sounds"

const SECRET_COMMANDS: Record<
  string,
  { response: string | string[]; achievement?: string }
> = {
  help: {
    response: [
      "Available commands:",
      "  help     - Show this help",
      "  about    - About NICO OS",
      "  coffee   - Brew some coffee",
      "  gaming   - Gaming mode",
      "  music    - Play some tunes",
      "  matrix   - Take the red pill",
      "  sudo     - Try admin access",
      "  stats    - Show your stats",
      "  clear    - Clear terminal",
      "  exit     - Close terminal",
    ],
  },
  about: {
    response: [
      "NICO OS v1.0",
      "─────────────────────────",
      "Operator: Nico Epp",
      "Role: Full-Stack Developer",
      "Location: Stuttgart, Germany",
      "Active Since: 2020",
      "Hobbies: Gaming, Music, Coffee",
      "─────────────────────────",
      "Built with Next.js + TypeScript",
    ],
  },
  coffee: {
    response: [
      "☕ BREWING COFFEE...",
      "",
      "Fun fact: Nico runs on 3+ cups/day",
      "Preferred: Black, no sugar",
      "",
      "ACHIEVEMENT: Caffeinated",
    ],
    achievement: "coffee",
  },
  gaming: {
    response: [
      "🎮 LOADING GAME MODE...",
      "",
      "ERROR: Games are for after work!",
      "Current status: Building cool stuff",
      "",
      "Try the Konami code instead ;)",
    ],
  },
  music: {
    response: [
      "🎵 Now playing:",
      "Lo-fi beats to code to",
      "",
      "Volume: ████████░░ 80%",
      "Status: Vibing",
    ],
  },
  matrix: {
    response: [
      "You take the red pill...",
      "You stay in Wonderland...",
      "And I show you how deep",
      "the rabbit hole goes.",
      "",
      "ACHIEVEMENT: Red Pill",
    ],
    achievement: "matrix",
  },
  sudo: {
    response: [
      "ACCESS DENIED",
      "",
      "Nice try! But you're a GUEST.",
      "Operator clearance required.",
      "",
      "Hint: The real power is in",
      "building things, not breaking them.",
    ],
  },
  whoami: {
    response: ["GUEST@NICO-OS", "Clearance: VISITOR", "Welcome to my portfolio!"],
  },
  ls: {
    response: [
      "drwxr-xr-x  projects/",
      "drwxr-xr-x  about/",
      "drwxr-xr-x  tech/",
      "drwxr-xr-x  contact/",
      "-rw-r--r--  README.md",
      "-rw-r--r--  .secrets (permission denied)",
    ],
  },
  cat: {
    response: ["Usage: cat <filename>", "Try: cat README.md"],
  },
  "cat readme.md": {
    response: [
      "# NICO OS",
      "",
      "Welcome to my portfolio!",
      "Built with love and lots of coffee.",
      "",
      "## Quick Links",
      "- F1: Projects",
      "- F2: About",
      "- F3: Tech Stack",
      "- F4: Contact",
    ],
  },
  hello: {
    response: ["Hello! Welcome to NICO OS.", "Type 'help' for available commands."],
  },
  hi: {
    response: ["Hey there! 👋", "Type 'help' to see what you can do."],
  },
  date: {
    response: [new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })],
  },
  uptime: {
    response: ["System uptime: Since 2020", "That's 4+ years of coding!"],
  },
  neofetch: {
    response: [
      "       ___       NICO OS v1.0",
      "      /   \\      ─────────────",
      "     /     \\     Host: Stuttgart, DE",
      "    /  N O  \\    Uptime: 4+ years",
      "   /         \\   Stack: React, Next.js, TS",
      "  /___________\\  Theme: CRT Green",
      "                 Coffee: 3+ cups/day",
    ],
  },
}

export function SecretTerminal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [history, setHistory] = React.useState<
    { cmd: string; response: string[] }[]
  >([])
  const { addSecretCommand, unlockAchievement, state } = useEasterEggs()
  const { beep, error, click } = useTerminalSounds()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const historyRef = React.useRef<HTMLDivElement>(null)

  // Toggle with backtick key
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "<" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        click()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [click])

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Scroll to bottom on new history
  React.useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.toLowerCase().trim()

    if (!cmd) return

    // Handle special commands
    if (cmd === "clear") {
      beep()
      setHistory([])
      setInput("")
      addSecretCommand(cmd)
      return
    }

    if (cmd === "exit") {
      beep()
      setIsOpen(false)
      setInput("")
      return
    }

    if (cmd === "stats") {
      beep()
      addSecretCommand(cmd)
      const statsResponse = [
        "YOUR STATS:",
        `  Clicks: ${state.clickCount}`,
        `  Commands used: ${state.secretCommands.length}`,
        `  Achievements: ${state.achievements.length}/8`,
        `  Pages visited: ${state.visitedPages.length}/5`,
        state.konamiUnlocked ? "  Konami: UNLOCKED" : "  Konami: ???",
      ]
      setHistory((prev) => [...prev, { cmd, response: statsResponse }])
      setInput("")
      return
    }

    const command = SECRET_COMMANDS[cmd]
    if (command) {
      beep()
      addSecretCommand(cmd)
      if (command.achievement) {
        unlockAchievement(command.achievement)
      }
      const response = Array.isArray(command.response)
        ? command.response
        : [command.response]
      setHistory((prev) => [...prev, { cmd, response }])
    } else {
      error()
      setHistory((prev) => [
        ...prev,
        { cmd, response: [`Command not found: ${cmd}`, "Type 'help' for available commands."] },
      ])
    }

    setInput("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 left-4 right-4 z-[10000] border border-[var(--term-border)] bg-[var(--term-bg)] font-mono text-sm shadow-2xl md:left-auto md:right-4 md:w-[480px]"
          style={{
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--term-border)] bg-[var(--term-bg-elevated)] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-[var(--term-green)]">SECRET TERMINAL</span>
              <span className="text-xs text-[var(--term-text-muted)]">
                (press ` to toggle)
              </span>
            </div>
            <button
              onClick={() => {
                click()
                setIsOpen(false)
              }}
              className="text-[var(--term-text-muted)] transition-colors hover:text-[var(--term-text)]"
            >
              [X]
            </button>
          </div>

          {/* History */}
          <div
            ref={historyRef}
            className="h-64 space-y-2 overflow-y-auto p-3 terminal-scroll"
          >
            <div className="text-[var(--term-text-muted)]">
              Welcome to the secret terminal!
            </div>
            <div className="text-[var(--term-text-muted)]">
              Type &apos;help&apos; for available commands...
            </div>
            <div className="text-[var(--term-text-muted)]">─────────────────────────</div>

            {history.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="text-[var(--term-cyan)]">
                  <span className="text-[var(--term-green)]">guest@nico-os</span>
                  <span className="text-[var(--term-text-muted)]">:</span>
                  <span className="text-[var(--term-cyan)]">~</span>
                  <span className="text-[var(--term-text-muted)]">$</span> {item.cmd}
                </div>
                {item.response.map((line, j) => (
                  <div
                    key={j}
                    className={
                      line.startsWith("ACHIEVEMENT")
                        ? "text-[var(--term-amber)]"
                        : line.startsWith("ERROR") || line.startsWith("ACCESS DENIED")
                          ? "text-[var(--term-error)]"
                          : "text-[var(--term-text)]"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-[var(--term-border)] p-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-[var(--term-green)]">guest@nico-os</span>
              <span className="text-[var(--term-text-muted)]">:</span>
              <span className="text-[var(--term-cyan)]">~</span>
              <span className="text-[var(--term-text-muted)]">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-[var(--term-text)] outline-none"
                placeholder="Type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
