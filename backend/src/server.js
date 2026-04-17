require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Routes
const skillsRouter = require('./routes/skills');
const resourcesRouter = require('./routes/resources');
const resourceTypesRouter = require('./routes/resourceTypes');
const searchRouter = require('./routes/search');
const adminRouter = require('./routes/admin');

// Connect to MongoDB
connectDB();

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Admin login stricter limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts.' },
});
app.use('/api/admin/login', loginLimiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging (dev only)
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// API Routes
app.use('/api/skills', skillsRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/resource-types', resourceTypesRouter);
app.use('/api/search', searchRouter);
app.use('/api/admin', adminRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'EduHub API is running 🚀' }));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 EduHub API running at http://localhost:${PORT}`);
});
