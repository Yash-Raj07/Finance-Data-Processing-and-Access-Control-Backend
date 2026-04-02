const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const JWT_SECRET = 'your_super_secret_key'; 
class UserController {
  login(req, res, next) {
   try {
  const { email, id } = req.body;

  // Validate input
  if (!email || !id) {
    return res.status(400).json({
      error: "Email and ID (as password) are required"
    });
  }

  const user = userService.getUserById(id);

  // Validate credentials
  if (!user || user.email !== email) {
    return res.status(401).json({
      error: "Invalid credentials"
    });
  }

  // Check user status
  if (!user.isActive) {
    return res.status(403).json({
      error: "Account is inactive"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  });

} catch (error) {
  next(error);
}
    createUser(req, res, next) {
    try {
      const { name, email, role } = req.body;
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
      }
      const user = userService.createUser({ name, email, role });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  getUsers(req, res, next) {
    try {
      const users = userService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  updateUserStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ error: 'isActive must be a boolean' });
      }
      const updatedUser = userService.updateUserStatus(id, isActive);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
