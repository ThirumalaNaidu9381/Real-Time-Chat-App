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
  const [typingUser, setTypingUser] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!username || !room) return;

    socket.emit("joinRoom", { username, room });

    socket.on("chatHistory", (msgs) => {
      setMessages(msgs);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("onlineUsers", (userList) => {
      setUsers(userList);
    });

    socket.on("typing", (user) => {
      if (user !== username) {
        setTypingUser(user);
        setTimeout(() => setTypingUser(""), 2000);
      }
    });

    return () => {
      socket.off("chatHistory");
      socket.off("message");
      socket.off("onlineUsers");
      socket.off("typing");
      socket.emit("leaveRoom", { username, room });
    };
  }, [room, username]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    if (text.trim()) {
      socket.emit("chatMessage", { username, text, room });
    }
  };

  const sendTyping = () => {
    socket.emit("typing", { username, room });
  };

  // 🛡️ Loading fallback
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
        {typingUser && <TypingIndicator username={typingUser} />}
        <div ref={bottomRef}></div>
      </div>
      <MessageInput onSend={sendMessage} onTyping={sendTyping} />
    </div>
  );
};

export default ChatRoom;
