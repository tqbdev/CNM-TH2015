const express = require('express');
const router = express.Router();

const { adminLogin, adminToken } = require('../controllers/AuthenticationController')

// Login
router.post('/login', adminLogin)
router.post('/token', adminToken)

module.exports = router;
