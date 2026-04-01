const { v4: uuidv4 } = require('uuid');
const db = require('../store/db');

/**
 * Service to handle User-related operations.
 */
class UserService {
  /**
   * Creates a new user.
   * @param {Object} userData - User details (name, email, role).
   * @returns {Object} The created user.
   */
  createUser(userData) {
    const newUser = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'viewer',
      isActive: true
    };
    db.users.push(newUser);
    return newUser;
  }

  /**
   * Retrieves all users.
   * @returns {Array} List of users.
   */
  getUsers() {
    return db.users;
  }

  /**
   * Updates a user's active status.
   * @param {string} userId - ID of the user.
   * @param {boolean} isActive - New status.
   * @returns {Object|null} Updated user or null if not found.
   */
  updateUserStatus(userId, isActive) {
    const user = db.users.find(u => u.id === userId);
    if (user) {
      user.isActive = isActive;
      return user;
    }
    return null;
  }

  /**
   * Finds a user by ID.
   * @param {string} userId - ID of the user.
   * @returns {Object|null} User or null if not found.
   */
  getUserById(userId) {
    return db.users.find(u => u.id === userId);
  }
}

module.exports = new UserService();
