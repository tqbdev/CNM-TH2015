const express = require('express');
const router = express.Router();

const { adminLogin, adminToken } = require('../controllers/AuthenticationController')
const { receiveRequest } = require('../controllers/RequestReceiverController')
const isAuthencatedAdmin = require('../policies/isAuthenticatedAdmin')

// Login
router.post('/login', adminLogin)
router.post('/token', adminToken)

// Request receiver
router.post('/requests', isAuthencatedAdmin, receiveRequest)

module.exports = router;
