import Message from './models/Message.js';

const socketSetup = (io) => {
  const onlineUsers = new Map(); // Map<room, Set<username>>

  io.on('connection', (socket) => {
    console.log("⚡ Client connected:", socket.id);

    // ========== JOIN ROOM ==========
    socket.on('joinRoom', async ({ username, room }) => {
      if (!username || !room) return;

      socket.join(room);
      socket.username = username;
      socket.room = room;

      // Add user to online list
      if (!onlineUsers.has(room)) {
        onlineUsers.set(room, new Set());
      }
      onlineUsers.get(room).add(username);

      // Send chat history
      try {
        const messages = await Message.find({ room }).sort({ createdAt: 1 });
        const formatted = messages.map(msg => ({
          username: msg.senderName,
          text: msg.content,
          createdAt: msg.createdAt,
        }));
        socket.emit('chatHistory', formatted);
      } catch (err) {
        console.error("❌ Failed to load chat history:", err);
      }

      // Notify everyone about online users
      io.to(room).emit('onlineUsers', Array.from(onlineUsers.get(room)));

      // System message
      socket.to(room).emit('message', {
        username: 'System',
        text: `${username} joined the chat`,
        createdAt: new Date(),
      });
    });

    // ========== LEAVE ROOM ==========
    socket.on('leaveRoom', ({ username, room }) => {
      if (!room || !username || !onlineUsers.has(room)) return;

      socket.leave(room);
      onlineUsers.get(room).delete(username);

      // Notify room of updated users
      io.to(room).emit('onlineUsers', Array.from(onlineUsers.get(room)));

      // System message
      io.to(room).emit('message', {
        username: 'System',
        text: `${username} left the chat`,
        createdAt: new Date(),
      });
    });

    // ========== MESSAGE ==========
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
      } catch (err) {
        console.error("❌ Error saving message:", err);
      }
    });

    // ========== TYPING ==========
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

    // ========== DISCONNECT ==========
    socket.on('disconnect', () => {
      const { username, room } = socket;
      if (!username || !room) return;

      if (onlineUsers.has(room)) {
        onlineUsers.get(room).delete(username);
        io.to(room).emit('onlineUsers', Array.from(onlineUsers.get(room)));

        socket.to(room).emit('message', {
          username: 'System',
          text: `${username} disconnected`,
          createdAt: new Date(),
        });
      }

      console.log("❌ Client disconnected:", socket.id);
    });
  });
};

export default socketSetup;
