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
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/home" replace /> : <RegisterPage />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
    </Routes>
  );
};

export default App;
