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
router.get('/requests/:requestId', isAuthencatedAdmin, RequestController.getById)
router.post('/requests/:requestId', isAuthencatedAdmin, RequestController.updateById)

module.exports = router;
