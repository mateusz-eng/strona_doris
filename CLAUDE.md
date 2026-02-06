# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

Node.js is managed via nvm — source it before any npm/node command:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
```

| Command              | Purpose                    |
|----------------------|----------------------------|
| `npm run dev`        | Start dev server           |
| `npm run build`      | Production build (to dist/)|
| `npm run preview`    | Preview production build   |

No test runner or linter is configured.

## Stack

- **Astro 5** with TypeScript (strict, extends `astro/tsconfigs/strict`)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`)
- **Content Collections** (Astro 5 Content Layer API with `glob` loader) for training pages

## Architecture

**Single layout:** `src/layouts/BaseLayout.astro` wraps every page with Navbar, Footer, Google Fonts (Playfair Display + Inter), global CSS, and a fade-in IntersectionObserver for `.fade-in` elements.

**Pages:**
- `/` — homepage (`src/pages/index.astro`) — fetches all trainings via `getCollection('szkolenia')`, sorted by `order`
- `/o-mnie` — about page
- `/kontakt` — contact page (form is frontend-only, no backend)
- `/szkolenia/[slug]` — dynamic route rendering training content from markdown files

**Content Collections:** Training pages live in `src/content/szkolenia/*.md` with a Zod schema defined in `src/content.config.ts`. Adding a new training = add one `.md` file; the card on the homepage and the dynamic route are auto-generated.

**Navbar training list is hardcoded** in both `Navbar.astro` and `Footer.astro` — these must be updated manually when adding/removing trainings.

## Styling

- Custom theme colors and fonts defined in `@theme` block in `src/styles/global.css`
- Headings use `font-heading` (Playfair Display), body uses `font-body` (Inter)
- Custom shadows: `shadow-sm`, `shadow-md`, `shadow-lg`
- Navbar has special scroll behavior on homepage only, controlled by `isHome` prop and `data-is-home` attribute

## Content Schema (szkolenia)

Required fields: `title`, `overline`, `description`, `icon`, `heroImage`, `order`, `program[]`, `ctaTitle`, `ctaDescription`, `ctaButtonText`

Optional fields: `cards[]`, `cardsSectionTitle`, `cardsSectionOverline`, `infoGrid[]`, `infoGridTitle`, `infoGridOverline`, `infoGridDescription`

## Language

This is a Polish-language website (beauty/lash training business). All user-facing text is in Polish.
