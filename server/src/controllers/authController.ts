import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateToken } from '../middleware/auth';
import { RegisterRequest, LoginRequest, User } from '../types';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name }: RegisterRequest = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        avatar: null,
        totalWorkouts: 0,
        totalHours: 0,
        currentStreak: 0,
        longestStreak: 0,
      },
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

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    return res.status(201).json({
      token,
      user
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Prepare user response
    const userResponse: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      totalWorkouts: user.totalWorkouts,
      totalHours: user.totalHours,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      createdAt: user.createdAt,
    };

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    return res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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

    return res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({ error: 'Failed to get user' });
  }
};
