import React from 'react';

const MessageItem = ({ message, currentUser }) => {
  const isOwnMessage = message.username === currentUser;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        padding: '4px 10px',
      }}
    >
      <div
        style={{
          backgroundColor: isOwnMessage ? '#DCF8C6' : '#F1F0F0',
          padding: '10px 14px',
          borderRadius: '10px',
          maxWidth: '70%',
          wordWrap: 'break-word',
        }}
      >
        {!isOwnMessage && (
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            {message.username}
          </div>
        )}
        <div>{message.text}</div>
      </div>
    </div>
  );
};

export default MessageItem;
