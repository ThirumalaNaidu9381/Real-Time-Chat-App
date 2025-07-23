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
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <h3>Chat App</h3>
      {user && (
        <div style={{ float: 'right' }}>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
