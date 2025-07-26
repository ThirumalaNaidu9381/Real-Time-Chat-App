// backend/controllers/roomController.js
import Room from '../models/Room.js';

// 📦 Create a new room
export async function createRoom(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Room name is required' });
  }

  try {
    const existingRoom = await Room.findOne({ name });

    if (existingRoom) {
      return res.status(400).json({ message: 'Room already exists' });
    }

    const newRoom = new Room({ name });
    await newRoom.save();

    res.status(201).json({
      message: 'Room created successfully',
      room: {
        _id: newRoom._id,
        name: newRoom.name,
        createdAt: newRoom.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ Failed to create room:', error);
    res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
}

// 📂 Get all rooms
export async function getRooms(req, res) {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    res.status(200).json(
      rooms.map(room => ({
        _id: room._id,
        name: room.name,
        createdAt: room.createdAt,
      }))
    );
  } catch (error) {
    console.error('❌ Failed to fetch rooms:', error);
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
}
