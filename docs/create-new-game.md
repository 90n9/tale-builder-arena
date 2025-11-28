## How to Add a New Game

Follow these steps to add a new game story that matches the existing content structure. Read the repo guidelines in `AGENTS.md` and the project overview in `README.md` before starting.

### Full JSON schema (shape reference)
```
{
  "game_id": string,
  "version": string,
  "metadata": {
    "title": { "th": string, "en": string },
    "subtitle": { "th": string, "en": string },
    "genre": string,
    "description": { "th": string, "en": string },
    "cover_image": string,
    "author": string,
  },
  "config": {
    "starting_attributes": {
      "points_to_distribute": number,
      "base_values": { [attributeId: string]: number }
    },
    "asset_paths": {
      "images": string,
      "videos": string
    },
    "ui": {
      "theme_color": string,
      "text_speed": string
    }
  },
  "races": [
    {
      "id": string,
      "name": { "th": string, "en": string },
      "description": { "th": string, "en": string },
      "attribute_bonus": { [attributeId: string]: number }
    }
  ],
  "classes": [
    {
      "id": string,
      "name": { "th": string, "en": string },
      "description": { "th": string, "en": string },
      "starting_bonus": { [attributeId: string]: number }
    }
  ],
  "attributes": [
    {
      "id": string,
      "name": { "th": string, "en": string }
    }
  ],
  "backgrounds": [
    {
      "id": string,
      "name": { "th": string, "en": string },
      "description": { "th": string, "en": string },
      "bonus_attributes": { [attributeId: string]: number }
    }
  ],
  "global_flags": {
    "enable_attribute_rewards": boolean,
    "enable_fail_scenes": boolean
  },
  "scenes": {
    [sceneId: string]: {
      "scene_id": string,
      "type": string,
      "title": { "th": string, "en": string },
      "description": { "th": string, "en": string },
      "image": string,
      "image_prompt": string,
      "choices": [
        {
          "text": { "th": string, "en": string },
          "next": string,
          "on_fail_next"?: string,
          "requirements"?: {
            "classes"?: string[],
            "min_attributes"?: { [attributeId: string]: number }
          },
          "reward_attributes"?: { [attributeId: string]: number }
        }
      ]
    }
  },
  "endings": {
    [endingId: string]: {
      "ending_id": string,
      "title": { "th": string, "en": string },
      "summary": { "th": string, "en": string },
      "result": { "th": string, "en": string },
      "image": string,
      "image_prompt": string,
      "conditions": {
        "min_attributes": { [attributeId: string]: number },
        "flags_required": string[]
      }
    }
  }
}
```

### 1) Review the existing schema
- Open an existing game JSON in `src/data/game-content/` (e.g., `crypt_of_the_shattered_star/crypt_of_the_shattered_star.json`).
- Every user-facing string must be bilingual via `LocalizedText` objects (`{ th, en }`).
- Required top-level keys: `game_id`, `version`, `metadata`, `config`, `races`, `classes`, `attributes`, `backgrounds`, `global_flags`, `scenes`, `endings` (match the current structure).
- Scenes and endings must include IDs, titles, descriptions, images/prompts, choices, requirements, rewards, and conditions consistent with the existing files.

### 2) Create your game JSON
- Add a new folder under `src/data/game-content/<game_id>/`.
- Add `<game_id>.json` with the same shape as the other games (mirror fields and types).
- Keep `metadata.genre` aligned with any new genre labels you want displayed. If the genre string is new, note it for UI labeling.

### 3) Wire the game into the app
- Import the new JSON in `src/data/games.ts` and append it to `GAME_CONTENTS`.
- Provide any custom tone/highlight overrides in `CUSTOM_GAME_DETAILS` if needed.
- If you introduce a new genre string, add a localized label in `src/data/genres.ts` so badges render bilingual text.

### 4) Achievements from endings
- Endings automatically generate achievements in `src/data/achievements.ts` via the imported JSONs. If you add a new game, ensure it’s included in `GAME_CONTENTS` there and set any desired rarity overrides in `rarityByEnding`.

### 5) Validate and lint
- Run the validator to confirm structure matches expectations:
  ```bash
  npm run validate:game-content
  ```
- Run lint/build before opening a PR:
  ```bash
  npm run lint
  npm run build
  ```

### 6) Manual checks
- Start the dev server (`npm run dev`) and verify:
  - Game list shows the new title, genre badge, tone, highlights, and cover image.
  - Achievements page lists endings with correct names/rarities.
  - End/play flows load without missing strings or asset paths.

### References
- Repository rules and localization requirements: `AGENTS.md`
- Project setup and commands: `README.md`
