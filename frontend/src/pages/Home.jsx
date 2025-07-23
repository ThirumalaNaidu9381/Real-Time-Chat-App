import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatRoom from '../components/ChatRoom';

const socket = io(import.meta.env.VITE_SERVER_URL); // Uses env URL

const Home = () => {
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // redirect if not authenticated
    }
  }, [user, navigate]);

  const handleJoin = () => {
    if (room.trim()) {
      socket.emit('joinRoom', { username: user.username, room });
      setIsJoined(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="top-bar">
        <span>Welcome, {user?.username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {!isJoined ? (
        <div>
          <h2>Enter Room Name</h2>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <ChatRoom socket={socket} username={user.username} room={room} />
      )}
    </div>
  );
};

export default Home;
