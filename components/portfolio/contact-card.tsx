"use client"

import * as React from "react"
import { CopyIcon, CheckIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ContactCardProps {
  email: string
  headline?: string
  className?: string
}

export function ContactCard({
  email,
  headline = "Let's work together",
  className,
}: ContactCardProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col items-start justify-center gap-5 p-6 lg:p-8",
        className
      )}
    >
      {/* Label */}
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
        Contact
      </span>

      {/* Headline */}
      <h3 className="text-2xl font-semibold text-white md:text-3xl">
        {headline}
      </h3>

      {/* Email button */}
      <button
        onClick={handleCopy}
        className={cn(
          "group flex w-full items-center gap-4 rounded-2xl p-4",
          "bg-white/5 ring-1 ring-white/10",
          "transition-all duration-300",
          "hover:bg-white/10 hover:ring-white/20"
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/10">
          <PaperPlaneTiltIcon className="size-5 text-white/60" weight="fill" />
        </div>
        <span className="flex-1 text-left text-sm font-medium text-white/70 transition-colors group-hover:text-white/90">
          {email}
        </span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-white/10">
          {copied ? (
            <CheckIcon className="size-4 text-emerald-400" weight="bold" />
          ) : (
            <CopyIcon className="size-4 text-white/40" />
          )}
        </span>
      </button>

      {/* Hint */}
      <p className="text-xs text-white/30">
        {copied ? "Copied to clipboard!" : "Click to copy email address"}
      </p>
    </div>
  )
}
