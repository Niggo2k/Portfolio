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

interface FooterProps {
  name: string
  email: string
  socialLinks: SocialLink[]
  navItems?: { label: string; id: string }[]
  onTabChange?: (id: string) => void
  className?: string
}

const socialIcons = {
  github: GithubLogo,
  twitter: XLogo,
  linkedin: LinkedinLogo,
  email: EnvelopeSimple,
}

export function Footer({
  name,
  email,
  socialLinks,
  navItems,
  onTabChange,
  className,
}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  })

  return (
    <footer className={cn("relative shrink-0 w-full", className)}>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-16 items-center px-16 max-md:px-8 pt-8 pb-8 max-md:pb-16 max-md:pt-4 relative w-full">
          {/* Divider */}
          <div className="scroll-reveal content-stretch flex flex-col gap-5 items-start relative shrink-0 w-full revealed">
            <div className="bg-gray-200 h-px shrink-0 w-full" />

            {/* Desktop Footer */}
            <div className="hidden md:grid gap-5 grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_fit-content(100%))] relative shrink-0 w-full">
              {/* Name */}
              <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start relative shrink-0">
                <a
                  href="/"
                  className="content-stretch flex gap-3 items-center justify-center relative shrink-0 hover:opacity-80 transition-opacity"
                >
                  <p className="font-['Figtree',sans-serif] font-medium leading-normal relative shrink-0 text-[#374151] text-[32px]">
                    {name}
                  </p>
                </a>
              </div>

              {/* Navigation */}
              <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-2 items-start relative shrink-0">
                {navItems?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onTabChange?.(item.id)}
                    className="content-stretch flex items-center justify-center px-0.5 py-0 relative rounded-full shrink-0"
                  >
                    <p className="font-['Figtree',sans-serif] leading-5 relative shrink-0 text-[#9ca3af] text-base text-nowrap tracking-[0.16px] hover:text-blue-500 transition-colors duration-200">
                      {item.label}
                    </p>
                  </button>
                ))}
              </div>

              {/* Contact */}
              <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-4 items-start relative shrink-0">
                <div className="content-stretch flex flex-col font-['Figtree',sans-serif] font-normal items-start relative shrink-0 text-gray-400 w-full">
                  <p className="leading-6 min-w-full relative shrink-0 text-base w-[min-content]">
                    Let&apos;s work together!
                  </p>
                  <p className="leading-6 relative shrink-0 text-base break-all">
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-blue-500 text-gray-500 transition-colors duration-200"
                    >
                      <span>{email} </span>
                      <span className="font-['Figtree',sans-serif] font-bold">
                        <svg
                          width="0.6em"
                          height="0.6em"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block align-baseline"
                        >
                          <path
                            d="M0.928172 8.30395L0.0001719 7.35995L7.04017 0.319951L7.98417 1.26395L0.928172 8.30395ZM1.96817 1.35995V-4.95911e-05H8.30417L7.80817 1.34395L1.96817 1.35995ZM6.94417 6.33595L6.96017 0.479951L8.30417 -4.95911e-05V6.33595H6.94417Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </a>
                  </p>
                </div>

                {/* Social Links */}
                <div className="content-stretch flex gap-6 items-start relative shrink-0">
                  {socialLinks.map((link) => {
                    const Icon = socialIcons[link.platform]
                    if (!Icon) return null
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target={link.platform === "email" ? undefined : "_blank"}
                        rel={link.platform === "email" ? undefined : "noopener noreferrer"}
                        aria-label={link.label}
                        className="social-link hover:opacity-70 transition-opacity"
                      >
                        <div className="relative shrink-0 size-6">
                          <Icon className="size-full text-[#c4c9d0]" weight="fill" />
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="md:hidden content-stretch flex flex-col gap-10 items-start relative shrink-0 w-full">
              {/* Name */}
              <div className="content-stretch flex flex-col gap-1.5 items-start relative shrink-0">
                <a
                  href="/"
                  className="content-stretch flex gap-2 items-center justify-center relative shrink-0 hover:opacity-80 transition-opacity"
                >
                  <p className="font-['Figtree',sans-serif] font-medium leading-normal relative shrink-0 text-[#374151] text-[32px]">
                    {name}
                  </p>
                </a>
              </div>

              {/* Contact & Social */}
              <div className="content-stretch flex flex-col gap-10 items-start relative shrink-0">
                <div className="content-stretch flex flex-col gap-4 items-start relative shrink-0">
                  <div className="content-stretch flex flex-col font-['Figtree',sans-serif] font-normal items-start relative shrink-0 text-gray-400 w-full">
                    <p className="leading-6 relative shrink-0 text-base w-full">
                      Let&apos;s work together!
                    </p>
                    <p className="leading-6 relative shrink-0 text-base w-full break-all">
                      <a
                        href={`mailto:${email}`}
                        className="hover:text-blue-500 text-gray-500 transition-colors duration-200"
                      >
                        <span>{email} </span>
                        <span className="font-['Figtree',sans-serif] font-bold">
                          <svg
                            width="0.6em"
                            height="0.6em"
                            viewBox="0 0 9 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block align-baseline"
                            style={{ verticalAlign: "0.05em" }}
                          >
                            <path
                              d="M0.928172 8.30395L0.0001719 7.35995L7.04017 0.319951L7.98417 1.26395L0.928172 8.30395ZM1.96817 1.35995V-4.95911e-05H8.30417L7.80817 1.34395L1.96817 1.35995ZM6.94417 6.33595L6.96017 0.479951L8.30417 -4.95911e-05V6.33595H6.94417Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </a>
                    </p>
                  </div>

                  {/* Social Links Mobile */}
                  <div className="content-stretch flex gap-8 items-start relative shrink-0">
                    {socialLinks.map((link) => {
                      const Icon = socialIcons[link.platform]
                      if (!Icon) return null
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target={link.platform === "email" ? undefined : "_blank"}
                          rel={link.platform === "email" ? undefined : "noopener noreferrer"}
                          aria-label={link.label}
                          className="social-link hover:opacity-70 transition-opacity"
                        >
                          <div className="relative shrink-0 size-6">
                            <Icon className="size-full text-[#c4c9d0]" weight="fill" />
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Navigation Mobile */}
                <div className="content-stretch flex flex-col gap-4 items-start relative shrink-0 w-full">
                  {navItems?.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onTabChange?.(item.id)}
                      className="content-stretch flex items-center justify-center px-0.5 py-0 relative rounded-full shrink-0"
                    >
                      <p className="font-['Figtree',sans-serif] leading-5 relative shrink-0 text-[#9ca3af] text-base text-nowrap tracking-[0.16px] hover:text-blue-500 transition-colors duration-200 uppercase">
                        {item.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Built with & Changelog */}
          <div
            className="scroll-reveal-fade content-stretch flex flex-col gap-0.5 items-center relative shrink-0 revealed"
            style={{ transitionDelay: "200ms" }}
          >
            <p className="font-['Figtree',sans-serif] font-normal leading-7 relative shrink-0 text-gray-500 text-sm">
              <span>Built with Next.js &amp; </span>
              <a
                className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:!text-emerald-600 transition-colors"
                href="https://claude.ai/code"
                target="_blank"
                rel="noopener noreferrer"
              >
                Claude Code
              </a>
              <span className="text-gray-400"> ✦</span>
            </p>
            <p className="font-['Figtree',sans-serif] font-normal leading-5 tracking-wider relative shrink-0 text-[#9ca3af] text-xs text-nowrap cursor-pointer">
              CHANGELOG: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
