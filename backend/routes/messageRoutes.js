import express from 'express';
import { getMessages, postMessage } from '../controllers/messageController.js';

const router = express.Router();

// Fetch messages for a specific room
router.get('/:roomId', getMessages);

// Post a new message to a specific room
router.post('/', postMessage);

export default router;
