# Stories API

This document describes the story management endpoints for the Tale Builder Arena API.

## Base URL

```
/api/stories
```

## Endpoints

### List Stories

Get a paginated list of published stories.

**Endpoint:** `GET /api/stories`

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 10 | Items per page |

**Example Request:**

```
GET /api/stories?page=1&limit=10
```

**Success Response (200):**

```json
{
  "data": [
    {
      "id": 1,
      "slug": "test-story",
      "title": {
        "en": "Test Story",
        "th": "เรื่องทดสอบ"
      },
      "description": {
        "en": "A test story",
        "th": "เรื่องราวทดสอบ"
      },
      "genre": "Adventure",
      "coverImageUrl": "/uploads/stories/test-story/cover.jpg",
      "supportedLang": ["en", "th"],
      "author": {
        "username": "testuser"
      },
      "_count": {
        "sessions": 5,
        "comments": 3
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

**Error Responses:**

- **500 Internal Server Error**
  ```json
  {
    "error": "Internal server error"
  }
  ```

---

### Get Story by Slug

Get a specific story by its slug.

**Endpoint:** `GET /api/stories/:slug`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Story slug identifier |

**Example Request:**

```
GET /api/stories/test-story
```

**Success Response (200):**

```json
{
  "id": 1,
  "slug": "test-story",
  "title": {
    "en": "Test Story"
  },
  "description": {
    "en": "A test story"
  },
  "genre": "Adventure",
  "coverImageUrl": "/uploads/stories/test-story/cover.jpg",
  "supportedLang": ["en"],
  "storyJsonUrl": "/uploads/stories/test-story/1.0.0/story.json",
  "author": {
    "id": 1,
    "username": "testuser"
  },
  "versions": [
    {
      "id": 1,
      "version": "1.0.0",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**

- **404 Not Found** - Story not found or not published
  ```json
  {
    "error": "Story not found"
  }
  ```

---

### Create Story

Upload a new story (requires authentication).

**Endpoint:** `POST /api/stories`

**Authentication:** Required (Bearer token)

**Request:** `multipart/form-data`

**Form Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `story` | File (JSON) | Yes | Story definition JSON file |
| `cover` | File (Image) | No | Cover image |
| `assets` | File[] | No | Story assets (images, audio, etc.) |

**Story JSON Structure:**

```json
{
  "meta": {
    "title": { "en": "Story Title" },
    "description": { "en": "Story description" },
    "version": "1.0.0",
    "supportedLanguages": ["en"]
  },
  "config": {
    "initialSceneId": "scene_1"
  },
  "scenes": {
    "scene_1": {
      "id": "scene_1",
      "text": { "en": "Scene text" },
      "choices": [
        {
          "id": "choice_1",
          "text": { "en": "Choice text" },
          "nextSceneId": "scene_2"
        }
      ]
    }
  }
}
```

**Success Response (200):**

```json
{
  "success": true,
  "story": {
    "id": 1,
    "slug": "story-title",
    "title": { "en": "Story Title" },
    "version": "1.0.0",
    "isPublished": false,
    "storyJsonUrl": "/uploads/stories/story-title/1.0.0/story.json",
    "coverImageUrl": "/uploads/stories/story-title/1.0.0/cover-image.jpg"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Missing story file or invalid JSON
  ```json
  {
    "error": "Missing story JSON file"
  }
  ```
  or
  ```json
  {
    "error": "Invalid story JSON",
    "details": { ... }
  }
  ```

- **401 Unauthorized** - Missing or invalid token
  ```json
  {
    "error": "Unauthorized"
  }
  ```

- **409 Conflict** - Story with same title already exists
  ```json
  {
    "error": "Story with this title already exists"
  }
  ```

---

### Update Story

Update an existing story (requires authentication and ownership).

**Endpoint:** `PUT /api/stories/:slug`

**Authentication:** Required (Bearer token)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Story slug identifier |

**Request:** `multipart/form-data`

**Form Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `story` | File (JSON) | No | Updated story definition |
| `cover` | File (Image) | No | Updated cover image |
| `assets` | File[] | No | Updated story assets |

**Success Response (200):**

```json
{
  "success": true,
  "story": {
    "id": 1,
    "slug": "story-title",
    "version": "1.1.0",
    "storyJsonUrl": "/uploads/stories/story-title/1.1.0/story.json",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - User is not the story author
  ```json
  {
    "error": "Forbidden"
  }
  ```
- **404 Not Found** - Story not found
  ```json
  {
    "error": "Story not found"
  }
  ```

---

## Story Schema

See [Story Schema Documentation](./story-schema.md) for detailed information about the story JSON structure and validation rules.

## File Upload Limits

- Maximum file size: 10MB per file
- Supported image formats: JPG, PNG, WebP
- Supported audio formats: MP3, OGG, WAV
- Story JSON must be valid UTF-8

## Notes

- Stories are created with `isPublished: false` by default
- Only published stories appear in the public listing
- Story slugs are auto-generated from the title
- Each update creates a new version entry for history tracking
