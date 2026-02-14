# Onyx Fitness - Backend API

Backend API for the Onyx Fitness premium fitness tracker application.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing

## Project Structure

```
server/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   └── database.ts        # Prisma client configuration
│   ├── controllers/
│   │   ├── authController.ts  # Authentication logic
│   │   ├── feedController.ts  # Feed operations
│   │   ├── exercisesController.ts  # Exercise management
│   │   ├── workoutsController.ts   # Workout session management
│   │   └── profileController.ts    # User profile & stats
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication middleware
│   │   └── errorHandler.ts   # Error handling middleware
│   ├── routes/
│   │   ├── auth.ts           # Authentication routes
│   │   ├── feed.ts           # Feed routes
│   │   ├── exercises.ts      # Exercise routes
│   │   ├── workouts.ts       # Workout routes
│   │   └── profile.ts        # Profile routes
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── index.ts              # Application entry point
├── .env.example              # Environment variables template
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript configuration
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/onyx_fitness?schema=public"

# Server
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### 3. Set up PostgreSQL

Make sure PostgreSQL is installed and running. Create a database:

```sql
CREATE DATABASE onyx_fitness;
```

Or use a cloud PostgreSQL service like:
- [Neon](https://neon.tech)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

### 4. Run Database Migrations

```bash
npm run prisma:migrate
```

This will:
- Create the database tables
- Apply the schema
- Generate the Prisma Client

### 5. Seed the Database (Optional)

Create a seed file to populate initial exercises:

```bash
npx prisma db seed
```

Or use Prisma Studio to manually add data:

```bash
npm run prisma:studio
```

### 6. Start the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login user | Public |
| GET | `/auth/me` | Get current user | Private |

### Feed

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/feed` | Get all feed items | Public |
| POST | `/feed/:id/like` | Like/unlike feed item | Private |
| POST | `/feed/:id/comment` | Add comment | Private |

### Exercises

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/exercises` | Get all exercises (with search) | Public |
| GET | `/exercises/:id` | Get exercise by ID | Public |

Query parameters for `/exercises`:
- `search` - Search by name or muscle group
- `muscleGroup` - Filter by muscle group
- `type` - Filter by exercise type

### Workouts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/workouts/start` | Start a new workout | Private |
| POST | `/workouts/set` | Log a workout set | Private |
| POST | `/workouts/finish` | Finish a workout | Private |
| GET | `/workouts/active` | Get active workout | Private |
| GET | `/workouts/history` | Get workout history | Private |

### Profile

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get user profile & stats | Private |

## Database Schema

### User
- id, email, password_hash, name, avatar
- Stats: total_workouts, total_hours, current_streak, longest_streak

### Exercise
- id, name, muscle_group, type, image
- Defaults: default_sets, default_reps, default_rest

### WorkoutSession
- id, user_id, name, started_at, finished_at, duration, type
- Stats: total_volume, total_sets, total_reps
- Run-specific: distance, pace, calories, location

### WorkoutSet
- id, session_id, exercise_id, exercise_name, order, weight, reps, completed, notes

### FeedItem
- id, user_id, session_id, type, title, description, image_url, map_image_url, location
- JSON fields: tags, stats
- Engagement: likes, comments, exercises_count

### Like
- id, user_id, feed_item_id (unique constraint)

### Comment
- id, user_id, feed_item_id, content

## Frontend Integration

The frontend uses the `src/api.ts` file to communicate with this API. Key functions:

```typescript
import api from './api';

// Authentication
await api.login({ email, password });
await api.register({ email, password, name });
const user = await api.getCurrentUser();

// Exercises
const exercises = await api.getExercises({ search: 'bench' });

// Workouts
const session = await api.startWorkout({ name: 'Leg Day', type: 'lift' });
await api.logSet({ sessionId, exerciseId, weight, reps, completed });
const result = await api.finishWorkout({ sessionId, postToFeed: true });

// Feed
const feed = await api.getFeed();
await api.likeFeedItem(feedItemId);

// Profile
const profile = await api.getProfile();
```

## Development

### Prisma Studio

View and edit your database:

```bash
npm run prisma:studio
```

### Type Generation

Regenerate Prisma types after schema changes:

```bash
npm run prisma:generate
```

### Create a Migration

After modifying `schema.prisma`:

```bash
npm run prisma:migrate
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use a strong `JWT_SECRET`
3. Use a production PostgreSQL database
4. Configure proper CORS origins
5. Use HTTPS
6. Set up proper logging and monitoring

## Health Check

The API provides a health check endpoint:

```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-03-04T12:00:00.000Z"
}
```
