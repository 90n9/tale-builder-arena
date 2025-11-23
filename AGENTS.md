# Repository Guidelines

## Where to Look
- Follow this file for repo-wide expectations and check `docs/` (notably `docs/design-system.md`) for design-specific instructions before updating UI.
- For adding or editing game content, read `docs/create-new-game.md` for the full JSON schema and wiring steps.

## Project Structure & Module Organization
- Next.js (App Router) lives in `src/app`; shared UI in `src/components`, hooks in `src/hooks`, utilities in `src/lib`, and supporting data in `src/data`.
- Server-side/clean architecture lives in `src/server` (ports, use cases per API route, and infra adapters). Keep `src/app/api/**` handlers thin and call into use cases.
- Global styling is handled via Tailwind with tokens in `tailwind.config.ts` and base styles in `src/app/globals.css`; PostCSS config is in `postcss.config.js`.
- Static assets belong in `src/assets`; public files served verbatim go in `public`.

## Build, Test, and Development Commands
- `npm install` – install dependencies; required before any other command.
- `npm run dev` – start the Next dev server with hot reload.
- `npm run build` – create a production build.
- `npm start` – run the production server after building.
- `npm run lint` – run ESLint across the repo; fix issues before opening a PR.

## Coding Style & Naming Conventions
- TypeScript + React functional components with hooks; prefer `tsx` for UI and `ts` for libraries/utilities.
- Use PascalCase for components, camelCase for variables/functions, and kebab-case for filenames that export a single component.
- Follow existing Tailwind utility patterns; co-locate component-specific styles with the component.
- ESLint rules are defined in `eslint.config.js`; run lint before committing.
- All user-facing copy must be bilingual (Thai default, English alternate). Store translatable text as `LocalizedText` objects and read via `useLanguage`/`LanguageProvider`; do not hardcode single-language strings in UI.

## Testing Guidelines
- Automated tests exist via `npm test` (Vitest). For backend logic, add unit tests alongside use cases in `src/server/usecases/**` and mock DB/third-party calls. Add UI tests as `*.test.tsx` when practical.
- Perform manual smoke checks: `npm run lint` and `npm run build`; optionally `npm start` or `npm run dev` for local verification.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages (e.g., “Add dashboard charts”); the history follows an imperative style.
- PRs should describe the change intent, list key UI/behavioral impacts, and note any new configuration or env requirements.
- Link related issues/tickets, include screenshots or GIFs for UI changes, and mention manual test steps executed.

## Security & Configuration Tips
- Keep secrets out of the repo; prefer environment variables and never commit `.env` files.
- Review `tailwind.config.ts` and `next.config.mjs` before adjusting build or theme settings to avoid breaking the global design system.
