# Analytics Event Spec

Use these events to track pageviews and key interactions. Implement via the GA helper (`data-ga-event`/`data-ga-category`/`data-ga-label` attributes) or call `trackInteraction`. Send the current language as a parameter when available.

## Naming
- Event names: `kebab-case` verbs (e.g., `nav-link-click`).
- Categories: `navigation`, `cta`, `gameplay`, `progress`, `contact`, `language`, `social`, `system`.
- Labels: concise context (e.g., button text, game slug, scene id).

## Core Events
| Event | When to fire | How | Params |
| --- | --- | --- | --- |
| `pageview` | On route change (already wired) | `trackPageview` | `page_path` (auto) |
| `language-toggle` | User switches TH/EN | Add `data-ga-event="language-toggle"` to toggle | `language` (after toggle) |
| `nav-link-click` | Top nav link clicked | `data-ga-event="nav-link-click"` `data-ga-label="{path}"` | `path` |
| `hero-cta-click` | Hero CTA on landing | `data-ga-event="hero-cta-click"` `data-ga-category="cta"` | `target` (route) |
| `game-card-click` | Game card opened from catalog | `data-ga-event="game-card-click"` `data-ga-label="{slug}"` | `game_slug` |
| `game-start` | Start game from setup page | `data-ga-event="game-start"` `data-ga-label="{slug}"` | `game_slug`, `race_id`, `class_id` |
| `scene-choice` | Player selects a choice in a scene | Call `trackInteraction` with `action: "scene-choice"` | `game_slug`, `scene_id`, `choice_id`, `turn` |
| `scene-end` | Story reaches an ending | Call `trackInteraction` when `shouldEnd` true | `game_slug`, `ending_id`, `achievement_id?` |
| `restart-run` | Player restarts a run | `data-ga-event="restart-run"` | `game_slug` |
| `achievement-unlocked` | Achievement emitted | Call `trackInteraction` where achievements are granted | `achievement_id`, `game_slug` |
| `achievement-share` | Share/copy achievement | `data-ga-event="achievement-share"` `data-ga-label="{achievement_id}"` | `achievement_id`, `method` |
| `achievements-view` | User opens achievements page | Add `data-ga-event="achievements-view"` to page root | `count_unlocked` |
| `contact-submit` | Contact form submitted | Call `trackInteraction` on submit success | `has_email` (bool), `has_message` (bool) |
| `contact-fail` | Contact form fails | Call `trackInteraction` on error | `error_reason` |
| `footer-link-click` | Footer legal/social links | `data-ga-event="footer-link-click"` `data-ga-label="{target}"` | `target` |
| `video-play` (if applicable) | Any embedded video starts | `data-ga-event="video-play"` `data-ga-label="{title}"` | `title`, `source` |

## Optional Detail Events
- `scroll-depth` (25/50/75/100) for landing and long-form pages.
- `time-on-page` buckets (`30s`, `60s`, `120s`) for `/game/[slug]/play`.
- `input-focus` for key fields (email/message) to see drop-offs in contact form.
- `cta-hover` for hero CTA hover interactions if you need micro-engagement metrics.

## Parameters to include when available
- `language`: `th` or `en`.
- `game_slug`: for any game-related event.
- `turn`: numeric turn count in `/play`.
- `achievement_id`: on unlock/share events.
- `error_reason`: short code/message for failures.

## Implementation Tips
- Prefer data attributes for click events to avoid extra wiring. Example: `<Button data-ga-event="game-start" data-ga-label={slug} />`.
- Avoid sending PII. Do not log freeform message bodies or email addresses. Use booleans or redacted labels instead.
- Keep the number of high-volume events small (pageviews, choices, submissions) to reduce noise; use optional events sparingly.
