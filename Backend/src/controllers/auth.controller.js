const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { name, username, password, phone, city, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      id: 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      name,
      email: username,
      password: hashedPassword,
      isAdmin: role === 'admin',
      phone,
      city,
      joined: new Date().toISOString().split('T')[0]
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully. Please log in.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Preserve hardcoded admin bypass for testing/setup
    if (role === 'admin' && username === 'admin' && password === 'admin') {
      const token = jwt.sign({ name: 'Super Admin', email: 'admin@insurance.com', role: 'admin' }, process.env.JWT_SECRET || 'fallbacksecret', { expiresIn: '1d' });
      return res.status(200).json({ message: 'Admin login successful', token });
    }

    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(400).json({ message: 'User not found. Please register.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (role === 'admin') {
      if (!user.isAdmin) {
        return res.status(403).json({ message: 'Access denied: You are not registered as an Admin.' });
      }
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: 'admin' }, process.env.JWT_SECRET || 'fallbacksecret', { expiresIn: '1d' });
      return res.status(200).json({ message: 'Admin login successful', token });
    } else if (role === 'user') {
      const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: 'user' }, process.env.JWT_SECRET || 'fallbacksecret', { expiresIn: '7d' });
      return res.status(200).json({ message: 'User login successful', token });
    }

    return res.status(400).json({ message: 'Invalid role' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  login,
  register
};
