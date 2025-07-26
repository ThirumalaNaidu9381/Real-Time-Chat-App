import React from 'react';

const MessageItem = ({ message, currentUser }) => {
  const sender = message.username || message.senderName;
  const content = message.text || message.content;
  const isOwnMessage = sender === currentUser;

  const containerStyle = {
    display: 'flex',
    justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
    padding: '4px 10px',
  };

  const bubbleStyle = {
    backgroundColor: isOwnMessage ? '#DCF8C6' : '#F1F0F0',
    padding: '10px 14px',
    borderRadius: '10px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  };

  const senderStyle = {
    fontWeight: 'bold',
    marginBottom: '4px',
    fontSize: '14px',
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        {!isOwnMessage && <div style={senderStyle}>{sender}</div>}
        <div>{content}</div>
      </div>
    </div>
  );
};

export default MessageItem;
