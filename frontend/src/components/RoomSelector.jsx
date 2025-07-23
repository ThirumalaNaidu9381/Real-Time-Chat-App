// src/components/RoomSelector.jsx
import React, { useEffect, useState } from 'react';

const RoomSelector = ({ currentRoom, setCurrentRoom }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/rooms`)
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error('Failed to fetch rooms', err));
  }, []);

  return (
    <div className="room-selector">
      <h3>Available Rooms</h3>
      <ul>
        {rooms.map((room) => (
          <li
            key={room._id}
            onClick={() => setCurrentRoom(room.name)}
            style={{
              cursor: 'pointer',
              fontWeight: room.name === currentRoom ? 'bold' : 'normal',
            }}
          >
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomSelector;
