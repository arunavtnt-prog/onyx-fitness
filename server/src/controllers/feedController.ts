import { Request, Response } from 'express';
import prisma from '../config/database';
import { FeedItem } from '../types';

// Helper function to format time ago
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

/**
 * Get feed with user details and stats
 */
export const getFeed = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const feedItems = await prisma.feedItem.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          }
        }
      }
    });

    const formattedFeed: FeedItem[] = feedItems.map((item) => ({
      id: item.id,
      user: {
        id: item.user.id,
        name: item.user.name,
        avatar: item.user.avatar || '',
      },
      timeAgo: formatTimeAgo(item.createdAt),
      title: item.title,
      tags: JSON.parse(item.tags || '[]') as Array<{ label: string; type: 'intensity' | 'duration' | 'meta' }>,
      description: item.description || undefined,
      stats: JSON.parse(item.stats || '[]') as Array<{ label: string; value: string; unit?: string }>,
      likes: item.likes,
      comments: item.comments,
      image: item.imageUrl || undefined,
      mapImage: item.mapImageUrl || undefined,
      location: item.location || undefined,
      exercisesCount: item.exercisesCount || undefined,
      type: item.type as 'lift' | 'run' | 'circuit',
    }));

    // Check if current user has liked each item
    if (userId) {
      const userLikes = await prisma.like.findMany({
        where: {
          userId,
          feedItemId: { in: formattedFeed.map(f => f.id) }
        },
        select: { feedItemId: true }
      });

      const likedItemIds = new Set(userLikes.map(l => l.feedItemId));
      (formattedFeed as any).forEach((item: any) => {
        item.isLiked = likedItemIds.has(item.id);
      });
    }

    return res.json({ feed: formattedFeed });
  } catch (error) {
    console.error('Get feed error:', error);
    return res.status(500).json({ error: 'Failed to get feed' });
  }
};

/**
 * Like a feed item
 */
export const likeFeedItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_feedItemId: {
          userId,
          feedItemId: id
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_feedItemId: {
            userId,
            feedItemId: id
          }
        }
      });

      await prisma.feedItem.update({
        where: { id },
        data: { likes: { decrement: 1 } }
      });

      return res.json({ liked: false, likes: -1 });
    }

    // Like
    await prisma.like.create({
      data: {
        userId,
        feedItemId: id
      }
    });

    const feedItem = await prisma.feedItem.update({
      where: { id },
      data: { likes: { increment: 1 } },
      select: { likes: true }
    });

    return res.json({ liked: true, likes: feedItem.likes });
  } catch (error) {
    console.error('Like feed item error:', error);
    return res.status(500).json({ error: 'Failed to like feed item' });
  }
};

/**
 * Add comment to feed item
 */
export const commentFeedItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const comment = await prisma.comment.create({
      data: {
        userId,
        feedItemId: id,
        content: content.trim()
      }
    });

    const feedItem = await prisma.feedItem.update({
      where: { id },
      data: { comments: { increment: 1 } },
      select: { comments: true }
    });

    return res.status(201).json({
      comment,
      totalComments: feedItem.comments
    });
  } catch (error) {
    console.error('Comment feed item error:', error);
    return res.status(500).json({ error: 'Failed to add comment' });
  }
};
