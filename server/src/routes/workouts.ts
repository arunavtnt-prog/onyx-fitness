import { Router } from 'express';
import { startWorkout, logSet, finishWorkout, getActiveWorkout, getWorkoutHistory } from '../controllers/workoutsController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /workouts/start
 * @desc    Start a new workout session
 * @access  Private
 */
router.post('/start', authenticate, startWorkout);

/**
 * @route   POST /workouts/set
 * @desc    Log a set in a workout session
 * @access  Private
 */
router.post('/set', authenticate, logSet);

/**
 * @route   POST /workouts/finish
 * @desc    Finish a workout session and create feed item
 * @access  Private
 */
router.post('/finish', authenticate, finishWorkout);

/**
 * @route   GET /workouts/active
 * @desc    Get the current active workout session
 * @access  Private
 */
router.get('/active', authenticate, getActiveWorkout);

/**
 * @route   GET /workouts/history
 * @desc    Get workout history
 * @access  Private
 */
router.get('/history', authenticate, getWorkoutHistory);

export default router;
