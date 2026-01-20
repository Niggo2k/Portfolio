"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface Metric {
  value: string
  label: string
}

interface MetricsBarProps {
  metrics: Metric[]
  className?: string
}

export function MetricsBar({ metrics, className }: MetricsBarProps) {
  return (
    <section
      className={cn(
        "scroll-reveal w-full px-16 max-md:px-8 py-8",
        className
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1f2937]/50 border border-gray-100 dark:border-gray-800 rounded-xl p-5 md:p-6 transition-all hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700"
            >
              <div className=" font-bold text-3xl md:text-4xl text-[#1f2937] dark:text-[#f3f4f6] mb-1">
                {metric.value}
              </div>
              <div className=" text-sm text-[#9ca3af] dark:text-[#6b7280]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
