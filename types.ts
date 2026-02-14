export enum Page {
    HOME = 'HOME',
    FEED = 'FEED',
    ROUTINE_BUILDER = 'ROUTINE_BUILDER',
    ACTIVE_WORKOUT = 'ACTIVE_WORKOUT',
    WATCH_SYNC = 'WATCH_SYNC',
    PROFILE = 'PROFILE',
    SETTINGS = 'SETTINGS',
    EXERCISE_SELECTOR = 'EXERCISE_SELECTOR',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    ONBOARDING = 'ONBOARDING'
}

export interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    type: string;
    image: string;
    sets: number;
    reps: string;
    rest: number;
}

export interface FeedItem {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    timeAgo: string;
    title: string;
    tags: { label: string; type: 'intensity' | 'duration' | 'meta' }[];
    description?: string;
    stats: { label: string; value: string; unit?: string }[];
    likes: number;
    comments: number;
    image?: string;
    mapImage?: string;
    location?: string;
    exercisesCount?: number;
    type: 'lift' | 'run' | 'circuit';
}