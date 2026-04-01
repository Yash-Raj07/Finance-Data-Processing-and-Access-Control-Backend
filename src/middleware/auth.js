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

const authenticate = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = userService.getUserById(decodedToken.id);

    // Validate user existence
    if (!user) {
      return res.status(401).json({
        error: "Authentication failed: user does not exist"
      });
    }

    // Check account status
    if (!user.isActive) {
      return res.status(403).json({
        error: "Access denied: account is inactive"
      });
    }

    // Attach minimal user context
    req.user = {
      id: user.id,
      role: user.role
    };

    return next();

  } catch (err) {
    // Handle token-specific errors separately (optional but cleaner)
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired. Please login again"
      });
    }

    return res.status(401).json({
      error: "Authentication failed: invalid token"
    });
  }
};

module.exports = authMiddleware;
