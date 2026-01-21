"use client"


import Link from "next/link"
import { cn } from "@/lib/utils"
import type { SocialLink } from "@/lib/portfolio-data"
import { IconEmail1, IconGithub, IconLinkedin, IconX } from "@central-icons-react/round-outlined-radius-3-stroke-2"

interface FooterProps {
  name: string
  email: string
  socialLinks: SocialLink[]
  navItems?: { label: string; id: string; href?: string }[]
  onTabChange?: (id: string) => void
  className?: string
}

const socialIcons = {
  github: IconGithub,
  twitter: IconX,
  linkedin: IconLinkedin,
  email: IconEmail1,
}

export function Footer({
  name,
  email,
  socialLinks,
  navItems,
  onTabChange,
  className,
}: FooterProps) {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  })

  return (
    <footer className={cn("relative shrink-0 w-full overflow-hidden bg-[linear-gradient(360deg,#a8c0ff_0%_8%,#b8caff_15%,#e8d4ff_22%,#f8e0f8_28%,#fff0fa,#fffeff_42%,#fff_55%_100%)] dark:bg-[linear-gradient(360deg,#1a1033_0%_8%,#1c1535_15%,#1f1238_22%,#1e1030_28%,#1a0f28,#0f0a14_42%,#0a0a0a_55%_100%)] bg-size-[120%_120%] bg-bottom-left", className)}>
      <div className="absolute inset-0 pointer-events-none bg-repeat bg-top-right bg-size-auto opacity-80 dark:invert" style={{ background: 'url(/images/grain-texture.png)' }} />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-16 items-center px-16 max-md:px-8 pt-8 pb-8 max-md:pb-16 max-md:pt-16 relative w-full">
          {/* Divider */}
          <div className="scroll-reveal content-stretch flex flex-col gap-14 items-start relative shrink-0 w-full revealed">
            <div className="bg-border h-px shrink-0 w-full" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)" }} />

            {/* Desktop Footer */}
            <div className="hidden md:grid gap-5 grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_fit-content(100%))] relative shrink-0 w-full">
              {/* Name */}
              <div className="[grid-area:1_/_1] content-stretch flex flex-col items-start relative shrink-0">
                <Link
                  href="/"
                  className="content-stretch flex gap-3 items-center justify-center relative shrink-0 hover:opacity-80 transition-opacity"
                >
                  <p className=" font-medium leading-normal relative shrink-0 text-foreground text-[32px]">
                    {name}
                  </p>
                </Link>
              </div>

              {/* Navigation */}
              <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-2 items-start relative shrink-0">
                {navItems?.map((item) => (
                  item.href ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="content-stretch flex items-center justify-center px-0.5 py-0 relative rounded-full shrink-0"
                    >
                      <p className=" leading-5 relative shrink-0 text-muted-foreground text-base text-nowrap tracking-[0.16px] hover:text-foreground hover:underline underline-offset-2 transition-colors duration-200">
                        {item.label}
                      </p>
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => onTabChange?.(item.id)}
                      className="content-stretch flex items-center justify-center px-0.5 py-0 relative rounded-full shrink-0"
                    >
                        <p className=" leading-5 relative shrink-0 text-muted-foreground text-base text-nowrap tracking-[0.16px] hover:text-foreground hover:underline underline-offset-2 transition-colors duration-200">
                        {item.label}
                      </p>
                    </button>
                  )
                ))}
              </div>

              {/* Contact */}
              <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-4 items-start relative shrink-0">
                <div className="content-stretch flex flex-col  font-normal items-start relative shrink-0 text-muted-foreground w-full">
                  <p className="leading-6 min-w-full relative shrink-0 text-base w-[min-content]">
                    Let&apos;s work together!
                  </p>
                  <p className="leading-6 relative shrink-0 text-base break-all">
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-foreground hover:underline underline-offset-2 text-muted-foreground transition-colors duration-200"
                    >
                      <span>{email} </span>
                      <span className=" font-bold">
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
                          <Icon className="size-full text-muted-foreground" />
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
                <Link
                  href="/"
                  className="content-stretch flex gap-2 items-center justify-center relative shrink-0 hover:opacity-80 transition-opacity"
                >
                  <p className=" font-medium leading-normal relative shrink-0 text-foreground text-[32px]">
                    {name}
                  </p>
                </Link>
              </div>

              {/* Contact & Social */}
              <div className="content-stretch flex flex-col gap-10 items-start relative shrink-0">
                <div className="content-stretch flex flex-col gap-4 items-start relative shrink-0">
                  <div className="content-stretch flex flex-col  font-normal items-start relative shrink-0 text-muted-foreground w-full">
                    <p className="leading-6 relative shrink-0 text-base w-full">
                      Let&apos;s work together!
                    </p>
                    <p className="leading-6 relative shrink-0 text-base w-full break-all">
                      <a
                        href={`mailto:${email}`}
                        className="hover:text-foreground hover:underline underline-offset-2 text-muted-foreground transition-colors duration-200"
                      >
                        <span>{email} </span>
                        <span className=" font-bold">
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
                            <Icon className="size-full text-muted-foreground" />
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Navigation Mobile */}
                <div className="content-stretch flex flex-col gap-4 items-start relative shrink-0 w-full">
                  {navItems?.map((item) => (
                    item.href ? (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="content-stretch flex items-center justify-center px-0.5 py-0 relative rounded-full shrink-0"
                      >
                        <p className=" leading-5 relative shrink-0 text-muted-foreground text-base text-nowrap tracking-[0.16px] hover:text-foreground hover:underline underline-offset-2 transition-colors duration-200 uppercase">
                          {item.label}
                        </p>
                      </Link>
                    ) : (
                      <button
                        key={item.id}
                        onClick={() => onTabChange?.(item.id)}
                        className="content-stretch flex items-center justify-center px-0.5 py-0 relative rounded-full shrink-0"
                      >
                          <p className=" leading-5 relative shrink-0 text-muted-foreground text-base text-nowrap tracking-[0.16px] hover:text-foreground hover:underline underline-offset-2 transition-colors duration-200 uppercase">
                          {item.label}
                        </p>
                      </button>
                    )
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
            <p className=" font-normal leading-7 relative shrink-0 text-foreground text-sm">
              <span>Built with Next.js &amp; </span>
              <a
                className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:opacity-70 transition-opacity"
                href="https://claude.ai/code"
                target="_blank"
                rel="noopener noreferrer"
              >
                Claude Code
              </a>
              <span className="text-foreground"> ✦</span>
            </p>
            <p className=" font-normal leading-5 tracking-wider relative shrink-0 text-foreground text-xs text-nowrap cursor-pointer">
              CHANGELOG: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
