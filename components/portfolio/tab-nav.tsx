"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  href?: string  // Optional href for link-based tabs
}

interface TabNavProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function TabNav({ tabs, activeTab, onTabChange, className }: TabNavProps) {
  return (
    <div className="content-stretch flex flex-col items-center pb-4 pt-0 px-0 relative shrink-0 w-full">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-3 items-start pb-0 pt-4 px-16 max-md:px-8 relative w-full">
          <div className="content-stretch flex gap-1 items-start relative shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              const baseClasses = "content-stretch flex items-center justify-center px-3.5 pt-[5px] pb-[4px] relative rounded-full shrink-0 cursor-pointer transition-all duration-100 ease-out border border-transparent"
              const activeClasses = "bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.02)] !border-white/50 dark:!border-gray-600/50"
              const inactiveClasses = "hover:bg-gray-200/40 dark:hover:bg-gray-700/40 hover:pt-[3px] hover:pb-[2px] hover:my-[2px]"
              const textActiveClasses = "text-[#4b5563] dark:text-[#e5e7eb]"
              const textInactiveClasses = "text-[#9ca3af] dark:text-[#6b7280]"

              // If tab has an href, render as Link
              if (tab.href) {
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={cn(
                      baseClasses,
                      isActive ? activeClasses : inactiveClasses
                    )}
                  >
                    <p className={cn(
                      " font-medium leading-normal tracking-[0.005em] relative shrink-0 text-[1.07em] text-nowrap",
                      isActive ? textActiveClasses : textInactiveClasses
                    )}>
                      {tab.label}
                    </p>
                  </Link>
                )
              }

              // Otherwise render as button
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    baseClasses,
                    isActive ? activeClasses : inactiveClasses
                  )}
                >
                  <p className={cn(
                    " font-medium leading-normal tracking-[0.005em] relative shrink-0 text-[1.07em] text-nowrap",
                    isActive ? textActiveClasses : textInactiveClasses
                  )}>
                    {tab.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="px-16 max-md:px-8 w-full pt-3">
        <div className="bg-zinc-100 dark:bg-zinc-800 h-px shrink-0 w-full"></div>
      </div>
    </div>
  )
}
