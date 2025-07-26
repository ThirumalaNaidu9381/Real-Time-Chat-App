import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../services/socket';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    socket.disconnect(); // disconnect on logout
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (user && !socket.connected) {
      socket.connect();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
