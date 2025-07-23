// seedRooms.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    await Room.create([
      { name: 'General' },
      { name: 'Tech' },
      { name: 'Random' },
    ]);
    console.log('✅ Rooms created');
  } catch (err) {
    console.error('❌ Error seeding rooms:', err);
  } finally {
    mongoose.disconnect();
  }
});
