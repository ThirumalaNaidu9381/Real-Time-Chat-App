import React from 'react';
import './ChatWindow.css'; // Make sure to import the CSS

const ChatWindow = ({ messages, username }) => (
  <div className="chat-window">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`chat-bubble ${msg.username === username ? 'self' : 'other'}`}
      >
        <div className="sender">{msg.username}</div>
        <div className="content">{msg.content}</div>
        <div className="timestamp">
          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    ))}
  </div>
);

export default ChatWindow;
