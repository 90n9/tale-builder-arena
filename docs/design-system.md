# TaleBuilder Arena Design System

Design references are derived from `src/app/globals.css`, `tailwind.config.ts`, and the current page compositions under `src/app`. Use this document as the source of truth when extending or refactoring UI.

## Brand Foundations

- **Color tokens (HSL):**
  - background `215 30% 8%`, foreground `0 0% 98%`
  - card `220 25% 12% / 0.6`, popover `220 25% 12%`
  - primary `185 90% 50%`, primary-foreground `0 0% 98%`
  - secondary `25 95% 55%`, secondary-foreground `0 0% 98%`
  - accent mirrors primary; muted `215 20% 20%` with foreground `0 0% 70%`
  - destructive `0 72% 51%`
  - border `185 70% 45% / 0.3`, input `220 25% 15%`, ring `185 90% 50%`
- **Gradients:** `gradient-primary` (orange sweep), `gradient-hero` (vertical nightfall), `gradient-card` (angled deep blue), `gradient-magic` (violet), `gradient-cyan` (teal), `gradient-overlay` (transparent to dark). Use for hero backdrops, cards, and accent panels.
- **Glow & shadow:** `shadow-epic` for major surfaces; `shadow-card` for raised cards; `glow-cyan`, `glow-orange`, `glow-magic` for hover emphasis on CTAs and featured tiles.
- **Borders & radius:** Base radius `--radius: 0.125rem` (tight corners). Border color defaults to `border` token; `border-2` is used on elevated elements (cards, CTAs) to match the ornate theme.
- **Motion:** Preferred easing via `transition-smooth` (0.3s) and `transition-epic` (0.5s). Use Tailwind transitions on hover/focus; avoid abrupt state changes.

## Typography

- Fonts: Headings use **Prompt** (400/600 weights), body uses **Noto Sans Thai**; both are loaded via `next/font`.
- Default Tailwind sans stack stays as fallback; body uses `text-foreground` on dark background.
- Headings are bold, large, and often uppercase with `tracking-wide` to reinforce the epic tone (see landing hero at `text-6xl`–`text-8xl`).
- Secondary text uses `text-muted-foreground`; quotes or story snippets may use `italic`.

## Layout & Spacing

- Container centers content with `padding: 2rem` and a `1400px` max width (`tailwind.config.ts`).
- Page sections frequently use `py-24` or greater and layered backdrops: gradient surfaces plus vignette dots from the `body` background.
- Keep generous gaps (`gap-6` to `gap-12`) in grids to preserve the premium, airy feel.

## Components & Patterns

- **Buttons (`<Button>` from `src/components/ui/button.tsx`):**
  - Primary action = solid orange (secondary token) with subtle glow. Use `PrimaryActionButton` (`src/components/ActionButtons.tsx`) for main CTAs (hero, submit, modal primary).
  - Secondary action = blue outline/transparent fill. Use `SecondaryActionButton` for supporting CTAs or navigation.
  - Prefer the action components over raw `<Button>` to keep styling consistent. Avoid ad-hoc borders/gradients; if a new style is needed, add a wrapper in `ActionButtons.tsx` and document when to use it.
  - Base variants remain: `default` (orange), `destructive`, `outline` (blue border), `secondary`, `ghost`, `link`. Sizes: `sm`, `default`, `lg`, `icon`.
- **Cards:** Base from `src/components/ui/card`. Apply `bg-gradient-card`, `shadow-card`, `border-2 border-border/50`, and `backdrop-blur-sm` for premium surfaces. Hover states often use `hover:border-accent` and `hover:shadow-glow-cyan`.
- **Badges & Chips:** Use `Badge` with `bg-accent/20 text-accent border border-accent/30` when indicating current selections (e.g., genre/race/class).
- **Navigation:** `Navbar` is fixed with translucent background (`bg-background/90` + blur) and uppercase links; primary CTA uses gradient/orange glow.
- **Footer:** Uses `bg-card`, `border-border`, and muted text for legal links.

## Decorative Utilities

- `ornate-corners`: Adds diagonally opposing corner strokes for cards and panels.
- `section-divider`: Horizontal line with a centered diamond glyph; place before major section headings.
- `bg-gradient-hero` + `bg-gradient-overlay`: Layer over imagery to keep text legible.
- `shadow-epic`: Apply to marquee cards or modals to emphasize depth.

## Interaction Guidelines

- Favor gradient or accent glows on primary actions to signal interactivity; pair with `hover:-translate-y-2` on feature cards sparingly.
- Keep contrast high: primary/accent on dark surfaces; use `text-muted-foreground` for body copy.
- Preserve the Thai copy tone currently in use; keep uppercase nav/CTA labels consistent.

## Assets

- Hero and scene imagery live in `public/assets` (e.g., `/assets/hero-illustration.jpg`). Overlay gradients should always accompany photography to maintain contrast, and prefer `next/image` with explicit sizes when embedding.
