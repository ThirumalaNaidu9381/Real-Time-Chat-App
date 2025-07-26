import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // email: { type: String, unique: true, sparse: true },
    // role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  {
    timestamps: true, // optional: adds createdAt, updatedAt
  }
);

const User = mongoose.model('User', userSchema);

export default User;
