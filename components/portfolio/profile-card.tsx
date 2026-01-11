"use client"

import * as React from "react"
import { motion } from "motion/react"
import { MapPinIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  name: string
  title: string
  location: string
  bio?: string
  className?: string
}

export function ProfileCard({
  name,
  title,
  location,
  bio,
  className,
}: ProfileCardProps) {
  return (
    <div className={cn("flex h-full flex-col justify-between p-8 lg:p-10", className)}>
      {/* Top section */}
      <div className="space-y-6">
        {/* Greeting */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-white/40"
        >
          Hey, I&apos;m
        </motion.span>

        {/* Name with blur-in animation per word */}
        <h1 className="relative">
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.6 + index * 0.05,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="inline-block text-6xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {/* Accent underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-white/20 to-transparent"
          />
        </h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="text-xl text-white/60 md:text-2xl"
        >
          {title}
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex items-center gap-2 text-sm text-white/40"
        >
          <MapPinIcon className="size-4" weight="fill" />
          <span>{location}</span>
        </motion.div>
      </div>

      {/* Bio at bottom */}
      {bio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-8"
        >
          <p className="text-lg leading-relaxed text-white/50 md:text-xl">
            {bio}
          </p>
        </motion.div>
      )}
    </div>
  )
}
