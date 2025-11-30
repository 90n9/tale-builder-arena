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
  game_id: string;
  version: string;
  metadata: MetaData;
  config: ConfigData;
  scenes: Record<string, Scene>;
  endings?: Record<string, Ending>;
  races?: Race[];
  classes?: Class[];
  attributes?: Attribute[];
  backgrounds?: Background[];
  global_flags?: GlobalFlags;
}
```

---

## Meta Data

Story metadata and information.

```typescript
{
  title: string; // Required
  subtitle: string; // Required
  genre: string; // Required
  description: string; // Required
  cover_image: string; // Required
  author: string; // Required
}
```

**Example:**

```json
{
  "metadata": {
    "title": "สุสานแห่งดวงดาวแตกสลาย",
    "subtitle": "ผจญภัยดันเจี้ยนแฟนตาซีแบบเลือกเส้นทางได้",
    "genre": "fantasy_dungeon",
    "description": "ดันเจี้ยนแบบโต้ตอบ ที่เผ่าพันธุ์ คลาส และค่าสเตตัสของคุณ จะกำหนดชะตากรรมของตัวละคร",
    "cover_image": "/assets/games/crypt_of_the_shattered_star/cover.png",
    "author": "AI Generated"
  }
}
```

---

## Config Data

Story configuration and settings.

```typescript
{
  starting_attributes: {
    points_to_distribute: number;
    base_values: Record<string, number>;
  }
  asset_paths: {
    images: string;
    videos: string;
  }
  ui: {
    theme_color: string;
    text_speed: string;
  }
}
```

**Example:**

```json
{
  "config": {
    "starting_attributes": {
      "points_to_distribute": 5,
      "base_values": {
        "str": 1,
        "int": 1,
        "agi": 1,
        "cha": 1,
        "luk": 0
      }
    },
    "asset_paths": {
      "images": "/assets/games/crypt_of_the_shattered_star/",
      "videos": "/assets/games/crypt_of_the_shattered_star/"
    },
    "ui": {
      "theme_color": "#6B4FFF",
      "text_speed": "instant"
    }
  }
}
```

---

## Scenes

Scenes are the building blocks of your story.

```typescript
{
  scene_id: string;                 // Required - Unique scene ID
  type: string;                     // Required - e.g., "normal"
  title: string;                    // Required - Scene title
  description: string;              // Required - Scene description
  image: string;                    // Required - Image filename
  image_prompt: string;             // Required - AI prompt for image
  choices: Choice[];                // Required - Available choices
}
```

### Choice Structure

```typescript
{
  text: string;                     // Required - Choice text
  next: string;                     // Required - Next scene ID
  on_fail_next?: string;            // Optional - Scene if requirements fail
  requirements?: Requirement;       // Optional - Requirements
  reward_attributes?: Record<string, number>; // Optional - Stat rewards
}
```

### Requirement Structure

```typescript
{
  classes?: string[];
  min_attributes?: Record<string, number>;
}
```

**Example Scene:**

```json
{
  "scenes": {
    "scene_start": {
      "scene_id": "scene_start",
      "type": "normal",
      "title": "ขั้นบันไดที่ถูกลืม",
      "description": "ที่ชายป่าศักดิ์สิทธิ์โบราณ บันไดหินเก่าคร่ำคร่าไล่ลงสู่ใต้ดิน...",
      "image": "scene_start.png",
      "image_prompt": "fantasy dungeon entrance...",
      "choices": [
        {
          "text": "ก้าวลงไปในสุสานใต้ดิน",
          "next": "scene_1"
        },
        {
          "text": "ถอยกลับไปยังความปลอดภัย",
          "next": "ending_1"
        }
      ]
    }
  }
}
```

---

## Endings

Define story endings.

```typescript
{
  ending_id: string;                // Required - Unique ending ID
  title: string;                    // Required - Ending title
  summary: string;                  // Required - Ending summary
  result: string;                   // Required - Ending result text
  image: string;                    // Required - Image filename
  image_prompt: string;             // Required - AI prompt for image
  conditions: {
    min_attributes: Record<string, number>;
    flags_required: string[];
  };
}
```

**Example:**

```json
{
  "endings": {
    "ending_hero": {
      "ending_id": "ending_hero",
      "title": "ผู้พิชิตดวงดาว",
      "summary": "คุณทำลายหรือผนึกพลังของเศษดวงดาวได้...",
      "result": "บทเพลงจะถูกขับร้องถึงผู้ที่พิชิตดวงดาวแตกสลายได้",
      "image": "ending_hero.png",
      "image_prompt": "heroic adventurer...",
      "conditions": {
        "min_attributes": {},
        "flags_required": []
      }
    }
  }
}
```

---

## Game Components

### Races

```typescript
{
  id: string;
  name: string;
  description: string;
  attribute_bonus: Record<string, number>;
}
```

### Classes

```typescript
{
  id: string;
  name: string;
  description: string;
  starting_bonus: Record<string, number>;
}
```

### Attributes

```typescript
{
  id: string;
  name: string;
}
```

### Backgrounds

```typescript
{
  id: string;
  name: string;
  description: string;
  bonus_attributes: Record<string, number>;
}
```

---

## Complete Example

See `src/data/game-content/crypt_of_the_shattered_star/crypt_of_the_shattered_star.json` for a full example.

---

## Validation Rules

### Required Fields

- `game_id`
- `version`
- `metadata` (all fields)
- `config` (all fields)
- `scenes` (at least one scene)
- `endings` (at least one ending)

### Constraints

- Scene IDs must be unique
- `next` and `on_fail_next` must reference existing scenes or endings
- All text should be in Thai (as per current project standard)

### Best Practices

1. **Use descriptive IDs**: `scene_forest_entrance` not `s1`
2. **Validate references**: Ensure all `next` values exist
3. **Test all paths**: Make sure every choice leads somewhere
4. **Provide endings**: Every story path should reach an ending
5. **Optimize assets**: Keep file sizes reasonable
6. **Version properly**: Use semantic versioning (major.minor.patch)

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
