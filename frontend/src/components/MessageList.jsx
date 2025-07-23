import React, { useEffect, useState } from 'react';
import socket from '../socket';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('message');
  }, []);

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
      ))}
    </div>
  );
}

export default MessageList;
