# Onyx Fitness - Backend Setup Guide

This guide will help you set up the backend infrastructure for the Onyx Fitness application.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (installed locally or use a cloud service)
- npm or yarn

## Quick Start

### 1. Install Backend Dependencies

```bash
npm run server:install
```

### 2. Set up Database

Option A: Local PostgreSQL

```bash
# Start PostgreSQL service (macOS)
brew services start postgresql

# Create database
createdb onyx_fitness
```

Option B: Cloud PostgreSQL (Recommended for development)

Sign up for a free tier at:
- [Neon](https://neon.tech) - Fastest to set up
- [Supabase](https://supabase.com) - Includes authentication
- [Railway](https://railway.app) - Easy deployment

Copy the connection string from your cloud provider.

### 3. Configure Environment Variables

```bash
# Copy the example file
cd server
cp .env.example .env
```

Edit `.env`:

```env
# Database - Use your connection string
DATABASE_URL="postgresql://username:password@localhost:5432/onyx_fitness?schema=public"

# Server (usually no changes needed)
PORT=3001
NODE_ENV=development

# CORS - Your frontend URL
CORS_ORIGIN=http://localhost:5173

# JWT - Generate a secure random string
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run Database Migrations

```bash
npm run db:migrate
```

This will create all the database tables and generate the Prisma Client.

### 5. Seed the Database (Optional)

```bash
npm run db:seed
```

This will populate the database with 20 common exercises.

### 6. Start the Backend Server

```bash
npm run server:dev
```

The API will be available at `http://localhost:3001`

## Testing the API

### Health Check

```bash
curl http://localhost:3001/health
```

### Register a User

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Exercises

```bash
curl http://localhost:3001/exercises
```

### Get Exercises with Search

```bash
curl "http://localhost:3001/exercises?search=bench"
```

## Frontend Integration

### 1. Configure Frontend Environment

Create `.env` in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

### 2. Update Your React Components

Replace mock data imports with API calls:

**Feed.tsx:**
```typescript
// Remove: import { MOCK_FEED_ITEMS } from '../constants';
// Add:
import { getFeed } from '../api';
import { useEffect, useState } from 'react';

const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

useEffect(() => {
  getFeed().then(data => setFeedItems(data.feed));
}, []);
```

**ExerciseSelector.tsx:**
```typescript
// Remove: import { MOCK_EXERCISES } from '../constants';
// Add:
import { getExercises } from '../api';
import { useEffect, useState } from 'react';

const [allExercises, setAllExercises] = useState<Exercise[]>([]);

useEffect(() => {
  getExercises({ search, selectedCategory }).then(data => setAllExercises(data.exercises));
}, [search, selectedCategory]);
```

**ActiveWorkout.tsx:**
```typescript
import { startWorkout, logSet, finishWorkout } from '../api';

// Start workout
const start = async () => {
  const { session } = await startWorkout({ name: 'Workout Name', type: 'lift' });
  setActiveSession(session);
};

// Log set
const saveSet = async (setData: LogSetRequest) => {
  await logSet(setData);
};

// Finish workout
const finish = async () => {
  await finishWorkout({ sessionId, postToFeed: true, description: 'Great workout!' });
};
```

**Profile.tsx:**
```typescript
// Remove: import { MOCK_HISTORY } from '../constants';
// Add:
import { getProfile, logout } from '../api';

const [profileData, setProfileData] = useState<ProfileData | null>(null);

useEffect(() => {
  getProfile().then(data => setProfileData(data));
}, []);
```

## Database Management

### View Database with Prisma Studio

```bash
npm run db:studio
```

This opens a web interface to view and edit your data.

### Reset Database

```bash
cd server
npm run db:reset
```

**Warning:** This will delete all data!

### Add New Migrations

After modifying `server/prisma/schema.prisma`:

```bash
npm run db:migrate
```

## API Documentation

### Authentication

- `POST /auth/register` - Create new user
- `POST /auth/login` - Login and get token
- `GET /auth/me` - Get current user profile (requires token)

### Exercises

- `GET /exercises` - Get all exercises (supports `?search=`, `?muscleGroup=`, `?type=`)
- `GET /exercises/:id` - Get specific exercise

### Workouts

- `POST /workouts/start` - Start new workout session
- `POST /workouts/set` - Log a workout set
- `POST /workouts/finish` - Finish workout (creates feed item)
- `GET /workouts/active` - Get current active workout
- `GET /workouts/history` - Get workout history

### Feed

- `GET /feed` - Get social feed
- `POST /feed/:id/like` - Like/unlike feed item
- `POST /feed/:id/comment` - Add comment

### Profile

- `GET /profile` - Get user profile with stats

## Troubleshooting

### "Connection refused" error

Make sure PostgreSQL is running:
```bash
# macOS
brew services list
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### "Prisma Client not generated"

Run:
```bash
cd server
npm run prisma:generate
```

### "Module not found" errors

Make sure you installed dependencies:
```bash
npm run server:install
```

### CORS errors

Check that your frontend URL matches `CORS_ORIGIN` in `.env`.

## Development Workflow

1. Make changes to code
2. Server auto-restarts with `npm run server:dev`
3. For schema changes, run `npm run db:migrate`
4. Test with frontend or curl
5. View data with `npm run db:studio`

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Use production PostgreSQL database
4. Configure proper CORS origins
5. Use HTTPS
6. Set up proper logging

See `server/README.md` for more details.
