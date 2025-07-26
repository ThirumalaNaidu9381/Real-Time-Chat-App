import React, { useEffect, useState } from 'react';

const RoomSelector = ({ currentRoom, setCurrentRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
        const response = await fetch(`${baseURL}/api/rooms`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error('Invalid rooms data', data);
        }
      } catch (err) {
        console.error('❌ Failed to fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="room-selector" style={{ padding: '1rem', borderRight: '1px solid #ccc' }}>
      <h3 style={{ marginBottom: '1rem' }}>Available Rooms</h3>

      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rooms.map((room) => (
            <li
              key={room._id}
              onClick={() => setCurrentRoom(room.name)}
              style={{
                cursor: 'pointer',
                fontWeight: room.name === currentRoom ? 'bold' : 'normal',
                marginBottom: '0.5rem',
                color: room.name === currentRoom ? '#4CAF50' : '#333',
              }}
              aria-selected={room.name === currentRoom}
            >
              {room.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomSelector;
