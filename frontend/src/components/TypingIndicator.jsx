import React from 'react';

const TypingIndicator = ({ typingUsers = [], currentUser }) => {
  const othersTyping = typingUsers.filter((user) => user !== currentUser);

  if (othersTyping.length === 0) return null;

  const names = othersTyping.join(', ');
  const verb = othersTyping.length > 1 ? 'are' : 'is';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        fontStyle: 'italic',
        marginTop: '8px',
        color: '#333',
        backgroundColor: '#eaeaea',
        padding: '6px 12px',
        borderRadius: '8px',
        alignSelf: 'flex-start',
        fontSize: '14px',
      }}
    >
      💬 {names} {verb} typing...
    </div>
  );
};

export default TypingIndicator;
