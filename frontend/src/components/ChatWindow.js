import React from 'react';

const ChatWindow = ({ messages, username }) => (
  <div className="chat-window">
    {messages.map((msg, i) => (
      <div key={i} className={`chat-bubble ${msg.username === username ? 'self' : 'other'}`}>
        <strong>{msg.username}</strong>
        <p>{msg.content}</p>
      </div>
    ))}
  </div>
);

export default ChatWindow;
