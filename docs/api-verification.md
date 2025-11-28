# API Verification Script

This document explains how to use the API verification script to test all backend endpoints.

## Overview

The `verify-api.ts` script is an end-to-end test that verifies all API endpoints are working correctly by:
1. Registering a new user
2. Logging in
3. Uploading a story
4. Starting a game session
5. Making choices in the game

## Prerequisites

Before running the verification script, ensure:

1. **Database is running**
   ```bash
   npm run db:up
   ```

2. **Database migrations are applied**
   ```bash
   npm run prisma:migrate
   ```

3. **Development server is running**
   ```bash
   npm run dev
   ```

## Environment Variables

The script uses the following environment variables:

### `API_BASE_URL` (Optional)

Full URL to the API endpoint.

**Default:** `http://localhost:${PORT}/api`

**Usage:**
```bash
API_BASE_URL=https://staging.example.com/api npm run verify-api
```

**When to use:**
- Testing against a remote server
- Testing staging/production environments
- Using a custom domain

### `PORT` (Optional)

Port number where the Next.js server is running.

**Default:** `3000`

**Usage:**
```bash
PORT=3001 npm run verify-api
```

**When to use:**
- Your dev server runs on a different port
- Testing multiple environments simultaneously

## Running the Script

### Basic Usage (Default Port 3000)

```bash
npm run verify-api
```

This assumes your server is running at `http://localhost:3000`

### Custom Port

If your dev server runs on port 3001:

```bash
PORT=3001 npm run verify-api
```

### Custom Base URL

For testing against a deployed environment:

```bash
API_BASE_URL=https://api.staging.example.com/api npm run verify-api
```

### Using .env File

Add to your `.env` file:

```env
PORT=3001
# or
API_BASE_URL=http://localhost:3001/api
```

Then run:
```bash
npm run verify-api
```

## What the Script Tests

### 1. User Registration
- **Endpoint:** `POST /api/auth/register`
- **Tests:** User creation, token generation
- **Expected:** 200 OK with token and user data

### 2. User Login
- **Endpoint:** `POST /api/auth/login`
- **Tests:** Authentication, token generation
- **Expected:** 200 OK with token

### 3. Story Upload
- **Endpoint:** `POST /api/stories`
- **Tests:** File upload, story creation, metadata extraction
- **Expected:** 200 OK with story details
- **Note:** Creates a temporary story JSON file

### 4. Story Listing
- **Endpoint:** `GET /api/stories`
- **Tests:** Story retrieval, pagination
- **Expected:** 200 OK with story list
- **Note:** Story is manually published for testing

### 5. Session Creation
- **Endpoint:** `POST /api/sessions`
- **Tests:** Game session initialization
- **Expected:** 200 OK with session data

### 6. Choice Processing
- **Endpoint:** `POST /api/sessions/:sessionId/choice`
- **Tests:** Game logic, scene progression
- **Expected:** 200 OK with updated session

## Expected Output

Successful run:

```
Starting API Verification...

1. Registering User...
User registered: test-1234567890@example.com

2. Logging in...
Login successful

3. Uploading Story...
Story uploaded: test-story

4. Listing Stories...
Stories found: 1

5. Starting Session...
Session started: 1

6. Making Choice...
Choice made. New Scene: scene_end
Status: COMPLETED
Story completed successfully!

Verification Successful!
```

## Troubleshooting

### Error: Connection Refused

**Problem:** Cannot connect to the API server

**Solutions:**
1. Ensure dev server is running: `npm run dev`
2. Check the port matches: `PORT=3001 npm run verify-api`
3. Verify the server started successfully

### Error: Unauthorized

**Problem:** JWT token issues

**Solutions:**
1. Check `JWT_SECRET` is set in `.env`
2. Ensure database is accessible
3. Verify user was created successfully

### Error: Story not found

**Problem:** Story upload or retrieval failed

**Solutions:**
1. Check file upload permissions
2. Verify `public/uploads` directory exists
3. Check story JSON is valid

### Error: Database connection

**Problem:** Cannot connect to database

**Solutions:**
1. Start database: `npm run db:up`
2. Check database credentials in `.env`
3. Verify Prisma schema is up to date: `npm run prisma:generate`

## Script Configuration

### Changing Test Data

Edit `scripts/verify-api.ts` to modify:

- **Email format:** Line 15 - `const email = \`test-${Date.now()}@example.com\`;`
- **Password:** Line 16 - `const password = 'password123';`
- **Story structure:** Lines 41-66 - Story JSON object
- **Character data:** Line 112 - `characterData: { name: 'Hero' }`
- **Choice ID:** Line 127 - `choiceId: 'c1'`

### Adding More Tests

To add additional endpoint tests:

1. Add the test after line 138 (before "Verification Successful!")
2. Use the `token` variable for authenticated requests
3. Follow the existing pattern for error handling

Example:
```typescript
// 7. Test Comments
console.log('\n7. Testing Comments...');
const commentRes = await fetch(`${BASE_URL}/stories/${slug}/comments`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: 'Great story!', rating: 5 }),
});
const commentData: any = await commentRes.json();
if (!commentRes.ok) throw new Error(`Comment failed: ${JSON.stringify(commentData)}`);
console.log('Comment posted:', commentData.id);
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
- name: Run API Verification
  env:
    PORT: 3000
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
    JWT_SECRET: ${{ secrets.JWT_SECRET }}
  run: |
    npm run db:up
    npm run prisma:migrate
    npm run dev &
    sleep 5
    npm run verify-api
```

### Docker Example

```bash
docker-compose up -d
PORT=3000 npm run verify-api
docker-compose down
```

## Notes

- The script creates a unique test user each run (timestamp-based email)
- Temporary files are cleaned up automatically
- The script uses Prisma directly to publish the story (bypassing API)
- All requests use `node-fetch` for compatibility

## Related Documentation

- [API Overview](./api-overview.md)
- [Authentication API](./api-authentication.md)
- [Stories API](./api-stories.md)
- [Sessions API](./api-sessions.md)
- [Testing Guide](./testing.md)
