// seedRooms.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chatApp';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    try {
      const existing = await Room.find();
      if (existing.length === 0) {
        await Room.insertMany([
          { name: 'General' },
          { name: 'Tech' },
          { name: 'Random' },
        ]);
        console.log('✅ Rooms seeded successfully');
      } else {
        console.log('⚠️ Rooms already exist. Skipping seed.');
      }
    } catch (err) {
      console.error('❌ Error seeding rooms:', err);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
