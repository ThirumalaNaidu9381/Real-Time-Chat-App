import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    room: {
      type: String, // Could be ObjectId if referencing a Room collection
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
