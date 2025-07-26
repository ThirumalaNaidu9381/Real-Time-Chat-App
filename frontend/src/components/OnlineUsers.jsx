import React from 'react';

const OnlineUsers = ({ users = [] }) => {
  return (
    <div
      style={{
        background: '#f1f1f1',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '16px',
        fontSize: '14px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <strong>Online Users ({users.length}):</strong>
      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {users.length > 0 ? (
          users.map((user, index) => (
            <span key={index} style={{ whiteSpace: 'nowrap' }}>
              🟢 {user}
            </span>
          ))
        ) : (
          <span>No users online</span>
        )}
      </div>
    </div>
  );
};

export default OnlineUsers;
