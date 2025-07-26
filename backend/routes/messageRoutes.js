import express from 'express';
import { getMessages, postMessage } from '../controllers/messageController.js';
// import authMiddleware from '../middleware/authMiddleware.js'; // Optional

const router = express.Router();

// @route   GET /api/messages/:roomId
// @desc    Fetch all messages for a specific chat room
// @access  Public (or use authMiddleware if needed)
router.get('/:roomId', getMessages);

// @route   POST /api/messages
// @desc    Post a new message to a specific chat room
// @access  Public (or use authMiddleware if needed)
router.post('/', postMessage);

export default router;
