const express = require('express');
const router = express.Router();

const { driverLogin, driverToken, driverRegister } = require('../controllers/AuthenticationController')
const { createDriver, getAllDriver, updateStatus } = require('../controllers/DriverController')
// Login
router.post('/login', driverLogin)
router.post('/token', driverToken)

router.post('/driver-information', createDriver)
router.get('/driver-information', getAllDriver)
router.put('/driver-status',updateStatus)

module.exports = router;
