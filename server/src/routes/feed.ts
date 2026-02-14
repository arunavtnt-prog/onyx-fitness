import { Router } from 'express';
import { getFeed, likeFeedItem, commentFeedItem } from '../controllers/feedController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /feed
 * @desc    Get all feed items
 * @access  Public
 */
router.get('/', getFeed);

/**
 * @route   POST /feed/:id/like
 * @desc    Like or unlike a feed item
 * @access  Private
 */
router.post('/:id/like', authenticate, likeFeedItem);

/**
 * @route   POST /feed/:id/comment
 * @desc    Add comment to a feed item
 * @access  Private
 */
router.post('/:id/comment', authenticate, commentFeedItem);

export default router;
