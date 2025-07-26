import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get user info
// @access  Public
router.post('/login', loginUser);

// Future: Add protected routes here using authMiddleware
// router.get('/profile', authMiddleware, getUserProfile);

export default router;
