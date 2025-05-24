import { verifyToken } from '../utils/token.js';
import User from '../models/user.js';
import createHttpError from 'http-errors';

export const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createHttpError(401, 'Authorization header not found');
    }

    // Check if token is in Bearer format
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw createHttpError(401, 'Invalid authorization header format');
    }

    // Verify token and get userId
    const { userId } = verifyToken(token);

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      next(createHttpError(401, 'Access token expired'));
    } else {
      next(error);
    }
  }
}; 