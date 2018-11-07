var express = require('express');
var router = express.Router();
var {createUser,getAllUser} = require('../controllers/UserController')

router.post('/request-information', createUser)

router.get('/request-information', getAllUser)

module.exports = router;