var express = require('express');
var router = express.Router();
var {User} = require('../models');

router.post('/request-infomation', (req, res) => {
   const user = await User.create(req.body);
   const userJson = user.toJSON();
   res.send({
       user: userJson,
   })
})

module.exports = router;