"use client"

import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"
import type { Project } from "@/lib/portfolio-data"

interface ProjectCardProps {
  project: Project
  className?: string
  index?: number
}

export function ProjectCard({ project, className, index = 0 }: ProjectCardProps) {
  const hasDetailedInfo = project.company && project.year
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Get all images (use images array if available, otherwise fallback to single image)
  const allImages = project.images && project.images.length > 0
    ? project.images
    : [project.image]

  const hasMultipleImages = allImages.length > 1

  // Cycle through images on hover
  useEffect(() => {
    if (!isHovered || !hasMultipleImages) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
    }, 1500) // 1.5 second interval

    return () => clearInterval(interval)
  }, [isHovered, hasMultipleImages, allImages.length])

  // Reset to first image when hover ends
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setCurrentImageIndex(0)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full", className)}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full cursor-pointer group project-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card Container */}
        <div className="content-stretch flex flex-col items-start justify-end overflow-clip relative rounded-[50px] [corner-shape:squircle] shrink-0 w-full transition-transform duration-300 group-hover:scale-[0.99]">
          {/* Image/Video Container */}
          <div className="aspect-[678/367.625] relative rounded-[26px] shrink-0 w-full overflow-hidden bg-[#e5e7eb] dark:bg-[#1f2937]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentImageIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0"
              >
                {allImages[currentImageIndex].includes(".mp4") ? (
                  <video src={allImages[currentImageIndex]} autoPlay muted loop className="object-cover rounded-[26px] size-full" />
                ) : (
                <Image
                  src={allImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                      quality={100}
                      placeholder="blur"
                      blurDataURL={allImages[currentImageIndex]}
                  className="object-cover rounded-[26px] size-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Loading overlay */}
            <div className="absolute inset-0 rounded-[26px] transition-opacity duration-500 ease-out bg-[#e5e7eb] dark:bg-[#1f2937] z-10 pointer-events-none opacity-0" />
          </div>

          {/* Badge - Desktop only */}
          {hasDetailedInfo && (
            <div className="absolute bottom-0 left-0 p-3 hidden md:block z-20">
              <div className="bg-white dark:bg-[#1f2937] border border-[#f3f4f6] dark:border-[#374151] border-solid flex items-center justify-center px-3 pt-[5px] pb-[4.8px] rounded-full">
                <p className="font-medium tracking-[0.005em] leading-[1.4] text-[#111827] dark:text-[#f3f4f6] text-base">
                  <span>{project.company || project.title}</span>
                  <span className="text-[#6b7280] dark:text-[#9ca3af] text-mono"> &bull; {project.year}</span>
                </p>
              </div>
            </div>
          )}

          {/* Image indicator dots - only show if multiple images */}
          {hasMultipleImages && isHovered && (
            <div className="absolute top-1/2 -translate-y-1/2 right-3 flex gap-1.5 z-20 flex-col">
              {allImages.map((image, imgIndex) => (
                <div
                  key={image}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    imgIndex === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Description - Desktop */}
        <div className="hidden md:flex content-stretch items-start px-[13px] py-0 -mt-1 relative shrink-0 w-full">
          <p className="font-normal leading-none text-[#6b7280] dark:text-[#9ca3af] text-base tracking-[0.005em] text-left project-hover-text">
            {project.description}
          </p>
        </div>

        {/* Info - Mobile */}
        <div className="md:hidden content-stretch flex flex-col font-normal items-start leading-[1.4] px-[13px] py-0 relative shrink-0 text-base tracking-[0.01em] gap-1">
          <p className="relative shrink-0 text-[#111827] dark:text-[#f3f4f6] text-left project-hover-text">
            <span>{project.company || project.title}</span>
            {project.year && <span className="text-[#6b7280] dark:text-[#9ca3af] text-mono"> &bull; {project.year}</span>}
          </p>
          <p className="relative shrink-0 text-[#6b7280] dark:text-[#9ca3af] w-full text-left font-normal leading-[1.3]">
            {project.description}
          </p>
        </div>
      </a>
    </motion.div>
  )
}
