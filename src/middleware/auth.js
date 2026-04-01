const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const JWT_SECRET = 'your_super_secret_key'; // Consistent with controller

/**
 * Middleware to authenticate using JWT.
 * Extracts token from Authorization header (Bearer <token>).
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please provide a Bearer token.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = userService.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found. Invalid token.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Your account is currently inactive.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
