"use client"

import * as React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import type { Company } from "@/lib/portfolio-data"
import { motion } from "motion/react"
import VariableProximity from "@/components/ui/variable-proximity"
import { MagneticLogo } from "@/components/ui/magnetic-logo"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import Image from "next/image"
import { ThemeToggle } from "../theme-toggle"

interface HeroProps {
  name: string
  tagline: string
  previousCompanies?: Company[]
  showContactButton?: boolean
  className?: string
}

export function Hero({
  name,
  tagline,
  previousCompanies,
  showContactButton = false,
  className,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={containerRef}
      className={cn("content-stretch flex flex-col items-start relative shrink-0 w-full overflow-hidden bg-[linear-gradient(190deg,#a8c0ff_0%_8%,#b8caff_15%,#e8d4ff_22%,#f8e0f8_28%,#fff0fa,#fffeff_42%,#fff_55%_100%)] dark:bg-[linear-gradient(190deg,#1a1033_0%_8%,#1c1535_15%,#1f1238_22%,#1e1030_28%,#1a0f28,#0f0a14_42%,#0a0a0a_55%_100%)]  bg-size-[120%_120%] bg-top-right", className)}
      initial={{ backgroundPosition: "0% 49%" }}
      animate={{
        backgroundPosition: ["0% 49%", "100% 51%", "0% 49%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: [0.45, 0, 0.55, 1],
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-repeat bg-top-right bg-size-auto opacity-80 dark:invert" style={{ background: 'url(/images/grain-texture.png)' }} />

      {/* Watermark */}
      <div
        className="absolute top-0 left-0 z-0 pointer-events-none overflow-hidden opacity-80"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%), linear-gradient(to right, black 0%, black 50%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%), linear-gradient(to right, black 0%, black 50%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <span className="font-mono text-[120px] md:text-[160px] no-wrap font-bold tracking-tight leading-none block px-4 pt-2 border-border border-b-input from-card/100 to-card/20 dark:border-border/10 dark:border-t-border/30 dark:from-primary/15 dark:to-primary/5 border bg-linear-to-b dark:border-b-0 text-foreground/[0.035] dark:text-foreground/[0.06] backdrop-blur-[1px]"
          style={{ textWrapMode: "nowrap" }}>
          NICO EPP NICO EPP<br />
          EPP NICO EPP NICO
        </span>
      </div>

      <div className="relative shrink-0 w-full z-2">
        <div className="size-full">
          <div className="content-stretch flex flex-row items-start px-16 pt-8 pb-8 max-md:px-8 max-md:pt-8 max-md:pb-4 relative w-full">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
              <div className="relative shrink-0 size-11">
                <Image width={44} height={44} quality={100} alt="Nico Epp Logo" className="object-contain pointer-events-none size-full dark:invert" src="/logo-ne.svg" />
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full z-2">
        <div className="size-full">
          <div className="content-stretch flex flex-col gap-6 items-start pb-10 pt-16 px-16 max-md:px-8 max-md:pt-24 max-md:pb-6 relative w-full max-md:h-[250px] md:h-[220px]">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <VariableProximity
                label={name}
                containerRef={containerRef}
                className="tracking-[0.0125em] leading-normal relative shrink-0 text-foreground text-4xl w-full max-md:text-4xl"
                style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}
                fromFontVariationSettings="'wght' 400, 'wdth' 100"
                toFontVariationSettings="'wght' 900, 'wdth' 125"
                radius={60}
                falloff="gaussian"
              />
              <div className="flex flex-col gap-0 font-normal tracking-wide leading-6 max-md:leading-5.5 text-muted-foreground text-lg max-md:text-base w-full max-md:max-w-86 whitespace-pre-wrap mt-3 max-md:mt-3">
                <div>
                  <span>{tagline}</span>
                  <span className="gradient-text-animated"> ✦</span>
                </div>
                <div className="flex gap-0">
                  {previousCompanies && previousCompanies.length > 0 && (
                    <>
                      <span>Previously at </span>
                      {previousCompanies.map((company, index) => (
                        <React.Fragment key={company.name}>
                          <HoverCard>
                            <HoverCardTrigger delay={200} closeDelay={100} render={<span className="inline-flex items-center cursor-pointer">
                              {(company.logo || company.logoGradient) && (
                                <MagneticLogo
                                  image={company.logo}
                                  gradient={company.logoGradient}
                                  rotation={company.logoRotation ?? 12}
                                  size={28}
                                  className="mx-1 -translate-y-0.5"
                                />
                              )}
                              {company.url ? (
                                <a
                                  href={company.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-foreground hover:opacity-70 hover:underline underline-offset-2 transition-all"
                                >
                                  {company.name}
                                </a>
                              ) : (
                                  <span className="text-foreground">{company.name}</span>
                              )}
                            </span>} />
                            <HoverCardContent side="bottom" align="start" className="w-80 ring-0 outline-0 shadow-xl rounded-2xl p-4">
                              <div className="flex gap-4">
                                {company.logo && (
                                  <Image
                                    width={56}
                                    height={56}
                                    src={company.logo}
                                    alt={company.name}
                                    className="size-14 rounded object-cover shrink-0"
                                  />
                                )}
                                <div className="min-w-0">
                                  <p className="font-semibold text-foreground truncate text-base">
                                    {company.name}
                                  </p>
                                  {company.role && (
                                    <p className="text-sm text-muted-foreground truncate">
                                      {company.role}
                                    </p>
                                  )}
                                  {company.period && (
                                    <p className="text-sm text-muted-foreground">
                                      {company.period}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {company.description && (
                                <p className="mt-4 text-sm text-muted-foreground">
                                  {company.description}
                                </p>
                              )}
                            </HoverCardContent>
                          </HoverCard>
                          {index < previousCompanies.length - 2 && <span>, </span>}
                          {index === previousCompanies.length - 2 && <span>, &amp; </span>}
                        </React.Fragment>
                      ))}
                      <span>.</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
