const express = require('express');
const router = express.Router();

const { driverLogin, driverToken } = require('../controllers/AuthenticationController')
const { createDriver, getAllDriver } = require('../controllers/DriverController')
// Login
router.post('/login', driverLogin)
router.post('/token', driverToken)

router.post('/driver-information', createDriver)
router.get('/driver-information', getAllDriver)

module.exports = router;
