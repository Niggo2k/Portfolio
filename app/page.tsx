"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Hero } from "@/components/portfolio/hero"
import { TabNav } from "@/components/portfolio/tab-nav"
import { ProjectGrid } from "@/components/portfolio/project-grid"
import { ProjectList } from "@/components/portfolio/project-list"
import { Footer } from "@/components/portfolio/footer"
import {
  profile,
  projects,
  socialLinks,
  previousCompanies,
} from "@/lib/portfolio-data"

const tabs = [
  { id: "work", label: "Work" },
  { id: "about", label: "About", href: "/about" },
]

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("work")
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  const handleNavClick = (id: string) => {
    if (id === "about") {
      startTransition(() => {
        router.push("/about")
      })
      return
    }
    setActiveTab(id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="bg-white dark:bg-[#0a0a0a] content-stretch flex flex-col items-center relative size-full min-h-screen">

      <Hero
        name={profile.name}
        tagline={profile.tagline}
        previousCompanies={previousCompanies}
      />

      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <section className="pb-8 w-full">
        <ProjectGrid projects={projects.slice(0, 4)} />
        <ProjectList projects={projects.slice(4)} />
      </section>

      <Footer
        name={profile.name}
        email="hello@nico.dev"
        socialLinks={socialLinks}
        navItems={tabs}
        onTabChange={handleNavClick}
      />
    </main>
  )
}
