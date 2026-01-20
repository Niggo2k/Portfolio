"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { IconGraduateCap, IconMapPin } from "@central-icons-react/round-filled-radius-3-stroke-2"

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
  return (
    <section
      className={cn(
        "scroll-reveal w-full px-16 max-md:px-8 py-12 max-md:py-8",
        className
      )}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">
          {/* Left: Profile Image */}
          <div className="shrink-0 w-64 md:w-72">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                width={288}
                height={288}
                className="rounded-lg object-cover w-full aspect-square"
                priority
              />
            ) : (
                <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/90">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </span>
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6 flex-1 text-center md:text-left">
            {/* Greeting */}
            <h2 className="font-medium text-3xl text-gray-600 dark:text-gray-200">
              Hey, I&apos;m {name.split(" ")[0]}!
            </h2>

            {/* Info Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <IconMapPin className="size-4" />
                <span className=" text-base tracking-[0.005em]">
                  {location}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <IconGraduateCap className="size-4" />
                <span className=" text-base tracking-[0.005em]">
                  {education.degree} / {education.institution}
                </span>
              </div>
            </div>

            {/* Bio Paragraphs */}
            <div className="flex flex-col gap-4  text-base tracking-[0.005em] leading-relaxed text-gray-600 dark:text-gray-300">
              {bio}
            </div>

            {/* Tagline */}
            {tagline && (
              <p className=" text-base tracking-[0.005em] text-gray-600 dark:text-gray-300">
                3 words to describe me:{" "}
                <em className="text-gray-700 dark:text-gray-200">{tagline}</em>
              </p>
            )}

            {/* Availability Indicator */}
            <div className="flex justify-center md:justify-start">
              <span className="inline-flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full  text-sm">
                <span className="relative flex size-2.5">
                  <span className="green-pulse-ring"></span>
                  <span className="relative inline-flex rounded-full size-2.5 bg-emerald-400"></span>
                </span>
                <span>
                  Working on something cool?{" "}
                  <a
                    href={`mailto:${email}`}
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
      className="font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {children}
    </a>
  )
}
