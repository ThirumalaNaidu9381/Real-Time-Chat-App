import React, { useEffect, useState, useRef } from 'react';
import socket from '../services/socket'; // adjust path if needed

const MessageList = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Load chat history
    socket.on('chatHistory', (msgs) => {
      setMessages(msgs);
    });

    // Listen for new incoming messages
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chatHistory');
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            textAlign: msg.username === currentUser ? 'right' : 'left',
            marginBottom: '8px',
          }}
        >
          <strong>{msg.username}</strong>: {msg.text}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
