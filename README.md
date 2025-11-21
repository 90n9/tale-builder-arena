# TaleBuilder Arena

Thai-language AI-driven text RPG frontend built with React, TypeScript, Vite, Tailwind, and shadcn UI primitives. The experience centers on character creation, an interactive story mock, and an achievements tracker.

## Run It
- Prereq: Node.js + npm.
- Install deps: `npm install`
- Dev server (Vite + HMR): `npm run dev`
- Lint (TypeScript/React via ESLint): `npm run lint`
- Production build: `npm run build` (or faster `npm run build:dev`)
- Preview built bundle: `npm run preview`

## What’s Inside
- Landing page (`src/pages/Index.tsx`) with hero, feature highlights, “how to play,” and CTA buttons into the game and about pages.
- Game flow prototype (`src/pages/GamePage.tsx`) with a stepper (genre → race → class → attribute sliders) and a mock turn-based scene showing narration, image placeholder, choices, stats, inventory, and quest log. Completing a short session rolls a genre-themed achievement.
- Achievements hub (`src/pages/AchievementsPage.tsx`) that filters trophies by genre and shows progress; earned items persist to `localStorage` under `questWeaverAchievements`.
- Supporting pages: about, contact form stub (non-sending), privacy policy, terms of use, and 404 handling.
- Global layout elements (`src/components/Navbar.tsx`, `src/components/Footer.tsx`) plus helper utilities (e.g., `ScrollToTop`) and shadcn-derived UI primitives under `src/components/ui`.

## Styling & Assets
- Tailwind theme tokens and gradients live in `src/index.css`; extra config in `tailwind.config.ts`.
- Lucide icons, custom gradients, and ornate corner helpers give the fantasy look; images are in `src/assets/` (`hero-illustration.jpg`, `game-scene-placeholder.jpg`).

## Project Layout
- Entry + router bootstrapping: `src/main.tsx`, `src/App.tsx`
- Routed screens: `src/pages/`
- Shared UI + utilities: `src/components/`, `src/hooks/`, `src/lib/`
- Static assets: `src/assets/`; raw public files: `public/`

## Notes & Testing
- No automated tests yet; add `*.test.ts` / `*.test.tsx` alongside new logic when useful.
- Manual smoke pass: `npm run lint`, `npm run build`, then `npm run preview` and click through the game flow plus the achievements page (clear `localStorage` to reset trophies). Build output lands in `dist/` for deployment to a static host.
