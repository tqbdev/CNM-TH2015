const express = require('express');
const router = express.Router();

const { adminLogin, adminToken } = require('../controllers/AuthenticationController')
const RequestController = require('../controllers/RequestController')
const isAuthencatedAdmin = require('../policies/isAuthenticatedAdmin')

// Login
router.post('/login', adminLogin)
router.post('/token', adminToken)

// Request receiver
router.post('/requests', isAuthencatedAdmin, RequestController.receiveRequest)
router.get('/requests/:userId', isAuthencatedAdmin, RequestController.getById)

module.exports = router;
