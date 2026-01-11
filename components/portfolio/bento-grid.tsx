"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        "auto-rows-[minmax(180px,auto)]",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  size?: "1x1" | "2x1" | "1x2" | "2x2"
  href?: string
  spotlight?: boolean
  spotlightColor?: string
}

const sizeClasses = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "sm:col-span-2 row-span-1",
  "1x2": "col-span-1 sm:row-span-2",
  "2x2": "sm:col-span-2 sm:row-span-2",
}

export function BentoCard({
  children,
  className,
  size = "1x1",
  href,
  spotlight = true,
  spotlightColor = "rgba(255, 255, 255, 0.03)",
}: BentoCardProps) {
  const cardRef = React.useRef<HTMLDivElement | HTMLAnchorElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = React.useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  const cardContent = (
    <>
      {/* Spotlight effect */}
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500"
          style={{
            opacity,
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}
      {/* Inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500"
        style={{
          opacity: opacity * 0.5,
          boxShadow: "inset 0 0 60px rgba(255,255,255,0.03)",
        }}
      />
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </>
  )

  const cardClasses = cn(
    "group relative overflow-hidden rounded-3xl",
    "bg-[#0a0a0a] border border-white/[0.08]",
    "shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,0,0,0.1)]",
    "transition-all duration-500 ease-out",
    "hover:border-white/[0.12]",
    "hover:shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_8px_16px_rgba(0,0,0,0.2),0_24px_48px_rgba(0,0,0,0.2)]",
    "hover:-translate-y-1",
    sizeClasses[size],
    className
  )

  const motionProps = {
    variants: {
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
        filter: "blur(10px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring" as const,
          stiffness: 100,
          damping: 20,
          mass: 0.8,
        },
      },
    },
  }

  if (href) {
    return (
      <motion.a
        ref={cardRef as React.RefObject<HTMLAnchorElement | null>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
      >
        {cardContent}
      </motion.a>
    )
  }

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLDivElement | null>}
      className={cardClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {cardContent}
    </motion.div>
  )
}
