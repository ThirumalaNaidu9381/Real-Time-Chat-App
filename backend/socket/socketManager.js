// backend/sockets/socketManager.js

import Message from '../models/Message.js';

const onlineUsers = new Map();

export function handleSocketConnection(socket, io) {
  console.log('⚡ Client connected:', socket.id);

  // Track online users
  socket.on('user-online', (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit('online-users', Array.from(onlineUsers.keys()));
  });

  // Join room and send chat history
  socket.on('join-room', async ({ roomId, username }) => {
    socket.join(roomId);
    socket.roomId = roomId;
    socket.username = username;

    console.log(`🟢 ${username} joined room ${roomId}`);

    const messages = await Message.find({ room: roomId }).sort({ createdAt: 1 });
    socket.emit('chat-history', messages);

    const usersInRoom = Array.from(io.sockets.sockets.values())
      .filter(s => s.roomId === roomId)
      .map(s => s.username);

    io.to(roomId).emit('online-users', usersInRoom);
  });

  // Send message and store it
  socket.on('send-message', async ({ room, username, text }) => {
    const newMsg = new Message({
      senderName: username,
      content: text,
      room,
    });
    await newMsg.save();
    io.to(room).emit('receive-message', newMsg);
  });

  // Typing indicator with safety
  socket.on('typing', (data) => {
    if (!data || !data.roomId || !data.user) return;
    socket.to(data.roomId).emit('typing', data.user);
  });

  // Disconnect cleanup
  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    const roomId = socket.roomId;
    if (roomId) {
      const usersInRoom = Array.from(io.sockets.sockets.values())
        .filter(s => s.roomId === roomId && s.id !== socket.id)
        .map(s => s.username);
      io.to(roomId).emit('online-users', usersInRoom);
    }

    console.log('🔥 Client disconnected:', socket.id);
  });
}
