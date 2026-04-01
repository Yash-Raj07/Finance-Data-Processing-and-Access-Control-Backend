const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

// Analyst and Admin can view summary data
router.get('/summary', auth, rbac(['analyst', 'admin']), dashboardController.getSummary);

module.exports = router;
