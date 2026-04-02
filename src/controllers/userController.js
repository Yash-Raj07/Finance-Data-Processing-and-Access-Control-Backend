const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const JWT_SECRET = 'your_super_secret_key'; 
class UserController {
  login(req, res, next) {
   
    
    
    try {
  const { email, id: userId } = req.body;

  if (!email || !userId) {
    return res.status(400).json({
      error: "Email and credentials are required"
    });
  }

  const user = userService.getUserById(userId);

  const isInvalidUser =
    !user || user.email !== email;

  if (isInvalidUser) {
    return res.status(401).json({
      error: "Invalid email or credentials"
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      error: "User account is inactive"
    });
  }

  const payload = {
    id: user.id,
    role: user.role
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h"
  });

  const response = {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role
    }
  };

  return res.status(200).json(response);

} catch (err) {
  next(err);
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
