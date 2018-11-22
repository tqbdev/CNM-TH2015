const express = require('express');
const router = express.Router();

const { adminLogin, adminToken } = require('../controllers/AuthenticationController')
const RequestController = require('../controllers/RequestController')
const isAuthenticatedAdmin = require('../policies/isAuthenticatedAdmin')

// Login
router.post('/login', adminLogin)
router.post('/token', adminToken)

// Request receiver
router.post('/requests', isAuthenticatedAdmin, RequestController.receiveRequest)
router.get('/requests/:requestId', isAuthenticatedAdmin, RequestController.getById)
router.post('/requests/:requestId', isAuthenticatedAdmin, RequestController.updateById)

module.exports = router;
