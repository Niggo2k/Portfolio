"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
}

interface TabNavProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function TabNav({ tabs, activeTab, onTabChange, className }: TabNavProps) {
  return (
    // <nav
    //   className={cn(
    //     "flex items-center gap-1 px-6 py-4 md:px-8 lg:px-12",
    //     className
    //   )}
    // >
    //   {tabs.map((tab) => (
    //     <button
    //       key={tab.id}
    //       onClick={() => onTabChange(tab.id)}
    //       className={cn(
    //         "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
    //         activeTab === tab.id
    //           ? "bg-foreground text-background"
    //           : "text-muted-foreground hover:bg-muted hover:text-foreground"
    //       )}
    //     >
    //       {tab.label}
    //     </button>
    //   ))}
    // </nav>
    <div className="content-stretch flex flex-col items-center pb-4 pt-0 px-0 relative shrink-0 w-full"><div className="size-full"><div className="content-stretch flex flex-col gap-3 items-start pb-0 pt-4 px-16 max-md:px-8 relative w-full"><div className="content-stretch flex gap-1 items-start relative shrink-0"><button className="content-stretch flex items-center justify-center px-3.5 pt-[5px] pb-[4px] relative rounded-full shrink-0 cursor-pointer transition-all duration-100 ease-out border border-transparent bg-gray-200/60 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.02)] !border-white/50"><p className="font-['Figtree',sans-serif] font-medium leading-normal tracking-[0.005em] relative shrink-0 text-[1.07em] text-nowrap text-[#4b5563]">Work</p></button><button className="content-stretch flex items-center justify-center px-3.5 pt-[5px] pb-[4px] relative rounded-full shrink-0 cursor-pointer transition-all duration-100 ease-out border border-transparent hover:bg-gray-200/40 hover:pt-[3px] hover:pb-[2px] hover:my-[2px]"><p className="font-['Figtree',sans-serif] font-medium leading-normal tracking-[0.005em] relative shrink-0 text-[1.07em] text-nowrap text-[#9ca3af]">Art</p></button><button className="content-stretch flex items-center justify-center px-3.5 pt-[5px] pb-[4px] relative rounded-full shrink-0 cursor-pointer transition-all duration-100 ease-out border border-transparent hover:bg-gray-200/40 hover:pt-[3px] hover:pb-[2px] hover:my-[2px]"><p className="font-['Figtree',sans-serif] font-medium leading-normal tracking-[0.005em] relative shrink-0 text-[1.07em] text-nowrap text-[#9ca3af]">About</p></button></div></div></div><div className="px-16 max-md:px-8 w-full pt-3"><div className="bg-zinc-100 h-px shrink-0 w-full"></div></div></div>
  )
}
