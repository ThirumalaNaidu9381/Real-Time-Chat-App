import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

const socket = io(URL, {
  withCredentials: true,
});

export default socket;
