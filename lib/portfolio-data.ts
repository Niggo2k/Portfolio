export interface Project {
  id: string
  projectId?: string // Terminal-style ID like "PRJ-001"
  title: string
  description: string
  url: string
  status: "live" | "wip" | "archived"
  image: string
  icon?: string
  tags?: string[]
  year?: string
}

export interface SocialLink {
  platform: "github" | "twitter" | "email"
  url: string
  label: string
}

export interface ProfileData {
  name: string
  title: string
  location: string
  bio?: string
  avatarUrl?: string
}

export const profile: ProfileData = {
  name: "Nico",
  title: "Full-Stack Developer",
  location: "Stuttgart, Deutschland",
  bio: "Crafting digital experiences with care. Building products that solve real problems and make people's lives easier.",
}

// Personal info for NICO OS theming
export const personalInfo = {
  name: "Nico",
  birthYear: 2000,
  location: "Stuttgart, Germany",
  timezone: "Europe/Berlin",
  careerStart: 2020,
  title: "Full-Stack Developer",
  hobbies: ["Gaming", "Music", "Coffee"],
  stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  osVersion: "1.0",
  osBuild: "2000",
}

export const projects: Project[] = [
  {
    id: "fast-domain",
    projectId: "PRJ-001",
    title: "FastDomain",
    description: "Find the best domain deal instantly. Compare prices across registrars in real-time.",
    url: "https://github.com/Niggo2k/Fastdomain2",
    status: "wip",
    image: "/projects/fastdomain.jpg",
    tags: ["NEXTJS", "TYPESCRIPT", "SAAS"],
    year: "2024",
  },
  {
    id: "launch-express",
    projectId: "PRJ-002",
    title: "Launch Express",
    description: "Ship your next SaaS faster. A Next.js boilerplate with auth, payments, and everything you need.",
    url: "https://github.com/Niggo2k/launch-express-website",
    status: "live",
    image: "/projects/launch-express.png",
    tags: ["NEXTJS", "STRIPE", "BOILERPLATE"],
    year: "2024",
  },
  {
    id: "indie-wrapped",
    projectId: "PRJ-003",
    title: "IndieWrapped",
    description: "Year in review for indie hackers. Visualize your progress and celebrate your wins.",
    url: "https://github.com/Niggo2k/IndieWrapped",
    status: "live",
    image: "/projects/indiewrapped.jpg",
    tags: ["REACT", "DATA_VIZ", "GEMINI"],
    year: "2023",
  },
  {
    id: "smart-parcel-box",
    projectId: "PRJ-004",
    title: "Smart Parcel Box",
    description: "IoT-enabled smart parcel box with mobile web app. Built as a university project.",
    url: "https://github.com/Niggo2k/smart-parcel-box",
    status: "archived",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    tags: ["IOT", "MOBILE", "STUDENT_PROJECT"],
    year: "2022",
  },
  {
    id: "hm-next",
    projectId: "PRJ-005",
    title: "Homematic Dashboard",
    description: "Modern control dashboard for Homematic smart home devices. Built with Next.js.",
    url: "https://github.com/Niggo2k/hm-next",
    status: "live",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    tags: ["NEXTJS", "SMART_HOME", "DASHBOARD"],
    year: "2023",
  },
  {
    id: "maily",
    projectId: "PRJ-006",
    title: "Maily",
    description: "AI-powered email client. Smart inbox management with natural language processing.",
    url: "https://github.com/Niggo2k/maily",
    status: "archived",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop",
    tags: ["AI", "EMAIL", "STUDENT_PROJECT"],
    year: "2022",
  },
]

export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    url: "https://github.com/Niggo2k",
    label: "GitHub",
  },
  {
    platform: "twitter",
    url: "https://x.com/made_by_nico",
    label: "Twitter/X",
  },
  {
    platform: "email",
    url: "mailto:hello@nico.dev",
    label: "Email",
  },
]

export const stuttgartCoords = {
  latitude: 48.7758,
  longitude: 9.1829,
  zoom: 11,
}
