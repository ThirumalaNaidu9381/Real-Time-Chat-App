import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
