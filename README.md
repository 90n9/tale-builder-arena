# TaleBuilder Arena

Thai-language AI-driven text RPG rebuilt on Next.js for better SEO, routing, and API hooks. The experience centers on character creation, an interactive story mock, and an achievements tracker.

## Run It
- Prereq: Node.js + npm.
- Install deps: `npm install`
- Dev server (Next + app router): `npm run dev`
- Lint: `npm run lint`
- Production build: `npm run build`
- Start built app: `npm start`

## What’s Inside
- Next.js app router pages in `src/app/`:
  - `/` hero/feature landing
- `/game` multi-step character setup; `/game/play` uses the saved selection in a mock turn-based scene that calls `/api/story`
  - `/achievements`, `/about`, `/contact`, `/privacy-policy`, `/terms-of-use`, and a custom `not-found` view
- API: `POST /api/story` returns a mock narration update, follow-up choices, and an optional achievement seed for the current genre.
- Achievements data lives in `src/data/achievements.ts` and is shared between the UI and API.
- Global layout components: `src/components/Navbar.tsx` (active-route aware) and `src/components/Footer.tsx` plus shadcn-derived UI primitives under `src/components/ui`.

## Styling & Assets
- Tailwind tokens + globals in `src/app/globals.css`; Tailwind config in `tailwind.config.ts`.
- Lucide icons, AI-inspired gradients, and ornate corner helpers shape the theme; images sit in `src/assets/` (`hero-illustration.jpg`, `game-scene-placeholder.jpg`).

## Notes & Testing
- No automated tests yet; add `*.test.ts` / `*.test.tsx` alongside new logic when useful.
- Manual smoke pass: `npm run lint`, `npm run build`, then `npm start` and click through the game flow (clear `localStorage` to reset achievements). The build output is generated in `.next/`.
