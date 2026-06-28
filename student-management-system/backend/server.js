import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import route modules
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// Load environment variables from .env file into process.env
dotenv.config();

// Connect to MongoDB Atlas Database
connectDB();

// Initialize Express application instance
const app = express();

// Middleware: Global CORS handler for all origins, credentials, and preflight OPTIONS requests
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Allow request origin if present, or fallback to localhost:3000
  res.header('Access-Control-Allow-Origin', origin || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Immediately respond 200 OK to browser preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware: Parse incoming requests with JSON payloads (replacing body-parser)
app.use(express.json());

// Root test endpoint to check API health status
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// Mount specialized route handlers under dedicated API URL prefixes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Custom Global Error Handling Middleware for uncaught errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Define server PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start HTTP server listening on specified port
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
