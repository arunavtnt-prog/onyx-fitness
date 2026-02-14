import { Request, Response } from 'express';
import prisma from '../config/database';
import { WorkoutStartRequest, WorkoutSetRequest, WorkoutFinishRequest, WorkoutSession } from '../types';

/**
 * Start a new workout session
 */
export const startWorkout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { name, type, exercises = [] }: WorkoutStartRequest = req.body;

    if (!name || !type) {
      return res.status(400). json({ error: 'Name and type are required' });
    }

    const session = await prisma.workoutSession.create({
      data: {
        userId,
        name,
        type,
        totalVolume: 0,
        totalSets: 0,
        totalReps: 0,
      }
    });

    return res.status(201).json({ session });
  } catch (error) {
    console.error('Start workout error:', error);
    return res.status(500).json({ error: 'Failed to start workout' });
  }
};

/**
 * Log a set in the current workout
 */
export const logSet = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const {
      sessionId,
      exerciseId,
      exerciseName,
      order,
      weight,
      reps,
      completed
    }: WorkoutSetRequest = req.body;

    // Verify session belongs to user
    const session = await prisma.workoutSession.findFirst({
      where: {
        id: sessionId,
        userId
      }
    });

    if (!session) {
      return res.status(404).json({ error: 'Workout session not found' });
    }

    // Create or update set
    const workoutSet = await prisma.workoutSet.upsert({
      where: {
        id: `${sessionId}-${exerciseId}-${order}`
      },
      update: {
        weight,
        reps,
        completed
      },
      create: {
        sessionId,
        exerciseId,
        exerciseName,
        order,
        weight,
        reps,
        completed
      }
    });

    // Update session totals if completed
    if (completed) {
      const allSets = await prisma.workoutSet.findMany({
        where: { sessionId, completed: true }
      });

      const totalVolume = allSets.reduce((sum, s) => sum + (s.weight * s.reps), 0);
      const totalSets = allSets.length;
      const totalReps = allSets.reduce((sum, s) => sum + s.reps, 0);

      await prisma.workoutSession.update({
        where: { id: sessionId },
        data: {
          totalVolume,
          totalSets,
          totalReps
        }
      });
    }

    return res.json({ set: workoutSet });
  } catch (error) {
    console.error('Log set error:', error);
    return res.status(500).json({ error: 'Failed to log set' });
  }
};

/**
 * Finish a workout session
 */
export const finishWorkout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { sessionId, postToFeed = true, description }: WorkoutFinishRequest = req.body;

    // Get session
    const session = await prisma.workoutSession.findFirst({
      where: {
        id: sessionId,
        userId,
        finishedAt: null
      },
      include: {
        sets: {
          where: { completed: true },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!session) {
      return res.status(404).json({ error: 'Workout session not found or already finished' });
    }

    // Calculate duration
    const now = new Date();
    const startedAt = new Date(session.startedAt);
    const duration = Math.floor((now.getTime() - startedAt.getTime()) / 1000);

    // Update session
    const finishedSession = await prisma.workoutSession.update({
      where: { id: sessionId },
      data: {
        finishedAt: now,
        duration
      }
    });

    // Update user stats
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user) {
      // Calculate streak
      const lastWorkout = await prisma.workoutSession.findFirst({
        where: {
          userId,
          finishedAt: { not: null }
        },
        orderBy: { finishedAt: 'desc' },
        skip: 1 // Skip the current workout we just finished
      });

      let newStreak = user.currentStreak || 0;
      if (lastWorkout && lastWorkout.finishedAt) {
        const daysSince = Math.floor(
          (startedAt.getTime() - lastWorkout.finishedAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysSince <= 1) {
          newStreak += 1;
        } else if (daysSince > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          totalWorkouts: { increment: 1 },
          totalHours: { increment: duration / 3600 },
          currentStreak: newStreak,
          longestStreak: newStreak > user.longestStreak ? newStreak : user.longestStreak
        }
      });
    }

    // Create feed item if requested
    let feedItem = null;
    if (postToFeed) {
      const tags: any[] = [];
      const stats: any[] = [];

      // Add duration tag
      const durationMins = Math.floor(duration / 60);
      if (durationMins < 60) {
        tags.push({ label: `${durationMins}m`, type: 'duration' as const });
      } else {
        const hours = Math.floor(durationMins / 60);
        const mins = durationMins % 60;
        tags.push({ label: `${hours}h ${mins}m`, type: 'duration' as const });
      }

      // Add stats based on workout type
      if (session.type === 'lift') {
        tags.push({ label: 'STRENGTH', type: 'intensity' as const });

        // Find top exercise
        const exerciseCounts: Record<string, number> = {};
        session.sets.forEach(set => {
          exerciseCounts[set.exerciseName] = (exerciseCounts[set.exerciseName] || 0) + 1;
        });
        const topExercise = Object.entries(exerciseCounts).sort((a, b) => b[1] - a[1])[0];

        if (topExercise) {
          stats.push({ label: topExercise[0], value: Math.round(session.totalVolume).toString(), unit: 'LBS' });
        }

        if (session.totalVolume > 1000) {
          stats.push({ label: 'Volume', value: (session.totalVolume / 1000).toFixed(1), unit: 'K LBS' });
        }

        feedItem = await prisma.feedItem.create({
          data: {
            userId,
            sessionId: sessionId,
            type: session.type,
            title: session.name,
            description,
            tags: JSON.stringify(tags),
            stats: JSON.stringify(stats),
            exercisesCount: new Set(session.sets.map(s => s.exerciseId)).size
          }
        });
      } else if (session.type === 'run' || session.type === 'circuit') {
        tags.push({ label: session.type === 'run' ? 'CARDIO' : 'HIIT', type: 'intensity' as const });

        if (session.distance) {
          stats.push({ label: 'Distance', value: session.distance.toString(), unit: 'km' });
        }
        if (session.pace) {
          stats.push({ label: 'Pace', value: session.pace, unit: '/km' });
        }
        if (session.calories) {
          stats.push({ label: 'Cal', value: session.calories.toString(), unit: 'kcal' });
        }

        feedItem = await prisma.feedItem.create({
          data: {
            userId,
            sessionId: sessionId,
            type: session.type,
            title: session.name,
            description,
            tags: JSON.stringify(tags),
            stats: JSON.stringify(stats),
            location: session.location || undefined
          }
        });
      }
    }

    return res.json({
      session: finishedSession,
      feedItem
    });
  } catch (error) {
    console.error('Finish workout error:', error);
    return res.status(500).json({ error: 'Failed to finish workout' });
  }
};

/**
 * Get active workout session
 */
export const getActiveWorkout = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const session = await prisma.workoutSession.findFirst({
      where: {
        userId,
        finishedAt: null
      },
      include: {
        sets: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!session) {
      return res.json({ session: null });
    }

    return res.json({ session });
  } catch (error) {
    console.error('Get active workout error:', error);
    return res.status(500).json({ error: 'Failed to get active workout' });
  }
};

/**
 * Get workout history
 */
export const getWorkoutHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const sessions = await prisma.workoutSession.findMany({
      where: {
        userId,
        finishedAt: { not: null }
      },
      take: limit,
      skip: offset,
      orderBy: { finishedAt: 'desc' },
      include: {
        sets: {
          where: { completed: true },
          orderBy: { order: 'asc' }
        }
      }
    });

    return res.json({ sessions });
  } catch (error) {
    console.error('Get workout history error:', error);
    return res.status(500).json({ error: 'Failed to get workout history' });
  }
};
