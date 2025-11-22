# Game Page + API Alignment Plan

## Context
- `/game`, `/game/[slug]`, and `/game/[slug]/play` currently use hardcoded races/classes/attributes and mock narration (`INITIAL_*` from `src/lib/game-config.ts`).
- `POST /api/story` builds synthetic text and choices; it does not read `src/data/game-content/**.json`.
- JSON files already define races, classes, attributes, config.starting_attributes, scenes with requirements/rewards, and endings that generate achievements.
- Attribute IDs in JSON are short-form (`str`, `int`, `agi`, `cha`, `luk`) while UI labels in `game-config.ts` are long-form fields (`strength`, `intelligence`, etc.), so mappings are inconsistent.
- Session keys for character/progress exist (`taleBuilderCharacter:{slug}`, `taleBuilderEndSummary:{slug}`), and achievements rely on `{game_id}-{ending_id}` IDs.

## Goals
- Drive setup, play, and end flows from the JSON game files instead of stubs.
- Align the API contract with the JSON schema so choices, requirements, rewards, scenes, and endings resolve from the authored content.
- Preserve bilingual UX using `LocalizedText` and `useLanguage`; avoid one-language strings.
- Keep compatibility with achievements (`buildAchievementId` pattern) and session storage shapes, expanding them as needed for scene state.

## Guardrails & References
- Follow `AGENTS.md` and `docs/design-system.md`; keep UI bilingual and on-brand (Thai default, English alternate).
- Schema/source of truth: `docs/create-new-game.md`; validation via `npm run validate:game-content`.
- No external services; stay within current storage patterns (sessionStorage/localStorage).

## Data & Types Plan
- Add a typed content module (e.g., `src/data/game-content/index.ts`) that exports:
  - `GameContent`, `Scene`, `Choice`, `Ending`, `AttributeId` types mirroring the JSON schema.
  - A map of `game_id -> content` loaded from JSON files.
  - Helpers: `getGameContent(slug)`, `getStartScene(content)`, `getEnding(content, id)`, `getAttributeLabel(content, attrId)`.
- Add an attribute ID ↔ UI label map derived from `content.attributes`; keep `attributeLabels` only as a fallback.
- Expose config helpers for `starting_attributes` (base values + `points_to_distribute`) and bonuses (`attribute_bonus`, `starting_bonus`, `bonus_attributes`).

## Game Setup Page Plan (`/game/[slug]`)
- Replace hardcoded races/classes/attributes with content-driven lists (via `/api/game/[slug]/setup`).
- Initialize attributes from `config.starting_attributes.base_values`; cap/distribution uses `points_to_distribute` instead of `ATTRIBUTE_MAX_POINTS` constant.
- Show attribute labels from the JSON `attributes` array; include bonuses from race/class/background selections when previewing totals.
- Attribute UI: vertical list, stat name+base on the left, plus/minus controls on the right, bar split into base (accent) and added (primary gradient), with current value under the bar; single “points left” pill above.
- Persist chosen `race`, `class`, `background` (if used), and allocated attributes in sessionStorage under the existing key; include the attribute ID namespace from JSON.
- Keep existing navigation but source copy from `LocalizedText` in content where applicable (titles, subtitles, etc.).

## Gameplay Flow Plan (`/game/[slug]/play`)
- Replace `INITIAL_NARRATION/CHOICES` with the JSON `start` scene (explicit `scene_id` or first key).
- Track `currentSceneId`, `attributes`, `flags`, and `turn`. Apply `reward_attributes` deltas when choices grant bonuses and respect `global_flags.enable_attribute_rewards`.
- Evaluate choice `requirements` (classes/min_attributes). If requirements fail and `on_fail_next` exists, route there; otherwise block or stay.
- When a scene points to an `ending_*`, resolve the ending object, push summary to sessionStorage (`taleBuilderEndSummary:{slug}`) with `endingId`, `achievementId`, and the final attribute snapshot.
- Surface scene image paths using `config.asset_paths.images` + `scene.image` (fallback to placeholder if missing).

## API Plan (`/api/story`)
- Extend payload to include `slug`, `sceneId`, `choiceId` (or choice text), `attributes`, `classId`, `raceId`, `flags`, and `language`.
- Load `GameContent` by `slug`; validate `sceneId`/choice. Compute:
  - `nextSceneId` based on success/fail requirements.
  - Updated `attributes` after applying `reward_attributes`.
  - `shouldEnd` + `endingId` when targeting an ending; include ending text and achievement ID.
  - Localized `scene.title`, `scene.description`, `choices` for the next scene.
- Return a structured response the play page can render without re-deriving labels. Keep a graceful fallback message if content is missing.
- Optionally add a GET handler for debugging that lists available scenes/endings for the slug.

## End Page Plan (`/game/[slug]/end`)
- Read the enriched summary (endingId, achievementId, final attributes). Render ending title/summary/result from JSON and continue to reuse achievements lookup.
- Offer a “Replay from start” that resets `currentSceneId` to the start scene while preserving character setup if desired.

## Persistence & Compatibility
- Maintain existing session keys; extend the payload stored at `taleBuilderCharacter:{slug}` to include JSON attribute IDs and selected background.
- Store play-state (`currentSceneId`, `attributes`, `flags`, `turn`) alongside the narration snapshot so refreshes resume correctly.
- Keep achievements in `localStorage` unchanged.

## TODO (execution order)
1) Add typed content loader for JSON files and attribute label helpers.  
2) Update setup page to consume JSON-driven races/classes/attributes/config and persist the expanded selection shape.  
3) Redefine `/api/story` to be slug/content-aware with requirement/reward handling and ending resolution.  
4) Refactor play page to consume the new API payload, render real scenes/images, and manage play-state persistence.  
5) Update end page to show JSON ending data and the new summary shape.  
6) Validate (`npm run validate:game-content`), lint, and run a local playthrough for both games to confirm bilingual text and flow.

## Open Questions
- How should randomness/fail checks be handled beyond deterministic min_attributes/class gating? (coin flip vs deterministic failure when unmet)
- Should `backgrounds` be part of required selection for setup and affect rewards/requirements?
- Are there game-specific UI overrides (tone/highlights) beyond what’s in `CUSTOM_GAME_DETAILS`, and should they migrate into JSON?
