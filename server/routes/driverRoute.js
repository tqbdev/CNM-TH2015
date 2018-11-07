const express = require('express');
const router = express.Router();

const { driverLogin, driverToken } = require('../controllers/AuthenticationController')

// Login
router.post('/login', driverLogin)
router.post('/token', driverToken)

module.exports = router;
