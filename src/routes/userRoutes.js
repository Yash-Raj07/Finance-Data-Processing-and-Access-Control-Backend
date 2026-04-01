const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

// Public route: login
router.post('/login', userController.login);

// Admin-only routes
router.post('/', auth, rbac(['admin']), userController.createUser);
router.get('/', auth, rbac(['admin']), userController.getUsers);

// Admin can update user status
router.patch('/:id/status', auth, rbac(['admin']), userController.updateUserStatus);

module.exports = router;
