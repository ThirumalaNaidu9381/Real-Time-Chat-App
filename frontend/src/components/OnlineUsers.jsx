import React from 'react';

const OnlineUsers = ({ users }) => {
  return (
    <div
      style={{
        background: '#f1f1f1',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',
        fontSize: '14px',
      }}
    >
      <strong>Online Users ({users.length}):</strong>
      <div style={{ marginTop: '6px' }}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <span key={index} style={{ marginRight: '8px' }}>
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
