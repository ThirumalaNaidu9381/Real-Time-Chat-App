// controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    // ✅ Return full user data on registration for frontend usage
    res.status(201).json({
      message: 'User registered successfully',
      _id: savedUser._id,
      username: savedUser.username
    });
  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      _id: user._id,
      username: user.username
    });
  } catch (err) {
    console.error('Error in loginUser:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
