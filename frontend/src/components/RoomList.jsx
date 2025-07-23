// src/components/RoomList.jsx
import React, { useEffect, useState } from 'react';

const RoomList = ({ currentRoom, onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/rooms`);
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch rooms', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h3>Available Rooms</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rooms.map((room) => (
          <li
            key={room._id}
            style={{
              cursor: 'pointer',
              fontWeight: room.name === currentRoom ? 'bold' : 'normal',
              marginBottom: '0.5rem'
            }}
            onClick={() => onSelectRoom(room.name)}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
