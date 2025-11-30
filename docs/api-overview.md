# Tale Builder Arena API Documentation

Complete API documentation for the Tale Builder Arena backend services.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Error Handling](#error-handling)
5. [Rate Limiting](#rate-limiting)
6. [Versioning](#versioning)

## Overview

The Tale Builder Arena API provides endpoints for:

- User authentication and management
- Story creation and management
- Game session handling
- Comments and ratings
- User achievements

### Base URL

**Development:**

```
http://localhost:3001/api
```

**Production:**

```
https://your-domain.com/api
```

### Content Type

All requests and responses use JSON format:

```
Content-Type: application/json
```

Exception: File uploads use `multipart/form-data`

## Authentication

Most endpoints require authentication using JWT (JSON Web Tokens).

### Getting a Token

1. Register a new account: `POST /api/auth/register`
2. Or login with existing account: `POST /api/auth/login`

Both endpoints return a JWT token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Using the Token

Include the token in the Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Token Expiration

Tokens are valid for **7 days** from issuance. After expiration, users must login again.

## API Endpoints

### Authentication

- [Authentication API](./api-authentication.md)
  - `POST /api/auth/register` - Register new user
  - `POST /api/auth/login` - Login user

### Stories

- [Stories API](./api-stories.md)
  - `GET /api/stories` - List published stories
  - `GET /api/stories/:slug` - Get story details
  - `POST /api/stories` - Create new story (auth required)
  - `PUT /api/stories/:slug` - Update story (auth required)

### Game Sessions

- [Sessions API](./api-sessions.md)
  - `POST /api/sessions` - Start new game session (auth required)
  - `GET /api/sessions/:sessionId` - Get session status (auth required)
  - `POST /api/sessions/:sessionId/choice` - Make choice (auth required)

### Comments & Ratings

- [Comments API](./api-comments.md)
  - `GET /api/stories/:slug/comments` - List comments
  - `POST /api/stories/:slug/comments` - Add comment (auth required)

## Error Handling

### Standard Error Response

```json
{
  "error": "Error message"
}
```

### Validation Error Response

```json
{
  "error": [
    {
      "code": "invalid_type",
      "path": ["fieldName"],
      "message": "Detailed error message"
    }
  ]
}
```

### HTTP Status Codes

| Code | Meaning               | Usage                             |
| ---- | --------------------- | --------------------------------- |
| 200  | OK                    | Successful request                |
| 400  | Bad Request           | Invalid input data                |
| 401  | Unauthorized          | Missing or invalid authentication |
| 403  | Forbidden             | Authenticated but not authorized  |
| 404  | Not Found             | Resource doesn't exist            |
| 409  | Conflict              | Resource already exists           |
| 500  | Internal Server Error | Server error                      |

## Rate Limiting

**Current Status:** Not implemented

**Planned Limits:**

- 100 requests per minute per IP
- 1000 requests per hour per user

When implemented, rate limit info will be in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

## Versioning

**Current Version:** v1 (implicit)

API versioning will be added in the future:

```
/api/v2/stories
```

For now, all endpoints are considered v1.

## Data Models

### User

```typescript
{
  id: number;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Story

```typescript
{
  id: number;
  slug: string;
  title: Record<string, string>; // { en: "Title", th: "ชื่อ" }
  description: Record<string, string>;
  genre: string;
  coverImageUrl: string | null;
  storyJsonUrl: string;
  supportedLang: string[];
  version: string;
  isPublished: boolean;
  isActive: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Session

```typescript
{
  id: number;
  userId: number;
  storyId: number;
  characterData: object;
  currentScene: string;
  history: object[];
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  createdAt: Date;
  updatedAt: Date;
}
```

### Comment

```typescript
{
  id: number;
  storyId: number;
  userId: number;
  text: string;
  rating: number; // 1-5
  createdAt: Date;
}
```

## Best Practices

### Request Guidelines

1. **Always include Content-Type header** for JSON requests
2. **Use HTTPS** in production
3. **Handle errors gracefully** - check response status codes
4. **Store tokens securely** - use httpOnly cookies or secure storage
5. **Refresh tokens before expiration** - implement token refresh logic

### Performance Tips

1. **Use pagination** for list endpoints
2. **Cache responses** where appropriate
3. **Minimize payload size** - only request needed fields
4. **Batch requests** when possible

### Security

1. **Never expose JWT_SECRET** in client code
2. **Validate all user input** on both client and server
3. **Use HTTPS** for all API calls in production
4. **Implement CORS** properly for web clients
5. **Sanitize user-generated content** before display

## Support

For issues or questions:

- GitHub Issues: [Repository URL]
- Documentation: [Docs URL]
- Email: support@example.com

## Changelog

### 2024-01-01 - Initial Release

- Authentication endpoints
- Story management
- Game sessions
- Comments and ratings
