var express = require('express');
var router = express.Router();
var {createUser,getAllUser,getUnlocation} = require('../controllers/UserController')

router.post('/request-information', createUser)
router.get('/request-information', getAllUser)
router.get('/request-unlocation-status', getUnlocation)

module.exports = router;