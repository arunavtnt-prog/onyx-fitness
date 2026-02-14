// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  totalWorkouts: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: Date;
}

export interface UserStats {
  workouts: number;
  hours: number;
  streak: number;
  volume?: number;
}

// Exercise Types
export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  type: string;
  image: string | null;
  sets: number;
  reps: string;
  rest: number;
}

// Workout Types
export interface WorkoutSet {
  id: string;
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  order: number;
  weight: number;
  reps: number;
  completed: boolean;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  name: string;
  startedAt: Date;
  finishedAt: Date | null;
  duration: number | null;
  type: 'lift' | 'run' | 'circuit';
  totalVolume: number;
  totalSets: number;
  totalReps: number;
  distance?: number;
  pace?: string;
  calories?: number;
  location?: string;
  sets: WorkoutSet[];
}

export interface WorkoutStartRequest {
  name: string;
  type: 'lift' | 'run' | 'circuit';
  exercises?: Array<{
    exerciseId: string;
    exerciseName: string;
    order: number;
  }>;
}

export interface WorkoutSetRequest {
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  order: number;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface WorkoutFinishRequest {
  sessionId: string;
  postToFeed?: boolean;
  description?: string;
}

// Feed Types
export interface FeedItem {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
  timeAgo: string;
  title: string;
  tags: Array<{ label: string; type: 'intensity' | 'duration' | 'meta' }>;
  description?: string;
  stats: Array<{ label: string; value: string; unit?: string }>;
  likes: number;
  comments: number;
  image?: string;
  mapImage?: string;
  location?: string;
  exercisesCount?: number;
  type: 'lift' | 'run' | 'circuit';
}

// Auth Types
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Express Request with User
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
