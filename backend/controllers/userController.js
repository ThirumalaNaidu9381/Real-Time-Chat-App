// controllers/userController.js
import User from '../models/User.js';

// 👤 Register a user (guest mode, no password)
export const registerUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({ username });
    const savedUser = await user.save();

    res.status(201).json({
      message: 'User created successfully',
      _id: savedUser._id,
      username: savedUser.username,
    });
  } catch (err) {
    console.error('❌ Error creating user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📄 Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v'); // exclude __v
    res.status(200).json(users.map(u => ({
      _id: u._id,
      username: u.username,
    })));
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
