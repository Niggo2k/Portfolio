"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Experience {
  role: string
  company: string
  url?: string
  period: string
  description?: string
}

const experiences: Experience[] = [
  {
    role: "Bachelor Thesis",
    company: "Adapt2Move",
    period: "Apr 2025 - Aug 2025",
    description: "Research and development of adaptive mobility solutions.",
  },
  {
    role: "Co-Founder & Developer",
    company: "Paroot Cashback",
    url: "https://paroot.de",
    period: "Mar 2022 - Jan 2025",
    description: "Built a full-stack cashback platform connecting consumers with 270+ partner retailers.",
  },
  {
    role: "Front-End Developer",
    company: "hydra newmedia",
    period: "Sept 2023 - Feb 2024",
    description: "Developed modern web applications and user interfaces.",
  },
]

interface AboutContentProps {
  bio: string
  skills?: string[]
  className?: string
}

export function AboutContent({ bio, skills, className }: AboutContentProps) {
  return (
    <div
      className={cn(
        "max-w-3xl px-16 py-8 max-md:px-8",
        className
      )}
    >
      {/* Bio Section */}
      <div className="mb-12">
        <h2 className=" font-medium text-foreground text-2xl mb-4">
          Hi!
        </h2>
        <p className=" font-normal text-lg leading-relaxed text-muted-foreground">
          {bio}
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-12">
        <h2 className=" font-medium text-foreground text-2xl mb-6">
          Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative pl-6 border-l-2 border-border hover:border-muted-foreground/30 transition-colors"
            >
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-muted-foreground/40 group-hover:bg-muted-foreground/60 transition-colors" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className=" font-medium text-foreground text-base">
                    {exp.role}
                  </span>
                  <span className="text-muted-foreground">@</span>
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" font-medium text-foreground hover:opacity-70 hover:underline underline-offset-2 transition-all"
                    >
                      {exp.company}
                    </a>
                  ) : (
                      <span className=" font-medium text-foreground">
                      {exp.company}
                    </span>
                  )}
                </div>
                <span className=" text-sm text-muted-foreground">
                  {exp.period}
                </span>
                {exp.description && (
                  <p className=" text-sm text-muted-foreground mt-1">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section - Minimal */}
      {skills && skills.length > 0 && (
        <div>
          <h2 className=" font-medium text-foreground text-2xl mb-4">
            Technologies
          </h2>
          <p className=" text-muted-foreground leading-relaxed">
            {skills.join(" · ")}
          </p>
        </div>
      )}
    </div>
  )
}
