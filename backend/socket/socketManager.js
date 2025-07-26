// backend/socket/socketManager.js
import Message from '../models/Message.js';

const onlineUsers = new Map(); // Map<room, Set<username>>

export const handleSocketConnection = (socket, io) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on('joinRoom', async ({ username, room }) => {
    if (!username || !room) return;

    socket.join(room);
    socket.username = username;
    socket.room = room;

    if (!onlineUsers.has(room)) {
      onlineUsers.set(room, new Set());
    }
    onlineUsers.get(room).add(username);

    try {
      const messages = await Message.find({ room }).sort({ createdAt: 1 });
      const formattedMessages = messages.map(msg => ({
        username: msg.senderName,
        text: msg.content,
        createdAt: msg.createdAt,
      }));
      socket.emit('chat-history', formattedMessages);
    } catch (error) {
      console.error('❌ Failed to load chat history:', error);
    }

    io.to(room).emit('onlineUsers', Array.from(onlineUsers.get(room)));
    socket.to(room).emit('message', {
      username: 'System',
      text: `${username} joined the chat`,
      createdAt: new Date(),
    });
  });

  socket.on('chatMessage', async ({ username, text }) => {
    if (!text || !username || !socket.room) return;
    try {
      const message = new Message({
        senderName: username,
        content: text,
        room: socket.room,
      });
      const saved = await message.save();
      io.to(socket.room).emit('message', {
        username: saved.senderName,
        text: saved.content,
        createdAt: saved.createdAt,
      });
    } catch (error) {
      console.error('❌ Error saving message:', error);
    }
  });

  socket.on('typing', ({ username, room }) => {
    if (username && room) {
      socket.to(room).emit('typing', username);
    }
  });

  socket.on('stopTyping', ({ username, room }) => {
    if (username && room) {
      socket.to(room).emit('stopTyping', username);
    }
  });

  socket.on('disconnect', () => {
    const { room, username } = socket;
    if (room && username && onlineUsers.has(room)) {
      onlineUsers.get(room).delete(username);
      io.to(room).emit('onlineUsers', Array.from(onlineUsers.get(room)));
      socket.to(room).emit('message', {
        username: 'System',
        text: `${username} left the chat`,
        createdAt: new Date(),
      });
    }
    console.log("❌ Client disconnected:", socket.id);
  });
};
