# Repository Guidelines

## Project Structure & Module Organization
- Client code lives in `src` with entry at `src/main.tsx` bootstrapping React/Vite.
- Screens and routing are under `src/pages`; shared UI lives in `src/components` and `src/hooks`.
- Styling is handled via Tailwind and global styles in `src/index.css` and `src/App.css`; design tokens/config are in `tailwind.config.ts` and `postcss.config.js`.
- Static assets belong in `src/assets`; public files served verbatim go in `public`.

## Build, Test, and Development Commands
- `npm install` – install dependencies; required before any other command.
- `npm run dev` – start the Vite dev server with hot reload.
- `npm run build` – create a production build in `dist/`.
- `npm run build:dev` – production build using the development mode flag, useful for faster diagnostics.
- `npm run preview` – serve the built `dist/` bundle locally for smoke-testing.
- `npm run lint` – run ESLint across the repo; fix issues before opening a PR.

## Coding Style & Naming Conventions
- TypeScript + React functional components with hooks; prefer `tsx` for UI, `ts` for libs/utilities.
- Use PascalCase for components (`MyPanel.tsx`), camelCase for variables/functions, and kebab-case for file names that export a single component.
- Follow existing Tailwind utility patterns; co-locate component-specific styles with the component.
- ESLint config in `eslint.config.js` defines rules; run lint before commit.

## Testing Guidelines
- No automated test suite is configured yet. Add tests alongside features when practical (e.g., `*.test.tsx` for components) and ensure they run via a future `npm test`.
- Perform manual smoke checks: `npm run lint`, `npm run build`, then `npm run preview` to verify critical flows.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages (e.g., “Add dashboard charts”); the history currently follows a simple imperative style.
- PRs should describe the change intent, list key UI/behavioral impacts, and note any new configuration or env requirements.
- Link related issues/tickets, include screenshots or GIFs for UI changes, and mention manual test steps executed.

## Security & Configuration Tips
- Keep secrets out of the repo; prefer environment variables and never commit `.env` files.
- Review `tailwind.config.ts` and `vite.config.ts` before adjusting build or theme settings to avoid breaking the global design system.
