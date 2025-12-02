 // Controllers/UserControllers.js
import bcrypt from 'bcrypt';
import userModel from '../Model/UserModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// create jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_dev_key', { expiresIn: '30d' });
};

// Register a user
export const UserRegister = async (req, res) => {
  try {
    // defensive: if req.body is undefined
    if (!req || !req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // normalize email
    const emailNorm = email.toLowerCase().trim();

    // check the user exists
    const userExists = await userModel.findOne({ email: emailNorm });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // create hashed password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user (use create() directly)
    const user = await userModel.create({
      name: name.trim(),
      email: emailNorm,
      password: hashPassword,
    });

    const token = generateToken(user._id);

    // return basic user info + token
    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('UserRegister error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a user
export const UserLogin = async (req, res) => {
  try {
    if (!req || !req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const emailNorm = email.toLowerCase().trim();

    // check the user email
    const user = await userModel.findOne({ email: emailNorm });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // match the password (bcrypt.compare)
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    return res.status(200).json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('UserLogin error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

 export const UserProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "User profile fetched",
      user: req.user, // coming from protect middleware
    });
  } catch (error) {
    console.error("UserProfile error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
