"use client"

import { useRef, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import VariableProximity from "@/components/ui/variable-proximity"
import { AboutHero, BioLink } from "@/components/portfolio/about-hero"
import { MetricsBar, type Metric } from "@/components/portfolio/metrics-bar"
import { InterestsSection, type Interest } from "@/components/portfolio/interests-section"
import { Footer } from "@/components/portfolio/footer"
import {
  profile,
  socialLinks,
  education,
} from "@/lib/portfolio-data"
import {
  GraduationCap,
  MapPin,
  ArrowRight,
  DownloadSimple,
} from "@phosphor-icons/react"

// Experience data for timeline
const experiences = [
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

// Metrics data
const metrics: Metric[] = [
  { value: "270+", label: "Partner Retailers" },
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Technologies" },
]

// Interests data
const interests: Interest[] = [
  { icon: "rocket", label: "Building side projects" },
  { icon: "gamepad", label: "Gaming" },
  { icon: "travel", label: "Travel" },
  { icon: "music", label: "Music" },
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()
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
      <motion.div
        ref={containerRef}
        className="content-stretch flex flex-col items-start relative shrink-0 w-full overflow-hidden bg-[linear-gradient(190deg,#a8c0ff_0%_8%,#b8caff_15%,#e8d4ff_22%,#f8e0f8_28%,#fff0fa,#fffeff_42%,#fff_55%_100%)] dark:bg-[linear-gradient(190deg,#1a1033_0%_8%,#1c1535_15%,#1f1238_22%,#1e1030_28%,#1a0f28,#0f0a14_42%,#0a0a0a_55%_100%)] bg-size-[120%_120%] bg-top-right"
        initial={{ backgroundPosition: "0% 49%" }}
        animate={{
          backgroundPosition: ["0% 49%", "100% 51%", "0% 49%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: [0.45, 0, 0.55, 1],
        }}
      >
        <div className="absolute inset-0 pointer-events-none bg-repeat bg-top-right bg-size-auto opacity-80" style={{ background: 'url(/images/grain-texture.png)' }} />

        {/* Watermark */}
        <div
          className="absolute top-0 left-0 z-0 pointer-events-none overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%), linear-gradient(to right, black 0%, black 50%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%), linear-gradient(to right, black 0%, black 50%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
          }}
        >
          <span className="font-mono text-[120px] md:text-[180px] no-wrap font-bold tracking-tight leading-none block px-4 pt-2 border-border border-b-input from-card/100 to-card/20 dark:border-border/10 dark:border-t-border/30 dark:from-primary/15 dark:to-primary/5 border bg-linear-to-b dark:border-b-0 text-foreground/[0.035] dark:text-foreground/[0.06] backdrop-blur-[1px]">
            NICO EPP NICO EPP<br />
            EPP NICO EPP NICO
          </span>
        </div>

        {/* Navigation */}
        <div className="relative shrink-0 w-full z-2">
          <div className="size-full">
            <div className="content-stretch flex flex-col items-start px-16 pt-8 pb-8 max-md:px-8 max-md:pt-8 max-md:pb-4 relative w-full">
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                <Link href="/" className="relative shrink-0 size-11 hover:opacity-80 transition-opacity">
                  <Image width={44} height={44} alt="Logo" className="object-contain pointer-events-none size-full" src="/logo-ne.svg" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="relative shrink-0 w-full z-2">
          <div className="size-full">
            <div className="content-stretch flex flex-col gap-6 items-start pb-10 pt-8 px-16 max-md:px-8 max-md:pt-16 max-md:pb-6 relative w-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <VariableProximity
                  label="About Me"
                  containerRef={containerRef}
                  className="tracking-[0.0125em] leading-normal relative shrink-0 text-[#1f2937] dark:text-[#f3f4f6] text-4xl w-full max-md:text-4xl"
                  style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}
                  fromFontVariationSettings="'wght' 400, 'wdth' 100"
                  toFontVariationSettings="'wght' 900, 'wdth' 125"
                  radius={60}
                  falloff="gaussian"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
        email="hello@nico.dev"
        tagline="Caffeinated Builder Mode."
        bio={
          <>
            <p>
              I love building products—taking an idea from napkin sketch to
              production. Whether it's a cashback platform like{" "}
              <BioLink href="https://paroot.de">Paroot</BioLink> or a developer
              tool like{" "}
              <BioLink href="https://github.com/Niggo2k/launch-express-website">
                Launch Express
              </BioLink>
              , I get excited about solving real problems with code.
            </p>
            <p>
              My journey started with curiosity about how things work, which led
              me to study computer science and eventually co-found a startup.
              Building{" "}
              <BioLink href="https://paroot.de">Paroot Cashback</BioLink> taught
              me more than any course ever could: from payment integrations to
              systems that scale.
            </p>
            <p>
              When I'm not shipping features, you'll find me working on side
              projects like{" "}
              <BioLink href="https://indiewrapped.com">IndieWrapped</BioLink> and{" "}
              <BioLink href="https://github.com/Niggo2k/Fastdomain2">
                FastDomain
              </BioLink>
              , exploring new technologies, or gaming with friends. I also love
              traveling and discovering new music.
            </p>
          </>
        }
      />

      {/* Metrics Bar */}
      <MetricsBar metrics={metrics} />

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
                    {exp.url ? (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" font-medium text-[#374151] dark:text-[#e5e7eb] hover:text-blue-500 transition-colors"
                      >
                        {exp.company}
                      </a>
                    ) : (
                        <span className=" font-medium text-[#374151] dark:text-[#e5e7eb]">
                        {exp.company}
                      </span>
                    )}
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

      {/* Education Section */}
      <section className="scroll-reveal w-full px-16 max-md:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className=" font-medium text-[#374151] dark:text-[#e5e7eb] text-2xl mb-6">
            Education
          </h2>
          {education.map((edu, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl p-5 border border-gray-100 dark:border-gray-800"
            >
              <div className="shrink-0 size-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                <GraduationCap className="size-6 text-indigo-600 dark:text-indigo-400" weight="duotone" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className=" font-medium text-[#374151] dark:text-[#e5e7eb] text-base">
                  {edu.degree} in {edu.field}
                </h3>
                <p className=" text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  {edu.institution}
                </p>
                <div className="flex items-center gap-3 mt-2 text-sm text-[#9ca3af]">
                  <span>{edu.period}</span>
                  {edu.location && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" weight="fill" />
                        {edu.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
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
      <InterestsSection interests={interests} />

      {/* CTA Section */}
      <section className="scroll-reveal w-full px-16 max-md:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl p-8 md:p-12 border border-indigo-100 dark:border-indigo-900/50">
            <h2 className=" font-semibold text-2xl md:text-3xl text-[#1f2937] dark:text-[#f3f4f6] mb-4">
              Let's build something together
            </h2>
            <p className=" text-[#6b7280] dark:text-[#9ca3af] mb-8 max-w-xl">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hello@nico.dev"
                className="inline-flex items-center gap-2 bg-[#1f2937] dark:bg-white text-white dark:text-[#1f2937]  font-medium px-6 py-3 rounded-full hover:bg-[#374151] dark:hover:bg-gray-100 transition-colors"
              >
                Get in touch
                <ArrowRight className="size-4" weight="bold" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-[#374151] dark:text-[#e5e7eb]  font-medium px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                View my work
              </Link>
              <button
                className="inline-flex items-center gap-2 text-[#6b7280] dark:text-[#9ca3af]  font-medium px-6 py-3 rounded-full hover:text-[#374151] dark:hover:text-[#e5e7eb] transition-colors"
                onClick={() => alert('Resume download coming soon!')}
              >
                <DownloadSimple className="size-4" weight="bold" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>

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
