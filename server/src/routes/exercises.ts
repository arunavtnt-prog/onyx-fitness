import { Router } from 'express';
import { getExercises, getExerciseById } from '../controllers/exercisesController';

const router = Router();

/**
 * @route   GET /exercises
 * @desc    Get all exercises with optional search filters
 * @access  Public
 * @query   search - Search by exercise name or muscle group
 * @query   muscleGroup - Filter by muscle group
 * @query   type - Filter by exercise type (strength, cardio, etc.)
 */
router.get('/', getExercises);

/**
 * @route   GET /exercises/:id
 * @desc    Get a specific exercise by ID
 * @access  Public
 */
router.get('/:id', getExerciseById);

export default router;
