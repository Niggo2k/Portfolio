# Nico Epp Portfolio - PRD (Refined)

> Minimalist portfolio inspired by [liumichelle.com](https://www.liumichelle.com/)
> **Timeline:** 1-2 weeks | **Priority:** Ship fast, cut projects if needed

---

## Design Principles

- **Aesthetic:** Clean, minimalist, generous whitespace
- **Typography:** Match Michelle Liu's style (modern, clean)
- **Theme:** Light only (no dark mode)
- **Tone:** Friendly & approachable
- **Animations:** Moderate polish (scroll reveals, hover states, smooth transitions)
- **Responsive:** Equal priority desktop/mobile

---

## Tech Stack

- **Framework:** Next.js 16 with App Router (static export)
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui with Base UI primitives
- **Animations:** Framer Motion
- **Analytics:** Vercel Analytics
- **Hosting:** Vercel

**Not needed:** tRPC, PostgreSQL, Redis, complex backend

---

## Site Structure

### Navigation
Two tabs only:
- **Projects** (default/home)
- **About**

### Hero Section (Full Viewport)
- Name: **Nico Epp**
- Tagline: **"Crafting digital experiences from idea to scale"**
- Subtitle: **Full-Stack Developer & Co-Founder**
- Location: **Göppingen, Germany**
- Social links: LinkedIn, GitHub, X

### Projects Section
**Featured Projects (larger cards):**
1. Paroot Cashback
2. IndieWrapped
3. FastDomain

**Secondary Projects (smaller cards):**
4. Launch Express
5. Homematic Dashboard
6. Smart Parcel Box

**Card Design:**
- Simple cards (no case file aesthetic, no case numbers)
- Actual product screenshots
- 3-4 key technology badges per project
- Brief description (2-3 sentences)
- Links: Live site and/or GitHub

### Project Detail Pages
Each project gets its own page with:
- Hero with project screenshot
- Brief description
- Technologies used
- Links (live site, GitHub)
- No case studies needed

### About Page
- **Avatar:** AI-generated illustration (placeholder for now)
- **Bio:** Brief, friendly paragraph
- **Experience:** Recent roles only (2022+)
  - Co-Founder & Developer @ Paroot Cashback (Mar 2022 - Jan 2025)
  - Front-End Developer @ hydra newmedia (Sept 2023 - Feb 2024)
  - Bachelor Thesis @ Adapt2Move (Apr 2025 - Aug 2025)
  - *Skip ORA (too new) and Schuler Group (too old)*
- **Skills:** Minimal - let projects speak for themselves

### Footer
- Contact CTA: "Let's work together!"
- Email link
- Social links: LinkedIn, GitHub, X
- Project stats (Total: 6, Active: 2, Technologies: 20+)
- "Built with Next.js & TypeScript"
- Last updated date

---

## Project Data

### Project #001: Paroot Cashback
- **Period:** 2022 - 2025 (Completed)
- **Description:** Full-stack cashback platform connecting consumers with 270+ partner retailers. Processed thousands of transactions with automated reward systems.
- **Technologies:** Laravel, Vue.js, MySQL, Tailwind CSS
- **Links:** https://paroot.de
- **Featured:** Yes
- **Screenshot needs:** Dashboard view, partner retailers page

### Project #002: IndieWrapped
- **Period:** 2023
- **Description:** Year-in-review generator for indie hackers. Visualizes annual progress, milestones, and achievements with AI-powered insights.
- **Technologies:** Next.js, React, Gemini AI, Tailwind CSS
- **Links:** https://indiewrapped.com, GitHub
- **Featured:** Yes
- **Screenshot needs:** Main visualization page, results view

### Project #003: FastDomain
- **Period:** 2024 - Present
- **Description:** Real-time domain price comparison across multiple registrars. Helps users find the best deals for domain names.
- **Technologies:** Next.js, TypeScript, tRPC, PostgreSQL
- **Links:** GitHub
- **Featured:** Yes
- **Screenshot needs:** Search results, comparison view

### Project #004: Launch Express
- **Period:** 2024
- **Description:** Production-ready Next.js boilerplate with authentication, payments, and database integration.
- **Technologies:** Next.js, Stripe, Supabase, TypeScript
- **Links:** GitHub
- **Featured:** No
- **Screenshot needs:** Landing page or code structure

### Project #005: Homematic Dashboard
- **Period:** 2023
- **Description:** Modern control interface for Homematic smart home devices with real-time status monitoring.
- **Technologies:** Next.js, WebSocket, REST API, Tailwind CSS
- **Links:** GitHub
- **Featured:** No
- **Screenshot needs:** Dashboard interface

### Project #006: Smart Parcel Box
- **Period:** 2022
- **Description:** University project: IoT-enabled smart parcel box with mobile app for secure package delivery.
- **Technologies:** React Native, Node.js, Arduino, MQTT
- **Links:** GitHub
- **Featured:** No
- **Screenshot needs:** Mobile app interface, hardware setup

---

## SEO Strategy (High Priority)

- **Title:** Nico Epp | Full-Stack Developer
- **Description:** Full-stack developer crafting digital experiences from idea to scale. Creator of Paroot Cashback, IndieWrapped, and FastDomain.
- **Keywords:** Nico Epp, Full-Stack Developer, Next.js, Laravel, React, Vue.js
- Meta tags for all pages
- Structured data (JSON-LD) for person and projects
- Sitemap and robots.txt
- OG images for social sharing

---

## Assets Needed

### Screenshots to Capture
| Project | Views Needed |
|---------|--------------|
| Paroot Cashback | Dashboard, partner retailers |
| IndieWrapped | Main visualization, results |
| FastDomain | Search results, comparison |
| Launch Express | Landing page |
| Homematic Dashboard | Main dashboard |
| Smart Parcel Box | Mobile app, hardware |

### Other Assets
- [ ] AI-generated avatar for About page
- [ ] OG image (generic site preview)
- [ ] Favicon

---

## Implementation Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Clean up existing project structure
- [ ] Configure Tailwind with design tokens
- [ ] Set up base layout with navigation
- [ ] Create reusable components (Button, Card, etc.)

### Phase 2: Hero & Projects (Days 3-5)
- [ ] Build full-viewport hero section
- [ ] Create project card components (featured + secondary)
- [ ] Build projects grid layout
- [ ] Add project data from lib/portfolio-data.ts

### Phase 3: Project Pages (Days 6-7)
- [ ] Create dynamic project detail pages
- [ ] Add project screenshots (placeholders initially)
- [ ] Link between projects and detail pages

### Phase 4: About Page (Days 8-9)
- [ ] Build about page layout
- [ ] Add bio section with avatar placeholder
- [ ] Add experience timeline (2022+)
- [ ] Keep skills minimal

### Phase 5: Polish (Days 10-12)
- [ ] Add animations (scroll reveals, hovers, transitions)
- [ ] Build footer with contact CTA
- [ ] SEO: meta tags, structured data, sitemap
- [ ] Vercel Analytics integration
- [ ] Responsive testing
- [ ] Replace placeholder assets

### Phase 6: Launch (Days 13-14)
- [ ] Final testing
- [ ] Deploy to Vercel
- [ ] Custom domain setup
- [ ] Share on social media

---

## Contact Information

- **Email:** [your email]
- **LinkedIn:** linkedin.com/in/nicoepp/
- **GitHub:** github.com/Niggo2k
- **X/Twitter:** x.com/made_by_nico
- **Location:** Göppingen, Baden-Württemberg, Deutschland

---

## Notes

- Cut projects if timeline gets tight (launch with 3 featured only)
- Use placeholder images initially, replace with real screenshots
- Match Michelle Liu's typography closely
- Keep animations subtle but polished
- Prioritize mobile responsiveness equally with desktop
