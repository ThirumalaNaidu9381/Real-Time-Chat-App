// src/components/Navbar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #ccc',
      }}
    >
      <h3 style={{ margin: 0 }}>Chat App</h3>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontWeight: '500' }}>Welcome, {user.username}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #aaa',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
