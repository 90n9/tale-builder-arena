# TaleBuilder Arena

AI-driven text RPG rebuilt on Next.js for better SEO, routing, and API hooks. The experience centers on character creation, an interactive story mock, and an achievements tracker. The UI is bilingual (TH/EN) with Thai as default.

## Requirements
- Node 18.18+ (Next.js 15) and npm.
- For contact form persistence: Postgres 15+ (Docker recipe included) and a `DATABASE_URL` env var.
- For analytics: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (Google Analytics 4) in `.env.local`.

## Run It
- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Production build: `npm run build`
- Start built app: `npm start`
- Docker: `docker build -t tale-builder-arena .` then `docker run -p 3000:3000 tale-builder-arena` (the Prisma schema is copied before installs so the client generates during the image build)

## Local Postgres (contact form)
- Copy `.env.example` to `.env.local` and adjust credentials if needed; default URL points at the included Docker Compose service.
- Start the database (and pgweb viewer on port 8081): `npm run db:up`
- Generate Prisma client (after schema edits): `npm run prisma:generate`
- Apply migrations: `npm run prisma:migrate` (uses the URL in `DATABASE_URL`)
- pgweb UI: open http://localhost:8081 and sign in with `PGWEB_AUTH_USER/PGWEB_AUTH_PASS` from your `.env.local`.
- psql without installing locally: `npm run db:psql` (opens psql inside the container).
- Tail DB logs if debugging: `npm run db:logs`; stop services with `npm run db:down`.

## Project Layout
- App router views live in `src/app`:
  - `/` landing, `/game` catalog, `/game/[slug]` setup, `/game/[slug]/play` turn-based scene, `/game/[slug]/end` summary
  - `/achievements`, `/about`, `/contact`, `/privacy-policy`, `/terms-of-use`, and `not-found`
- UI: shared components in `src/components` (navbar/footer plus shadcn-styled primitives under `src/components/ui`); reusable hooks in `src/hooks`; utilities in `src/lib`; data in `src/data`.
- Backend/clean architecture: server-only code lives in `src/server` (ports, use cases per API route, and infra adapters). API handlers in `src/app/api/**` should stay as thin adapters that call the relevant use case.
- Styling: Tailwind tokens/config in `tailwind.config.ts`; global styles in `src/app/globals.css`. See `docs/design-system.md` for design tokens and patterns.
- Game content schema and authoring steps: `docs/create-new-game.md`
- Assets: large hero/scene images now live in `public/assets` and are referenced via `/assets/...`; keep component-bundled art (e.g., small SVGs) in `src/assets`. Public files that should be served verbatim belong in `public/`.

## Analytics
- GA4 loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set; page views are reported on every route change.
- Add `data-ga-event` (plus optional `data-ga-category` and `data-ga-label`) to interactive elements to emit interaction events without custom wiring.

## API Contract
- Setup data per game: `GET /api/game/[slug]/setup?race={id}&class={id}` returns races, classes, attributes, base attributes (including race/class bonuses), and points to distribute. Attribute bonuses are not exposed in the payload.
- Story (JSON-driven): `POST /api/story` accepts `{ gameId, currentSceneId, selectedChoiceId, language, character: { classId, raceId, attributes } }` and returns `{ sceneId, narration, choices: [{ id, text }], turn, shouldEnd, achievementId }`. It reads scenes/endings from `src/data/game-content/**`, applies `requirements`/`on_fail_next`, localizes text, and emits `{game_id}-{ending_id}` achievements when an ending is reached. Language defaults to Thai when omitted.
- `GET /api/story` responds with a short usage hint for debugging.

## State & Persistence
- Character selection and end-of-run summaries are stored in `sessionStorage` per story slug using keys from `src/lib/game-config.ts` (`taleBuilderCharacter:{slug}`, `taleBuilderEndSummary:{slug}`).
- Earned achievements persist in `localStorage` under `questWeaverAchievements` and are displayed on `/achievements`.
- Clear browser storage to reset progress; starting a new character also resets the per-story session data.

## Styling & Assets
- Tailwind base/theme live in `tailwind.config.ts` and `src/app/globals.css`.
- Lucide icons, AI gradients, and ornate corners drive the look; hero/scene art ships from `public/assets/hero-illustration.jpg` and `public/assets/game-scene-placeholder.jpg`.

## Testing & Verification
- Automated: `npm test` runs Vitest; `npm run test:coverage` includes coverage. Backend use cases live under `src/server/usecases/**` and have unit tests with mocks for DB/third-party calls; add new tests alongside new use cases.
- Manual smoke: `npm run lint`, `npm run build`, then `npm start` and click through the `/game` flow; confirm achievements appear and reset by clearing `localStorage` if needed. Build output is emitted to `.next/`.
- Contact form: start Postgres (`npm run db:up`), run `npm run prisma:migrate`, submit a message on `/contact`, and verify it writes into the `contacts` table (view via Prisma Studio `npx prisma studio` or pgweb at http://localhost:8081).
- Contact email is optional; include it if you want a reply, otherwise submissions are stored without one.

## Conventions
- TypeScript + React function components; PascalCase components, camelCase variables, kebab-case filenames for single exports.
- Run ESLint (`eslint.config.js`) before committing; keep bundled assets in `src/assets` and public files (including hero/scene art) in `public`.
- Follow the patterns in `docs/design-system.md` before adjusting UI. Commit messages are short and imperative (e.g., “Add dashboard charts”).
- For copy/UI changes, add both Thai and English strings. Use `LanguageProvider` + `useLanguage` for switching, and store translatable strings as `LocalizedText` objects in data/util files. Thai is the default and is persisted in `localStorage`.
