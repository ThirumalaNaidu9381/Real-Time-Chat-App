import express from 'express';
import { createRoom, getRooms } from '../controllers/roomController.js';
// import authMiddleware from '../middleware/authMiddleware.js'; // Optional for protection

const router = express.Router();

// @route   POST /api/rooms
// @desc    Create a new chat room
// @access  Public (or protected with authMiddleware)
router.post('/', createRoom);

// @route   GET /api/rooms
// @desc    Fetch all available chat rooms
// @access  Public
router.get('/', getRooms);

export default router;
