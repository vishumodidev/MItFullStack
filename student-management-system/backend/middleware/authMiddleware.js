import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * Authentication Middleware to protect routes.
 * Verifies the JSON Web Token (JWT) sent in the request header.
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header string (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token authenticity using secret key stored in environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from database using decoded ID (excluding password hash)
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or controller function
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is provided in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
