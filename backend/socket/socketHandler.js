// backend/socket/socketHandler.js
import Message from '../models/Message.js';

export function socketHandler(io, socket) {
  console.log('🔌 User connected:', socket.id);

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    console.log(`📥 ${username} joined room: ${room}`);

    // Broadcast to others
    socket.to(room).emit('receiveMessage', {
      username: 'System',
      text: `${username} has joined the room.`,
      createdAt: new Date().toISOString(),
    });
  });

  socket.on('sendMessage', async ({ username, text, room }) => {
    const newMessage = new Message({ senderName: username, content: text, room });
    await newMessage.save();

    io.to(room).emit('receiveMessage', {
      username,
      text,
      createdAt: newMessage.createdAt,
    });
  });

  socket.on('typing', ({ room, username }) => {
    socket.to(room).emit('typing', username);
  });

  socket.on('stopTyping', ({ room }) => {
    socket.to(room).emit('stopTyping');
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
}
