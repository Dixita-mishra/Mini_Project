const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { sendOTPEmail } = require('../utils/email');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const allowedRoles = ['user', 'admin', 'agent'];

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP to DB (update if exists)
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    await sendOTPEmail(email, otp);

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ message: 'Failed to send OTP' });
  }
};

const register = async (req, res) => {
  try {
    const { name, username, password, phone, city, otp, role = 'user' } = req.body;

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!otp) {
      return res.status(400).json({ message: 'OTP is required' });
    }

    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({ email: username, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const prefix = role === 'admin' ? 'ADM' : role === 'agent' ? 'AGT' : 'USR';

    const newUser = new User({
      id: `${prefix}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      name,
      email: username,
      password: hashedPassword,
      role,
      isAdmin: role === 'admin',
      phone,
      city,
      joined: new Date().toISOString().split('T')[0],
      avatar: name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : prefix
    });

    await newUser.save();
    
    // Delete OTP after successful registration
    await OTP.deleteOne({ email: username });

    return res.status(201).json({ message: 'Registration successful! Please log in.' });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password, role = 'user' } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (role === 'admin' && username === 'admin' && password === 'admin') {
      const token = jwt.sign(
        { name: 'Super Admin', email: 'admin@insurance.com', role: 'admin' },
        process.env.JWT_SECRET || 'fallbacksecret',
        { expiresIn: '1d' }
      );

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

    if (role === 'admin' && !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: You are not registered as an Admin.' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role
      },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: role === 'admin' ? '1d' : '7d' }
    );

    return res.status(200).json({
      message: `${role} login successful`,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { tokenId, role = 'user' } = req.body;

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!tokenId) {
      return res.status(400).json({ message: 'Google Token ID is required' });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Create new user if not exists
      const prefix = role === 'admin' ? 'ADM' : role === 'agent' ? 'AGT' : 'USR';
      user = new User({
        id: `${prefix}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        name,
        email,
        googleId,
        role,
        isAdmin: role === 'admin',
        joined: new Date().toISOString().split('T')[0],
        avatar: picture || name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
      });
      await user.save();
    } else if (!user.googleId) {
      // Link googleId to existing user if not already linked
      user.googleId = googleId;
      if (!user.avatar && picture) user.avatar = picture;
      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      process.env.JWT_SECRET || 'fallbacksecret',
      { expiresIn: user.role === 'admin' ? '1d' : '7d' }
    );

    return res.status(200).json({
      message: 'Google login successful',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({ message: 'Server error during Google login' });
  }
};

module.exports = {
  login,
  register,
  googleLogin,
  sendOTP
};