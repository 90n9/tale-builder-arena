# Authentication API

This document describes the authentication endpoints for the Tale Builder Arena API.

## Base URL

```
/api/auth
```

## Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**Validation Rules:**

- `email`: Valid email format, required
- `username`: 3-50 characters, required
- `password`: Minimum 6 characters, required

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Invalid input data

  ```json
  {
    "error": [
      {
        "code": "invalid_type",
        "path": ["email"],
        "message": "Invalid email"
      }
    ]
  }
  ```

- **409 Conflict** - User already exists

  ```json
  {
    "error": "User already exists"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "error": "Internal server error"
  }
  ```

---

### Login

Authenticate an existing user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Invalid input data

  ```json
  {
    "error": [
      {
        "code": "invalid_type",
        "message": "Invalid email or password"
      }
    ]
  }
  ```

- **401 Unauthorized** - Invalid credentials

  ```json
  {
    "error": "Invalid credentials"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "error": "Internal server error"
  }
  ```

---

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

The token is valid for 7 days from issuance.

## Token Payload

The JWT token contains the following payload:

```json
{
  "userId": 1,
  "iat": 1234567890,
  "exp": 1234567890
}
```

## Security Notes

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens are signed with HS256 algorithm
- Set `JWT_SECRET` environment variable for production
- Tokens expire after 7 days
