const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

// All authenticated users can read records
router.get('/', auth, rbac(['viewer', 'analyst', 'admin']), recordController.getRecords);

// Only analyst and admin can create records
router.post('/', auth, rbac(['analyst', 'admin']), recordController.createRecord);

// Only admin can update records
router.put('/:id', auth, rbac(['admin']), recordController.updateRecord);

// Only admin can delete records
router.delete('/:id', auth, rbac(['admin']), recordController.deleteRecord);

module.exports = router;
