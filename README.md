# TaleBuilder Arena

React + TypeScript + Vite project styled with Tailwind and shadcn UI primitives. This repo powers the TaleBuilder Arena front-end.

## Quick Start
- Prereq: Node.js and npm installed.
- Install deps: `npm install`
- Dev server with HMR: `npm run dev`
- Type-check and lint: `npm run lint`
- Production build: `npm run build`
- Preview built bundle locally: `npm run preview`

## Project Structure
- `src/main.tsx` – app entrypoint; mounts React with router/theme config.
- `src/pages/` – routed screens.
- `src/components/` – shared UI pieces; composed with shadcn primitives.
- `src/hooks/` – reusable state/data hooks.
- `src/lib/` – utilities and helpers.
- `src/assets/` – local media; public static files live in `public/`.
- `tailwind.config.ts`, `postcss.config.js` – design tokens and build pipeline config.

## Development Notes
- Use functional components and hooks; prefer `tsx` for UI, `ts` for utilities.
- Follow Tailwind utility-first styling; co-locate UI variants with components.
- Keep component files in PascalCase; hooks in camelCase (`useData.ts`); route files in `src/pages` organized by feature folder.
- Run `npm run lint` before pushing to catch TypeScript/React issues.

## Testing & Verification
- No automated tests yet; please add `*.test.tsx`/`*.test.ts` alongside code when introducing new logic.
- Manual smoke checklist: `npm run lint`, `npm run build`, then `npm run preview` to sanity check UI flows.

## Deployment
- Build artifacts emit to `dist/`; deploy that directory to your hosting provider or static file service.
- Ensure environment config (if added) is injected via Vite env files (`.env`, `.env.local`) and not committed.
