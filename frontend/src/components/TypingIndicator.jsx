import React from 'react';

const TypingIndicator = ({ typingUsers, currentUser }) => {
  const othersTyping = typingUsers.filter((user) => user !== currentUser);

  if (othersTyping.length === 0) return null;

  const names = othersTyping.join(', ');
  const verb = othersTyping.length > 1 ? 'are' : 'is';

  return (
    <div
      style={{
        fontStyle: 'italic',
        marginTop: '8px',
        color: '#555',
        backgroundColor: '#f0f0f0',
        padding: '6px 10px',
        borderRadius: '6px',
        width: 'fit-content',
        maxWidth: '90%',
      }}
    >
      💬 {names} {verb} typing...
    </div>
  );
};

export default TypingIndicator;
