# Game Page + API Alignment Plan

## Context

- `/game`, `/game/[slug]`, and `/game/[slug]/play` have been moved off the old `INITIAL_*` stubs. The play page now calls `/api/story` with `gameId`, `sceneId`, `choiceId`, and character context (class/race/attributes) to resolve real scenes from `src/data/game-content/**.json`.
- `POST /api/story` now reads JSON scenes/endings, applies `requirements` and `on_fail_next`, localizes titles/descriptions/choices, and emits deterministic `achievementId`s of the form `{game_id}-{ending_id}`. Endings surface `shouldEnd`, localized narration, and choice list (empty when ending).
- JSON files already define races, classes, attributes, `config.starting_attributes`, scenes with requirements/rewards, and endings. Attribute IDs in JSON remain short-form (`str`, `int`, `agi`, `cha`, `luk`), and the UI reads labels from the JSON attributes array.
- Session keys for character/progress remain (`taleBuilderCharacter:{slug}`, `taleBuilderEndSummary:{slug}`), and achievements still store in `localStorage`.

## Goals (status)

- ✅ Drive play flow from JSON scenes/endings through `/api/story` (sceneId + choices from content).
- ✅ Align API contract with JSON schema for choices/requirements/endings; localized responses only.
- 🔄 Remaining: migrate setup page to JSON-driven config/attribute distribution and end page to show ending text from JSON.
- ✅ Preserve bilingual UX via `LocalizedText` and `useLanguage`; no single-language strings in play flow.
- ✅ Keep achievements/session storage compatible while adding `sceneId` + choice IDs to flow.

## Guardrails & References

- Follow `AGENTS.md` and `docs/design-system.md`; keep UI bilingual and on-brand (Thai default, English alternate).
- Schema/source of truth: `docs/create-new-game.md`; validation via `npm run validate:game-content`.
- No external services; stay within current storage patterns (sessionStorage/localStorage).

## Data & Types Plan

- Add a typed content module (e.g., `src/data/game-content/index.ts`) that exports:
  - `GameContent`, `Scene`, `Choice`, `Ending`, `AttributeId` types mirroring the JSON schema.
  - A map of `game_id -> content` loaded from JSON files.
  - Helpers: `getGameContent(slug)`, `getStartScene(content)`, `getEnding(content, id)`, `getAttributeLabel(content, attrId)`.
- Attribute labels should come from `content.attributes`; keep `attributeLabels` only as a fallback.
- Expose config helpers for `starting_attributes` (base values + `points_to_distribute`) and bonuses (`attribute_bonus`, `starting_bonus`, `bonus_attributes`).

## Game Setup Page Plan (`/game/[slug]`)

- Replace hardcoded races/classes/attributes with content-driven lists (via `/api/game/[slug]/setup`).
- Initialize attributes from `config.starting_attributes.base_values`; cap/distribution uses `points_to_distribute` instead of `ATTRIBUTE_MAX_POINTS` constant.
- Show attribute labels from the JSON `attributes` array; include bonuses from race/class/background selections when previewing totals.
- Attribute UI: vertical list, stat name+base on the left, plus/minus controls on the right, bar split into base (accent) and added (primary gradient), with current value under the bar; single “points left” pill above.
- Persist chosen `race`, `class`, `background` (if used), and allocated attributes in sessionStorage under the existing key; include the attribute ID namespace from JSON.
- Keep existing navigation but source copy from `LocalizedText` in content where applicable (titles, subtitles, etc.).

## Gameplay Flow Plan (`/game/[slug]/play`)

- ✅ Replace `INITIAL_NARRATION/CHOICES` with JSON-driven scenes via `/api/story` (`sceneId`/choices are returned already localized).
- Track `currentSceneId`, `attributes`, `flags`, and `turn`. Apply `reward_attributes` deltas when choices grant bonuses and respect `global_flags.enable_attribute_rewards`. **(pending in UI)**
- ✅ Evaluate choice `requirements` (classes/min_attributes). If requirements fail and `on_fail_next` exists, route there.
- ✅ When a scene points to an `ending_*`, resolve the ending object, push summary to sessionStorage (`taleBuilderEndSummary:{slug}`) with `endingId`, `achievementId`, and the final attribute snapshot.
- Surface scene image paths using `config.asset_paths.images` + `scene.image` (fallback to placeholder if missing). **(pending media hook-up)**

## API Plan (`/api/story`)

- ✅ Payload: `{ gameId, currentSceneId, selectedChoiceId, language, character: { classId, raceId, attributes } }`.
- ✅ Loads `GameContent` by `gameId`; validates scene/choice, applies `requirements` and `on_fail_next`, and returns localized `sceneId`, `narration`, `choices` (id + text), `shouldEnd`, and `achievementId` when ending.
- TODO: propagate `reward_attributes` and flags in the response so the client can update attributes mid-run.
- GET handler remains a simple usage message; could be extended to list scenes/endings for debugging.

## End Page Plan (`/game/[slug]/end`)

- Read the enriched summary (endingId, achievementId, final attributes). Render ending title/summary/result from JSON and continue to reuse achievements lookup.
- Offer a “Replay from start” that resets `currentSceneId` to the start scene while preserving character setup if desired.

## Persistence & Compatibility

- Maintain existing session keys; extend the payload stored at `taleBuilderCharacter:{slug}` to include JSON attribute IDs and selected background.
- Store play-state (`currentSceneId`, `attributes`, `flags`, `turn`) alongside the narration snapshot so refreshes resume correctly.
- Keep achievements in `localStorage` unchanged.

## TODO (execution order)

1. Add typed content loader for JSON files and attribute label helpers.
2. Update setup page to consume JSON-driven races/classes/attributes/config and persist the expanded selection shape.
3. **Done**: Redefine `/api/story` to be slug/content-aware with requirement handling and ending resolution.
4. **Done (initial)**: Refactor play page to consume the new API payload (sceneId/choices), manage play-state; still need attribute reward updates and media wiring.
5. Update end page to show JSON ending data and the new summary shape.
6. Validate (`npm run validate:game-content`), lint, and run a local playthrough for both games to confirm bilingual text and flow.

## Open Questions

- How should randomness/fail checks be handled beyond deterministic min_attributes/class gating? (coin flip vs deterministic failure when unmet)
- Should `backgrounds` be part of required selection for setup and affect rewards/requirements?
- Are there game-specific UI overrides (tone/highlights) beyond what’s in `CUSTOM_GAME_DETAILS`, and should they migrate into JSON?
