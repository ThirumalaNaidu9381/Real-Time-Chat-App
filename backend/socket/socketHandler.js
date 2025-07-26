// backend/socket/socketHandler.js
import Message from '../models/Message.js';

export function socketHandler(io, socket) {
  console.log('🔌 User connected:', socket.id);

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    console.log(`📥 ${username} joined room: ${room}`);

    // Notify others in the room
    socket.to(room).emit('receiveMessage', {
      username: 'System',
      text: `${username} has joined the room.`,
      createdAt: new Date().toISOString(),
    });
  });

  socket.on('sendMessage', async ({ username, text, room }) => {
    if (!text || !username || !room) return;

    try {
      const newMessage = new Message({ senderName: username, content: text, room });
      await newMessage.save();

      io.to(room).emit('receiveMessage', {
        username,
        text,
        createdAt: newMessage.createdAt,
      });
    } catch (error) {
      console.error('💥 Failed to save message:', error.message);
    }
  });

  socket.on('typing', ({ room, username }) => {
    if (room && username) {
      socket.to(room).emit('typing', username);
    }
  });

  socket.on('stopTyping', ({ room }) => {
    if (room) {
      socket.to(room).emit('stopTyping');
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
}
