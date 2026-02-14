import { Router } from 'express';
import { getProfile } from '../controllers/profileController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /profile
 * @desc    Get user profile with aggregated stats
 * @access  Private
 */
router.get('/', authenticate, getProfile);

export default router;
