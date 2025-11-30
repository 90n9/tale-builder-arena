# Comments and Ratings API

This document describes the comments and ratings endpoints for the Tale Builder Arena API.

## Base URL

```
/api/stories/:slug/comments
```

## Endpoints

### List Comments

Get all comments for a specific story.

**Endpoint:** `GET /api/stories/:slug/comments`

**Path Parameters:**

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| `slug`    | string | Story slug identifier |

**Example Request:**

```
GET /api/stories/test-story/comments
```

**Success Response (200):**

```json
[
  {
    "id": 1,
    "storyId": 1,
    "userId": 1,
    "text": "Great story! Really enjoyed the branching paths.",
    "rating": 5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "user": {
      "id": 1,
      "username": "player1"
    }
  },
  {
    "id": 2,
    "storyId": 1,
    "userId": 2,
    "text": "Good story but could use more choices.",
    "rating": 4,
    "createdAt": "2024-01-02T00:00:00.000Z",
    "user": {
      "id": 2,
      "username": "player2"
    }
  }
]
```

**Error Responses:**

- **500 Internal Server Error**
  ```json
  {
    "error": "Internal server error"
  }
  ```

---

### Create Comment

Add a comment and rating to a story (requires authentication).

**Endpoint:** `POST /api/stories/:slug/comments`

**Authentication:** Required (Bearer token)

**Path Parameters:**

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| `slug`    | string | Story slug identifier |

**Request Body:**

```json
{
  "text": "Amazing story with great choices!",
  "rating": 5
}
```

**Request Fields:**

| Field    | Type    | Required | Validation        |
| -------- | ------- | -------- | ----------------- |
| `text`   | string  | Yes      | 1-1000 characters |
| `rating` | integer | Yes      | 1-5 (inclusive)   |

**Success Response (200):**

```json
{
  "id": 1,
  "storyId": 1,
  "userId": 1,
  "text": "Amazing story with great choices!",
  "rating": 5,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "user": {
    "id": 1,
    "username": "player1"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Invalid input data

  ```json
  {
    "error": [
      {
        "code": "too_small",
        "path": ["rating"],
        "message": "Number must be greater than or equal to 1"
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

---

## Rating System

### Rating Values

| Rating | Meaning       |
| ------ | ------------- |
| 1      | Poor          |
| 2      | Below Average |
| 3      | Average       |
| 4      | Good          |
| 5      | Excellent     |

### Rating Guidelines

- Ratings are required when posting a comment
- Ratings must be between 1 and 5 (inclusive)
- Each user can post multiple comments/ratings per story
- Average ratings can be calculated from all comments

## Comment Guidelines

### Text Requirements

- Minimum length: 1 character
- Maximum length: 1000 characters
- Must be non-empty string

### Best Practices

- Be constructive and respectful
- Focus on the story content and gameplay
- Avoid spoilers when possible
- Provide specific feedback

## Usage Examples

### Posting a Comment with Rating

```javascript
const response = await fetch('/api/stories/adventure-quest/comments', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Loved the multiple endings!',
    rating: 5,
  }),
});

const comment = await response.json();
```

### Fetching All Comments

```javascript
const response = await fetch('/api/stories/adventure-quest/comments');
const comments = await response.json();

// Calculate average rating
const avgRating = comments.reduce((sum, c) => sum + c.rating, 0) / comments.length;
```

## Future Enhancements

Potential future features:

- Comment editing and deletion
- Comment replies/threads
- Upvoting/downvoting comments
- Reporting inappropriate comments
- Pagination for large comment lists
- Filtering by rating
- Sorting options (newest, highest rated, etc.)

## Notes

- Comments are displayed in reverse chronological order (newest first)
- User information is included with each comment
- Comments are public and visible to all users
- No moderation system is currently implemented
