# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Uses shadcn/ui components with Base UI primitives.

## Commands

```bash
bun dev      # Start development server
bun build    # Production build
bun start    # Start production server
bun lint     # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router (RSC enabled)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS 4** with CSS variables (OKLch color space)
- **@base-ui/react** - Unstyled component primitives
- **shadcn/ui** - Component library (style: "base-nova", icons: Phosphor)
- **next-themes** - Light/dark mode theming

### Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - Reusable UI components wrapping Base UI primitives
- `lib/utils.ts` - `cn()` utility for merging Tailwind classes
- `types/` - Auto-generated Next.js route types

### Component Patterns
- UI components use CVA (class-variance-authority) for variant management
- `data-slot` attributes used for CSS selectors
- Compound component pattern (e.g., Card has CardHeader, CardTitle, CardContent, etc.)
- All interactive components are client components (`"use client"`)

### Path Alias
- `@/*` maps to project root (e.g., `@/components/ui/button`)

### Styling Conventions
- Semantic color variables defined in `app/globals.css`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Tailwind group modifiers for parent-child state communication
- Focus states use `focus-visible` for keyboard accessibility
