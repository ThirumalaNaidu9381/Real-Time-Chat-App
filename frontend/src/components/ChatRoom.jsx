// frontend/components/ChatRoom.jsx
import { useEffect, useState, useRef } from "react";
import socket from "../services/socket";
import { useAuth } from "../context/AuthContext";
import MessageInput from "./MessageInput";
import OnlineUsers from "./OnlineUsers";
import TypingIndicator from "./TypingIndicator";
import MessageItem from "./MessageItem";

const ChatRoom = ({ room }) => {
  const { user } = useAuth();
  const username = user?.username;

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!username || !room) return;

    // Join room
    socket.emit("joinRoom", { username, room });

    // Message handlers
    const handleHistory = (msgs) => setMessages(msgs);
    const handleMessage = (msg) => setMessages((prev) => [...prev, msg]);
    const handleOnlineUsers = (userList) => setUsers(userList);

    // Typing handlers
    const handleTyping = (user) => {
      if (user !== username) {
        setTypingUsers((prev) =>
          prev.includes(user) ? prev : [...prev, user]
        );
      }
    };

    const handleStopTyping = (user) => {
      setTypingUsers((prev) => prev.filter((u) => u !== user));
    };

    // Listen
    socket.on("chat-history", handleHistory);
    socket.on("message", handleMessage);
    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    // Cleanup
    return () => {
      socket.emit("leaveRoom", { username, room });
      socket.off("chat-history", handleHistory);
      socket.off("message", handleMessage);
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [room, username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (text.trim()) {
      socket.emit("chatMessage", { username, text, room });
      socket.emit("stopTyping", { username, room }); // Stop typing when message sent
    }
  };

  const sendTyping = () => {
    socket.emit("typing", { username, room });
  };

  if (!username || !room) {
    return <div>Loading chat...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Room: {room}</h2>
      <OnlineUsers users={users} />
      <div
        style={{
          minHeight: "300px",
          maxHeight: "400px",
          overflowY: "auto",
          background: "#f0f0f0",
          padding: "10px",
          borderRadius: "8px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, i) => (
          <MessageItem key={i} message={msg} currentUser={username} />
        ))}
        <TypingIndicator typingUsers={typingUsers} currentUser={username} />
        <div ref={bottomRef}></div>
      </div>
      <MessageInput onSend={sendMessage} onTyping={sendTyping} />
    </div>
  );
};

export default ChatRoom;
