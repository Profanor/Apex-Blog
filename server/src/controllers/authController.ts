import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import User from '../models/Users';


// register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const profilePhoto = req.file;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // check if username is unique
    const existingUser = await User.findOne({ username });

    if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await hashPassword(password);

    let profilePhotoBase64 = '';
    if (profilePhoto) {
      profilePhotoBase64 = `data:${profilePhoto.mimetype};base64,${profilePhoto.buffer.toString('base64')}`;
    }

    const newUser = new User({ 
      username, 
      password: hashedPassword, 
      profilePhoto: profilePhotoBase64
    });

    await newUser.save();

    // generate token immediately after signup
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      token, 
      user: {
        id: newUser._id,
        username: newUser.username,
        profilePhoto: newUser.profilePhoto
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
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
      return res.status(400).json({ message: 'User not found. Please sign up first.' });
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

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        profilePhoto: user.profilePhoto 
      } 
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const userProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username, profilePhoto: user.profilePhoto });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};