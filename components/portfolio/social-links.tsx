"use client"

import * as React from "react"
import {
  GithubLogo,
  XLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import type { SocialLink } from "@/lib/portfolio-data"

interface SocialLinksProps {
  links: SocialLink[]
  className?: string
}

const socialIcons = {
  github: GithubLogo,
  twitter: XLogo,
  linkedin: LinkedinLogo,
  email: EnvelopeSimple,
}

export function SocialLinks({ links, className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => {
        const Icon = socialIcons[link.platform]
        if (!Icon) return null
        return (
          <a
            key={link.platform}
            href={link.url}
            target={link.platform === "email" ? undefined : "_blank"}
            rel={link.platform === "email" ? undefined : "noopener noreferrer"}
            aria-label={link.label}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Icon className="size-5" weight="fill" />
          </a>
        )
      })}
    </div>
  )
}
