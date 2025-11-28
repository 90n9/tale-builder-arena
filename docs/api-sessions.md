# Game Sessions API

This document describes the game session management endpoints for the Tale Builder Arena API.

## Base URL

```
/api/sessions
```

## Endpoints

### Start New Session

Create a new game session for a story.

**Endpoint:** `POST /api/sessions`

**Authentication:** Required (Bearer token)

**Request Body:**

```json
{
  "storyId": 1,
  "characterData": {
    "name": "Hero",
    "class": "warrior",
    "stats": {
      "strength": 10,
      "intelligence": 8
    }
  }
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `storyId` | integer | Yes | ID of the story to play |
| `characterData` | object | Yes | Character creation data |

**Success Response (200):**

```json
{
  "id": 1,
  "userId": 1,
  "storyId": 1,
  "characterData": {
    "name": "Hero",
    "class": "warrior",
    "stats": {
      "strength": 10,
      "intelligence": 8
    }
  },
  "currentScene": "scene_1",
  "history": [],
  "status": "IN_PROGRESS",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**

- **400 Bad Request** - Invalid input data
  ```json
  {
    "error": [
      {
        "code": "invalid_type",
        "path": ["storyId"],
        "message": "Expected number, received string"
      }
    ]
  }
  ```

- **401 Unauthorized** - Missing or invalid token
  ```json
  {
    "error": "Unauthorized"
  }
  ```

- **404 Not Found** - Story not found
  ```json
  {
    "error": "Story not found"
  }
  ```

- **500 Internal Server Error** - Story data missing
  ```json
  {
    "error": "Story data missing"
  }
  ```

---

### Get Session Status

Retrieve the current status of a game session.

**Endpoint:** `GET /api/sessions/:sessionId`

**Authentication:** Required (Bearer token)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `sessionId` | integer | Session ID |

**Example Request:**

```
GET /api/sessions/1
```

**Success Response (200):**

```json
{
  "id": 1,
  "userId": 1,
  "storyId": 1,
  "characterData": {
    "name": "Hero",
    "stats": { "strength": 10 }
  },
  "currentScene": "scene_3",
  "history": [
    { "sceneId": "scene_1", "choiceId": "c1" },
    { "sceneId": "scene_2", "choiceId": "c2" }
  ],
  "status": "IN_PROGRESS",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z"
}
```

**Error Responses:**

- **401 Unauthorized** - Missing or invalid token
- **403 Forbidden** - Session belongs to different user
  ```json
  {
    "error": "Forbidden"
  }
  ```
- **404 Not Found** - Session not found
  ```json
  {
    "error": "Session not found"
  }
  ```

---

### Make Choice

Process a player's choice and advance the story.

**Endpoint:** `POST /api/sessions/:sessionId/choice`

**Authentication:** Required (Bearer token)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `sessionId` | integer | Session ID |

**Request Body:**

```json
{
  "choiceId": "choice_1"
}
```

**Success Response (200):**

```json
{
  "session": {
    "id": 1,
    "currentScene": "scene_2",
    "characterData": {
      "name": "Hero",
      "stats": { "strength": 11 }
    },
    "status": "IN_PROGRESS",
    "history": [
      { "sceneId": "scene_1", "choiceId": "choice_1" }
    ]
  },
  "scene": {
    "id": "scene_2",
    "text": { "en": "You arrive at the next location..." },
    "choices": [
      {
        "id": "choice_2a",
        "text": { "en": "Go left" },
        "nextSceneId": "scene_3"
      },
      {
        "id": "choice_2b",
        "text": { "en": "Go right" },
        "nextSceneId": "scene_4"
      }
    ]
  }
}
```

**Success Response - Story Completed (200):**

```json
{
  "session": {
    "id": 1,
    "currentScene": "ending_good",
    "status": "COMPLETED",
    "history": [
      { "sceneId": "scene_1", "choiceId": "choice_1" },
      { "sceneId": "scene_2", "choiceId": "choice_2" }
    ]
  },
  "scene": {
    "id": "ending_good",
    "text": { "en": "You have completed the quest!" },
    "isEnding": true,
    "endingId": "ending_good"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Invalid choice or session not active
  ```json
  {
    "error": "Invalid choice"
  }
  ```
  or
  ```json
  {
    "error": "Session is not active"
  }
  ```

- **401 Unauthorized** - Missing or invalid token

- **403 Forbidden** - Session belongs to different user

- **404 Not Found** - Session not found

- **500 Internal Server Error** - Story data issues
  ```json
  {
    "error": "Scene not found in story"
  }
  ```

---

## Session Status Values

| Status | Description |
|--------|-------------|
| `IN_PROGRESS` | Session is active and playable |
| `COMPLETED` | Player reached an ending |
| `ABANDONED` | Session was abandoned by player |

## Game Flow

1. **Start Session**: Create a new session with character data
2. **Get Current Scene**: Retrieve the current scene from the story JSON
3. **Make Choice**: Submit a choice to advance the story
4. **Repeat**: Continue making choices until reaching an ending
5. **Completion**: Session status changes to `COMPLETED` when an ending is reached

## History Tracking

Each choice is recorded in the session history:

```json
{
  "sceneId": "scene_1",
  "choiceId": "choice_1"
}
```

This allows for:
- Replay functionality
- Achievement tracking
- Analytics

## Achievements

When a player completes a story (reaches an ending), an achievement is automatically recorded in the `UserAchievement` table with the `endingId`.

## Notes

- Sessions are tied to a specific user and story
- Only the session owner can make choices
- Character data is stored as JSON and can be updated by choice rewards
- The server validates choices against the story definition
- Scene data is returned with each choice to avoid additional API calls
