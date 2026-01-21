"use client"

import { useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AboutHero, BioLink } from "@/components/portfolio/about-hero"
import { InterestsSection } from "@/components/portfolio/interests-section"
import { Footer } from "@/components/portfolio/footer"
import { Hero } from "@/components/portfolio/hero"
import {
  profile,
  socialLinks,
  education,
} from "@/lib/portfolio-data"
import { MagneticLogo } from "@/components/ui/magnetic-logo"

// Experience data for timeline
const experiences = [
  {
    role: "Bachelor Thesis",
    company: "Adapt2Move",
    period: "Apr 2025 - Aug 2025",
    description: "Research and development of adaptive mobility solutions.",
    companyLogo: "/logos/adapt2move.jpeg",
    companyLogoRotation: 12,
  },
  {
    role: "Co-Founder & Developer",
    company: "Paroot Cashback",
    period: "Mar 2022 - Jan 2025",
    description: "Built a full-stack cashback platform connecting consumers with 270+ partner retailers.",
    companyLogo: "/logos/paroot.jpg",
    companyLogoRotation: 12,
  },
  {
    role: "Internship - Front-End Developer",
    company: "hydra newmedia",
    period: "Sept 2023 - Feb 2024",
    description: "Developed modern web applications and user interfaces.",
    companyLogo: "/logos/hydra_newmedia.jpeg",
    companyLogoRotation: 12,
  },
]

// Skills data
const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "Vue.js",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Stripe",
  "Supabase",
  "Docker",
]

const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
]

export default function AboutPage() {
  const [, startTransition] = useTransition()
  const router = useRouter()

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id: string) => {
    if (id === "work") {
      startTransition(() => {
        router.push("/")
      })
    }
  }

  return (
    <main className="bg-white dark:bg-[#0a0a0a] content-stretch flex flex-col items-center relative size-full min-h-screen">
      {/* Header with gradient background */}
      <Hero
        name={profile.name}
        tagline={""}
        previousCompanies={[]}
      />

      {/* Tab Navigation */}
      <div className="content-stretch flex flex-col items-center pb-4 pt-0 px-0 relative shrink-0 w-full">
        <div className="size-full">
          <div className="content-stretch flex flex-col gap-3 items-start pb-0 pt-4 px-16 max-md:px-8 relative w-full">
            <div className="content-stretch flex gap-1 items-start relative shrink-0">
              <Link
                href="/"
                className="content-stretch flex items-center justify-center px-3.5 pt-[5px] pb-[4px] relative rounded-full shrink-0 cursor-pointer transition-all duration-100 ease-out border border-transparent hover:bg-gray-200/40 hover:pt-[3px] hover:pb-[2px] hover:my-[2px]"
              >
                <p className=" font-medium leading-normal tracking-[0.005em] relative shrink-0 text-[1.07em] text-nowrap text-[#9ca3af]">
                  Work
                </p>
              </Link>
              <span className="content-stretch flex items-center justify-center px-3.5 pt-[5px] pb-[4px] relative rounded-full shrink-0 cursor-pointer transition-all duration-100 ease-out border border-transparent bg-gray-200/60 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.02)] !border-white/50">
                <p className=" font-medium leading-normal tracking-[0.005em] relative shrink-0 text-[1.07em] text-nowrap text-[#4b5563]">
                  About
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="px-16 max-md:px-8 w-full pt-3">
          <div className="bg-zinc-100 dark:bg-zinc-800 h-px shrink-0 w-full"></div>
        </div>
      </div>

      {/* Hero Section */}
      <AboutHero
        name={profile.name}
        avatar="/images/nico.jpeg"
        location="Stuttgart"
        education={education[0]}
        email={socialLinks[3].url}
        tagline={profile.tagline}
        bio={
          <>
            <p>
              I love building products—taking an idea from napkin sketch to
              production. Whether it&apos;s a cashback platform like{" "}
              <BioLink href="">Paroot</BioLink> or a developer
              tool like{" "}
              <BioLink href="https://launch-express.com">
                Launch Express
              </BioLink>
              , I get excited about solving real problems with code.
            </p>
            <p>
              My journey started with curiosity about how things work, which led
              me to study computer science and eventually co-found a startup.
              Building{" "}
              <BioLink href="">Paroot Cashback</BioLink> taught
              me more than any course ever could: from payment integrations to
              systems that scale.
            </p>
            <p>
              When I&apos;m not shipping features, you&apos;ll find me working on side
              projects like{" "}
              <BioLink href="https://indiewrapped.com">IndieWrapped</BioLink> and{" "}
              <BioLink href="https://fastdomain.io">
                FastDomain
              </BioLink>
              , exploring new technologies, or gaming with friends. I also love
              traveling and discovering new music.
            </p>
          </>
        }
      />

      {/* Experience Section */}
      <section className="scroll-reveal w-full px-16 max-md:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className=" font-medium text-[#374151] dark:text-[#e5e7eb] text-2xl mb-6">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500 transition-colors" />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className=" font-medium text-[#374151] dark:text-[#e5e7eb] text-base">
                      {exp.role}
                    </span>
                    <span className="text-[#9ca3af]">@</span>
                    <span className="inline-flex items-center gap-1 font-medium text-[#374151] dark:text-[#e5e7eb]">
                        {exp.company}
                      <MagneticLogo
                        image={exp.companyLogo}
                        rotation={exp.companyLogoRotation}
                        size={28}
                        className="-translate-y-0.5 mx-1"
                      />
                    </span>
                  </div>
                  <span className=" text-sm text-[#9ca3af]">
                    {exp.period}
                  </span>
                  {exp.description && (
                    <p className=" text-sm text-[#6b7280] dark:text-[#9ca3af] mt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="scroll-reveal w-full px-16 max-md:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className=" font-medium text-[#374151] dark:text-[#e5e7eb] text-2xl mb-4">
            Technologies
          </h2>
          <p className=" text-[#6b7280] dark:text-[#9ca3af] leading-relaxed">
            {skills.join(" · ")}
          </p>
        </div>
      </section>

      {/* Interests Section */}
      <InterestsSection />

      {/* Footer */}
      <Footer
        name={profile.name}
        email="hello@nico.dev"
        socialLinks={socialLinks}
        navItems={navItems}
        onTabChange={handleNavClick}
      />
    </main>
  )
}
