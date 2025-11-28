# Story JSON Schema Documentation

This document describes the structure and validation rules for story JSON files in Tale Builder Arena.

## Overview

Story files define the narrative structure, scenes, choices, and game mechanics for interactive stories. They must follow a specific schema validated by Zod.

## File Format

- **Format:** JSON (UTF-8 encoded)
- **Extension:** `.json`
- **Max Size:** 10MB

## Schema Structure

### Root Object

```typescript
{
  meta: MetaData;
  config: ConfigData;
  scenes: Record<string, Scene>;
  endings?: Record<string, Ending>;
  assets?: Record<string, string>;
}
```

---

## Meta Data

Story metadata and information.

```typescript
{
  title: LocalizedString;           // Required
  description?: LocalizedString;    // Optional
  author?: string;                  // Optional
  version: string;                  // Required (e.g., "1.0.0")
  supportedLanguages: string[];     // Required (e.g., ["en", "th"])
}
```

**Example:**

```json
{
  "meta": {
    "title": {
      "en": "The Lost Temple",
      "th": "วิหารที่สาบสูญ"
    },
    "description": {
      "en": "An adventure in ancient ruins",
      "th": "การผจญภัยในซากปรักหักพัง"
    },
    "author": "Story Author",
    "version": "1.0.0",
    "supportedLanguages": ["en", "th"]
  }
}
```

---

## Config Data

Story configuration and settings.

```typescript
{
  initialSceneId: string;           // Required - Starting scene ID
  character?: CharacterConfig;      // Optional - Character creation
}
```

**Character Config:**

```typescript
{
  allowCustomName: boolean;         // Default: true
  stats?: Array<{
    key: string;
    label: LocalizedString;
    min: number;
    max: number;
    default: number;
  }>;
}
```

**Example:**

```json
{
  "config": {
    "initialSceneId": "scene_start",
    "character": {
      "allowCustomName": true,
      "stats": [
        {
          "key": "strength",
          "label": { "en": "Strength", "th": "พลัง" },
          "min": 1,
          "max": 10,
          "default": 5
        }
      ]
    }
  }
}
```

---

## Scenes

Scenes are the building blocks of your story.

```typescript
{
  id: string;                       // Required - Unique scene ID
  title?: LocalizedString;          // Optional - Scene title
  text: LocalizedString;            // Required - Scene description
  image?: string;                   // Optional - Asset path
  choices?: Choice[];               // Optional - Available choices
  isEnding?: boolean;               // Optional - Is this an ending?
  endingId?: string;                // Required if isEnding is true
}
```

### Choice Structure

```typescript
{
  id: string;                       // Required - Unique choice ID
  text: LocalizedString;            // Required - Choice text
  nextSceneId?: string;             // Optional - Next scene
  requirements?: Requirement[];     // Optional - Requirements
  rewards?: Reward[];               // Optional - Rewards
  onFailNextSceneId?: string;       // Optional - Scene if requirements fail
}
```

### Requirement Structure

```typescript
{
  type: 'stat' | 'item' | 'flag' | 'class' | 'race';
  key: string;
  value: string | number | boolean;
  operator?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'ne';
}
```

### Reward Structure

```typescript
{
  type: 'stat' | 'item' | 'flag';
  key: string;
  value: string | number | boolean;
  operation?: 'add' | 'subtract' | 'set';
}
```

**Example Scene:**

```json
{
  "scenes": {
    "scene_start": {
      "id": "scene_start",
      "title": {
        "en": "The Entrance",
        "th": "ทางเข้า"
      },
      "text": {
        "en": "You stand before an ancient temple...",
        "th": "คุณยืนอยู่หน้าวิหารโบราณ..."
      },
      "image": "images/temple_entrance.jpg",
      "choices": [
        {
          "id": "choice_enter",
          "text": {
            "en": "Enter the temple",
            "th": "เข้าไปในวิหาร"
          },
          "nextSceneId": "scene_inside",
          "requirements": [
            {
              "type": "stat",
              "key": "courage",
              "value": 5,
              "operator": "gte"
            }
          ],
          "rewards": [
            {
              "type": "stat",
              "key": "experience",
              "value": 10,
              "operation": "add"
            }
          ],
          "onFailNextSceneId": "scene_too_scared"
        },
        {
          "id": "choice_leave",
          "text": {
            "en": "Leave",
            "th": "จากไป"
          },
          "nextSceneId": "ending_coward"
        }
      ]
    }
  }
}
```

---

## Endings

Define story endings (optional but recommended).

```typescript
{
  id: string;                       // Required - Unique ending ID
  title: LocalizedString;           // Required - Ending title
  description: LocalizedString;     // Required - Ending description
  image?: string;                   // Optional - Asset path
  type?: 'good' | 'bad' | 'neutral' | 'secret';  // Optional
}
```

**Example:**

```json
{
  "endings": {
    "ending_hero": {
      "id": "ending_hero",
      "title": {
        "en": "The Hero's Victory",
        "th": "ชัยชนะของวีรบุรุษ"
      },
      "description": {
        "en": "You have saved the kingdom!",
        "th": "คุณได้ช่วยอาณาจักรไว้!"
      },
      "type": "good"
    }
  }
}
```

---

## Localized Strings

All user-facing text should be localized.

```typescript
type LocalizedString = Record<string, string>;
```

**Example:**

```json
{
  "en": "English text",
  "th": "ข้อความภาษาไทย",
  "ja": "日本語のテキスト"
}
```

**Rules:**
- Must include all languages listed in `meta.supportedLanguages`
- Keys are ISO 639-1 language codes
- Values are strings

---

## Assets

Optional mapping of asset keys to paths/URLs.

```typescript
type Assets = Record<string, string>;
```

**Example:**

```json
{
  "assets": {
    "temple_bg": "images/backgrounds/temple.jpg",
    "sword_icon": "images/items/sword.png",
    "theme_music": "audio/temple_theme.mp3"
  }
}
```

---

## Complete Example

```json
{
  "meta": {
    "title": { "en": "The Lost Temple" },
    "description": { "en": "An adventure story" },
    "version": "1.0.0",
    "supportedLanguages": ["en"]
  },
  "config": {
    "initialSceneId": "scene_1"
  },
  "scenes": {
    "scene_1": {
      "id": "scene_1",
      "text": { "en": "You find a mysterious temple..." },
      "choices": [
        {
          "id": "c1",
          "text": { "en": "Enter" },
          "nextSceneId": "scene_2"
        },
        {
          "id": "c2",
          "text": { "en": "Leave" },
          "nextSceneId": "ending_1"
        }
      ]
    },
    "scene_2": {
      "id": "scene_2",
      "text": { "en": "Inside the temple..." },
      "choices": [
        {
          "id": "c3",
          "text": { "en": "Continue" },
          "nextSceneId": "ending_2"
        }
      ]
    },
    "ending_1": {
      "id": "ending_1",
      "text": { "en": "You decided to leave." },
      "isEnding": true,
      "endingId": "ending_1"
    },
    "ending_2": {
      "id": "ending_2",
      "text": { "en": "You found the treasure!" },
      "isEnding": true,
      "endingId": "ending_2"
    }
  },
  "endings": {
    "ending_1": {
      "id": "ending_1",
      "title": { "en": "The Cautious Path" },
      "description": { "en": "Sometimes wisdom is knowing when to walk away." },
      "type": "neutral"
    },
    "ending_2": {
      "id": "ending_2",
      "title": { "en": "The Treasure Hunter" },
      "description": { "en": "Fortune favors the bold!" },
      "type": "good"
    }
  }
}
```

---

## Validation Rules

### Required Fields

- `meta.title`
- `meta.version`
- `meta.supportedLanguages`
- `config.initialSceneId`
- `scenes` (at least one scene)
- Each scene must have `id` and `text`
- Ending scenes must have `isEnding: true` and `endingId`

### Constraints

- Scene IDs must be unique
- Choice IDs must be unique within a scene
- `nextSceneId` must reference an existing scene
- `initialSceneId` must reference an existing scene
- `endingId` should reference an ending in the `endings` object
- All localized strings must include all supported languages

### Best Practices

1. **Use descriptive IDs**: `scene_forest_entrance` not `s1`
2. **Validate references**: Ensure all `nextSceneId` values exist
3. **Test all paths**: Make sure every choice leads somewhere
4. **Provide endings**: Every story path should reach an ending
5. **Localize everything**: Include all supported languages
6. **Optimize assets**: Keep file sizes reasonable
7. **Version properly**: Use semantic versioning (major.minor.patch)

---

## Common Errors

### Missing Required Field

```json
{
  "error": "Invalid story JSON",
  "details": [
    {
      "code": "invalid_type",
      "path": ["meta", "title"],
      "message": "Required"
    }
  ]
}
```

### Invalid Scene Reference

```json
{
  "error": "Scene not found in story"
}
```

### Invalid Language Coverage

All text must include all languages from `supportedLanguages`.

---

## Tools

### Validation

Use the provided Zod schema to validate your story:

```typescript
import { storySchema } from '@/lib/validation/storySchema';

try {
  const validatedStory = storySchema.parse(storyJson);
  console.log('Story is valid!');
} catch (error) {
  console.error('Validation errors:', error);
}
```

### Testing

Test your story file:
```bash
npm run validate:game-content
```

---

## See Also

- [Stories API Documentation](./api-stories.md)
- [Sessions API Documentation](./api-sessions.md)
- [Example Stories](../src/data/game-content/)
