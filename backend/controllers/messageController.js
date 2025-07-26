// controllers/messageController.js
import Message from '../models/Message.js';

// 📨 Get messages by room ID
export const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ room: roomId }).sort({ createdAt: 1 });

    // Optional: format response for frontend if needed
    const formatted = messages.map(msg => ({
      _id: msg._id,
      username: msg.senderName,
      text: msg.content,
      createdAt: msg.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// 💬 Post a new message
export const postMessage = async (req, res) => {
  const { senderName, content, room } = req.body;

  if (!senderName || !content || !room) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMessage = new Message({ senderName, content, room });
    const savedMessage = await newMessage.save();

    res.status(201).json({
      _id: savedMessage._id,
      username: savedMessage.senderName,
      text: savedMessage.content,
      createdAt: savedMessage.createdAt,
    });
  } catch (error) {
    console.error('❌ Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
};
