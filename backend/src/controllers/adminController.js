const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// @desc  Admin login
// @route POST /api/admin/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = signToken(admin._id);
    res.json({
      success: true,
      token,
      data: { id: admin._id, email: admin.email },
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Get current admin profile
// @route GET /api/admin/me
const getMe = async (req, res) => {
  res.json({ success: true, data: req.admin });
};

module.exports = { login, getMe };
