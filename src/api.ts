/**
 * Onyx Fitness API Client
 *
 * This file provides typed functions for communicating with the backend API.
 * It automatically handles JWT token management and request/response formatting.
 */

// ============================================================================
// TYPES
// ============================================================================

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
  isLiked?: boolean;
}

export interface ProfileData {
  user: User;
  stats: UserStats;
  consistency: number[];
  weeklyWorkouts: number;
  recentWorkouts: Array<{
    id: string;
    name: string;
    date: string;
    duration: string;
    volume: string;
    type: 'lift' | 'run' | 'circuit';
    location?: string;
  }>;
  totalVolume: number;
  totalDuration: number;
}

// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Helper to get JWT token from localStorage
 */
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Helper to set JWT token in localStorage
 */
const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

/**
 * Helper to remove JWT token from localStorage
 */
const removeToken = (): void => {
  localStorage.removeItem('token');
};

/**
 * Helper to make API requests
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Register a new user
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  setToken(response.token);
  return response;
}

/**
 * Login user
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  setToken(response.token);
  return response;
}

/**
 * Logout user
 */
export function logout(): void {
  removeToken();
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<{ user: User }> {
  return apiRequest<{ user: User }>('/auth/me');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

// ============================================================================
// EXERCISES API
// ============================================================================

export interface ExercisesParams {
  search?: string;
  muscleGroup?: string;
  type?: string;
}

/**
 * Get all exercises with optional filters
 */
export async function getExercises(params?: ExercisesParams): Promise<{ exercises: Exercise[] }> {
  const query = new URLSearchParams();
  if (params?.search) query.append('search', params.search);
  if (params?.muscleGroup) query.append('muscleGroup', params.muscleGroup);
  if (params?.type) query.append('type', params.type);

  const queryString = query.toString();
  return apiRequest<{ exercises: Exercise[] }>(`/exercises${queryString ? `?${queryString}` : ''}`);
}

/**
 * Get a specific exercise by ID
 */
export async function getExerciseById(id: string): Promise<{ exercise: Exercise }> {
  return apiRequest<{ exercise: Exercise }>(`/exercises/${id}`);
}

// ============================================================================
// WORKOUTS API
// ============================================================================

export interface StartWorkoutRequest {
  name: string;
  type: 'lift' | 'run' | 'circuit';
  exercises?: Array<{
    exerciseId: string;
    exerciseName: string;
    order: number;
  }>;
}

export interface LogSetRequest {
  sessionId: string;
  exerciseId: string;
  exerciseName: string;
  order: number;
  weight: number;
  reps: number;
  completed: boolean;
}

export interface FinishWorkoutRequest {
  sessionId: string;
  postToFeed?: boolean;
  description?: string;
}

/**
 * Start a new workout session
 */
export async function startWorkout(data: StartWorkoutRequest): Promise<{ session: WorkoutSession }> {
  return apiRequest<{ session: WorkoutSession }>('/workouts/start', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Log a set in the current workout
 */
export async function logSet(data: LogSetRequest): Promise<{ set: WorkoutSet }> {
  return apiRequest<{ set: WorkoutSet }>('/workouts/set', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Finish a workout session
 */
export async function finishWorkout(data: FinishWorkoutRequest): Promise<{
  session: WorkoutSession;
  feedItem?: FeedItem;
}> {
  return apiRequest<{
    session: WorkoutSession;
    feedItem?: FeedItem;
  }>('/workouts/finish', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get the active workout session
 */
export async function getActiveWorkout(): Promise<{ session: WorkoutSession | null }> {
  return apiRequest<{ session: WorkoutSession | null }>('/workouts/active');
}

/**
 * Get workout history
 */
export async function getWorkoutHistory(params?: { limit?: number; offset?: number }): Promise<{
  sessions: WorkoutSession[];
}> {
  const query = new URLSearchParams();
  if (params?.limit) query.append('limit', params.limit.toString());
  if (params?.offset) query.append('offset', params.offset.toString());

  const queryString = query.toString();
  return apiRequest<{ sessions: WorkoutSession[] }>(
    `/workouts/history${queryString ? `?${queryString}` : ''}`
  );
}

// ============================================================================
// FEED API
// ============================================================================

export interface FeedParams {
  limit?: number;
  offset?: number;
}

/**
 * Get all feed items
 */
export async function getFeed(params?: FeedParams): Promise<{ feed: FeedItem[] }> {
  const query = new URLSearchParams();
  if (params?.limit) query.append('limit', params.limit.toString());
  if (params?.offset) query.append('offset', params.offset.toString());

  const queryString = query.toString();
  return apiRequest<{ feed: FeedItem[] }>(`/feed${queryString ? `?${queryString}` : ''}`);
}

/**
 * Like or unlike a feed item
 */
export async function likeFeedItem(id: string): Promise<{ liked: boolean; likes: number }> {
  return apiRequest<{ liked: boolean; likes: number }>(`/feed/${id}/like`, {
    method: 'POST',
  });
}

/**
 * Add comment to a feed item
 */
export async function commentFeedItem(id: string, content: string): Promise<{
  comment: { id: string; content: string; createdAt: Date };
  totalComments: number;
}> {
  return apiRequest<{
    comment: { id: string; content: string; createdAt: Date };
    totalComments: number;
  }>(`/feed/${id}/comment`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

// ============================================================================
// PROFILE API
// ============================================================================

/**
 * Get user profile with aggregated stats
 */
export async function getProfile(): Promise<ProfileData> {
  return apiRequest<ProfileData>('/profile');
}

// ============================================================================
// MOCK DATA REPLACEMENTS
// ============================================================================

/**
 * This function can be used to replace MOCK_FEED_ITEMS in your frontend
 *
 * Example in Feed.tsx:
 * const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
 *
 * useEffect(() => {
 *   getFeed().then(data => setFeedItems(data.feed));
 * }, []);
 */
export async function fetchFeedItems() {
  try {
    const data = await getFeed();
    return data.feed;
  } catch (error) {
    console.error('Failed to fetch feed:', error);
    return [];
  }
}

/**
 * This function can be used to replace MOCK_EXERCISES in your frontend
 *
 * Example in ExerciseSelector.tsx:
 * const [exercises, setExercises] = useState<Exercise[]>([]);
 *
 * useEffect(() => {
 *   getExercises().then(data => setExercises(data.exercises));
 * }, []);
 */
export async function fetchExercises() {
  try {
    const data = await getExercises();
    return data.exercises;
  } catch (error) {
    console.error('Failed to fetch exercises:', error);
    return [];
  }
}

/**
 * This function can be used to replace MOCK_HISTORY in your frontend
 *
 * Example in Profile.tsx:
 * const [history, setHistory] = useState<RecentWorkout[]>([]);
 *
 * useEffect(() => {
 *   getProfile().then(data => setHistory(data.recentWorkouts));
 * }, []);
 */
export async function fetchWorkoutHistory() {
  try {
    const data = await getProfile();
    return data.recentWorkouts;
  } catch (error) {
    console.error('Failed to fetch workout history:', error);
    return [];
  }
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {
  // Auth
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,

  // Exercises
  getExercises,
  getExerciseById,

  // Workouts
  startWorkout,
  logSet,
  finishWorkout,
  getActiveWorkout,
  getWorkoutHistory,

  // Feed
  getFeed,
  likeFeedItem,
  commentFeedItem,

  // Profile
  getProfile,

  // Convenience functions
  fetchFeedItems,
  fetchExercises,
  fetchWorkoutHistory,
};
