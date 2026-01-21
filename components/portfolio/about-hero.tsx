"use client"

import * as React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { IconGraduateCap, IconMapPin } from "@central-icons-react/round-filled-radius-3-stroke-2"
import { LanyardWrapper } from "./lanyard-wrapper"

interface Education {
  degree: string
  institution: string
  period: string
}

interface AboutHeroProps {
  name: string
  avatar?: string
  location: string
  education: Education
  bio: React.ReactNode
  tagline?: string
  email: string
  className?: string
}

export function AboutHero({
  name,
  avatar,
  location,
  education,
  bio,
  tagline,
  email,
  className,
}: AboutHeroProps) {
  const interactionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      className={cn(
        "scroll-reveal relative w-full py-12 max-md:py-8",
        className
      )}
    >
      {/* Mobile: Stacked lanyard at top */}
      <div className="md:hidden relative w-full h-[350px] mb-8 pointer-events-none">
        <div className="pointer-events-auto">
          <LanyardWrapper className="w-full h-[350px]" />
        </div>
      </div>

      {/* Desktop: Canvas with pointer-events-none - events captured via overlay */}
      <div className="hidden md:block absolute left-0 top-0 w-full h-full pointer-events-none z-10">
        <LanyardWrapper className="w-full h-full" eventSource={interactionRef} />
      </div>

      {/* Interaction overlay - positioned where the card typically hangs */}
      <div
        ref={interactionRef}
        className="hidden md:block absolute left-0 top-[15%] w-[45%] h-[70%] pointer-events-auto z-20"
      />

      {/* Text content - stays in max-width container, pushed to right on desktop */}
      <div className="max-w-6xl mx-auto px-16 max-md:px-8 relative">
        <div className="md:pl-8 max-w-2xl ml-auto">
          {/* Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            {/* Greeting */}
            <h2 className="font-medium text-3xl text-foreground">
              Hey, I&apos;m {name.split(" ")[0]}!
            </h2>

            {/* Info Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconMapPin className="size-4 my-1" />
                <span className="text-base tracking-[0.005em]">
                  {location}
                </span>
              </div>
              <div className="flex items-start md:items-center gap-2 text-muted-foreground">
                <IconGraduateCap className="size-4 shrink-0 my-1" />
                <span className="text-base tracking-[0.005em]">
                  {education.degree} / {education.institution}
                </span>
              </div>
            </div>

            {/* Bio Paragraphs */}
            <div className="flex flex-col gap-4 text-base tracking-[0.005em] leading-relaxed text-muted-foreground">
              {bio}
            </div>

            {/* Tagline */}
            {tagline && (
              <p className="text-base tracking-[0.005em] text-muted-foreground">
                3 words to describe me:{" "}
                <em className="text-foreground">{tagline}</em>
              </p>
            )}

            {/* Availability Indicator */}
            <div className="flex justify-center md:justify-start">
              <span className="inline-flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm">
                <span className="relative inline-flex items-center group justify-center rounded-[999px] transition-all ease-in-out w-fit bg-emerald-50 dark:bg-emerald-950/30 align-middle [cursor:inherit] before:content-[''] before:absolute before:-inset-[2px] before:rounded-[999px] before:pointer-events-none md:gap-0 duration-300">
                  <span className="relative shrink-0 size-[16px] overflow-visible">
                    <span className="green-pulse-ring"></span>
                    <svg className="block size-full relative z-10" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16"><g id="Background"><rect fill="var(--fill-0, #A7F3D0)" height="16" rx="8" width="16"></rect><circle cx="8" cy="8" fill="var(--fill-0, #10B981)" id="Ellipse 1" r="4"></circle></g></svg>
                  </span>
                </span>
                <span>
                  Working on something cool?{" "}
                  <a
                    href={email}
                    className="font-medium underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    Get in touch
                  </a>
                  !
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Bio link component for inline project links
export function BioLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-foreground hover:text-primary transition-colors"
    >
      {children}
    </a>
  )
}
