import React, { useEffect, useState } from 'react';

const RoomList = ({ currentRoom, onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
        const res = await fetch(`${baseURL}/api/rooms`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error('Invalid rooms response', data);
        }
      } catch (error) {
        console.error('❌ Failed to fetch rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <aside style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Available Rooms</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rooms.map((room) => (
          <li
            key={room._id}
            onClick={() => onSelectRoom(room.name)}
            aria-selected={room.name === currentRoom}
            style={{
              cursor: 'pointer',
              padding: '6px 0',
              fontWeight: room.name === currentRoom ? 'bold' : 'normal',
              color: room.name === currentRoom ? '#4CAF50' : '#333',
            }}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RoomList;
