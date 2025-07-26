import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Register user
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        username,
        password,
      });

      // Auto-login user after registration
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        username,
        password,
      });

      login({
        _id: res.data.userId,
        username: res.data.username,
      });

      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
