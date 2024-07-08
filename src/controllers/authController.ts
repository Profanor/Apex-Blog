import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Users';
import { hashPassword, comparePassword } from '../utils/password';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if username is unique
    const existingUser = await User.findOne({ username });

    if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Ensure user.password is a string
    if (typeof user.password !== 'string') {
        return res.status(500).json({ message: 'Invalid Credentials' });
      }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
