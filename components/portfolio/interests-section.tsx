"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Rocket,
  GameController,
  Airplane,
  MusicNotes,
} from "@phosphor-icons/react"

export interface Interest {
  icon: "rocket" | "gamepad" | "travel" | "music"
  label: string
}

const iconMap = {
  rocket: Rocket,
  gamepad: GameController,
  travel: Airplane,
  music: MusicNotes,
}

interface InterestsSectionProps {
  interests: Interest[]
  className?: string
}

export function InterestsSection({ interests, className }: InterestsSectionProps) {
  return (
    <section
      className={cn(
        "scroll-reveal w-full px-16 max-md:px-8 py-8",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className=" font-medium text-[#374151] dark:text-[#e5e7eb] text-2xl mb-6">
          When I'm not coding
        </h2>
        <div className="flex flex-wrap gap-3">
          {interests.map((interest, index) => {
            const Icon = iconMap[interest.icon]
            return (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-full px-4 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {Icon && (
                  <Icon
                    className="size-5 text-[#6b7280] dark:text-[#9ca3af]"
                    weight="duotone"
                  />
                )}
                <span className=" text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  {interest.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
