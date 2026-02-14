import { Request, Response } from 'express';
import prisma from '../config/database';
import { Exercise } from '../types';

/**
 * Get all exercises with optional search
 */
export const getExercises = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string || '';
    const muscleGroup = req.query.muscleGroup as string || '';
    const type = req.query.type as string || '';

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { muscleGroup: { contains: search } }
      ];
    }

    if (muscleGroup) {
      where.muscleGroup = { contains: muscleGroup };
    }

    if (type) {
      where.type = type;
    }

    const exercises = await prisma.exercise.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    const formattedExercises: Exercise[] = exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      muscleGroup: ex.muscleGroup,
      type: ex.type,
      image: ex.image,
      sets: ex.defaultSets,
      reps: ex.defaultReps,
      rest: ex.defaultRest,
    }));

    return res.json({ exercises: formattedExercises });
  } catch (error) {
    console.error('Get exercises error:', error);
    return res.status(500).json({ error: 'Failed to get exercises' });
  }
};

/**
 * Get exercise by ID
 */
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exercise = await prisma.exercise.findUnique({
      where: { id }
    });

    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    const formattedExercise: Exercise = {
      id: exercise.id,
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      type: exercise.type,
      image: exercise.image,
      sets: exercise.defaultSets,
      reps: exercise.defaultReps,
      rest: exercise.defaultRest,
    };

    return res.json({ exercise: formattedExercise });
  } catch (error) {
    console.error('Get exercise error:', error);
    return res.status(500).json({ error: 'Failed to get exercise' });
  }
};
