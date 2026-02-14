import { Request, Response } from 'express';
import prisma from '../config/database';
import { User, UserStats } from '../types';

/**
 * Get user profile with aggregated stats
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        totalWorkouts: true,
        totalHours: true,
        currentStreak: true,
        longestStreak: true,
        createdAt: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate additional stats
    const completedWorkouts = await prisma.workoutSession.findMany({
      where: {
        userId,
        finishedAt: { not: null }
      },
      select: {
        totalVolume: true,
        duration: true,
        startedAt: true,
        finishedAt: true
      },
      orderBy: { finishedAt: 'desc' },
      take: 100
    });

    const totalVolume = completedWorkouts.reduce((sum, w) => sum + w.totalVolume, 0);
    const totalDuration = completedWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);

    // Calculate weekly stats (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyWorkouts = await prisma.workoutSession.count({
      where: {
        userId,
        finishedAt: {
          gte: sevenDaysAgo
        }
      }
    });

    // Get consistency data (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const thirtyDayWorkouts = await prisma.workoutSession.findMany({
      where: {
        userId,
        finishedAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        finishedAt: true
      },
      orderBy: { finishedAt: 'asc' }
    });

    // Create consistency array (30 days, 1 for each day with workout, 0.1 for no workout)
    const consistency: number[] = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toISOString().split('T')[0];

      const hasWorkout = thirtyDayWorkouts.some(w =>
        w.finishedAt && w.finishedAt.toISOString().split('T')[0] === dateStr
      );

      consistency.push(hasWorkout ? 1 : 0.1);
    }

    // Get recent workouts
    const recentWorkouts = await prisma.workoutSession.findMany({
      where: {
        userId,
        finishedAt: { not: null }
      },
      take: 5,
      orderBy: { finishedAt: 'desc' },
      select: {
        id: true,
        name: true,
        duration: true,
        finishedAt: true,
        totalVolume: true,
        type: true,
        distance: true,
        location: true
      }
    });

    // Format recent workouts
    const formattedRecentWorkouts = recentWorkouts.map(w => ({
      id: w.id,
      name: w.name,
      date: formatDate(w.finishedAt!),
      duration: formatDuration(w.duration || 0),
      volume: w.type === 'run' || w.type === 'circuit'
        ? `${(w.distance || 0).toFixed(1)} mi`
        : `${Math.round(w.totalVolume)} lbs`,
      type: w.type,
      location: w.location
    }));

    const stats: UserStats = {
      workouts: user.totalWorkouts,
      hours: Math.round(user.totalHours),
      streak: user.currentStreak,
      volume: Math.round(totalVolume)
    };

    return res.json({
      user,
      stats,
      consistency,
      weeklyWorkouts,
      recentWorkouts: formattedRecentWorkouts,
      totalVolume: Math.round(totalVolume),
      totalDuration: Math.round(totalDuration)
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ error: 'Failed to get profile' });
  }
};

// Helper function to format date
const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
};

// Helper function to format duration
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMins}m`;
  }
  return `${remainingMins}m`;
};
