import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* If user is logged in, redirect to /home; else show login */}
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <LoginPage />} />
      
      {/* If already logged in, redirect away from register */}
      <Route path="/register" element={user ? <Navigate to="/home" replace /> : <RegisterPage />} />

      {/* Protected route: Only accessible if user is logged in */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/" replace />} />

      {/* Catch-all: Redirect unknown paths */}
      <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
    </Routes>
  );
};

export default App;
