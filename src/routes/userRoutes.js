const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

// Public route
router.post('/login', userController.login);

// Apply auth + RBAC for all admin routes
router.use(auth, rbac(['admin']));

// Admin routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.patch('/:id/status', userController.updateUserStatus);

module.exports = router;
