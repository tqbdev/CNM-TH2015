const express = require('express');
const router = express.Router();

const { driverLogin, driverToken } = require('../controllers/AuthenticationController')
const DriverController = require('../controllers/DriverController')
const isAuthenticatedDriver = require('../policies/isAuthenticatedDriver')

// Login
router.post('/login', driverLogin)
router.post('/token', driverToken)

router.get('/:driverId', isAuthenticatedDriver, DriverController.getById)
router.post('/:driverId', isAuthenticatedDriver, DriverController.updateById)
router.post('/request/:requestId', isAuthenticatedDriver, DriverController.requestUpdate)

module.exports = router;
