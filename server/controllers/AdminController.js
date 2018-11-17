const { Admin } = require('../models')
const config = require('../config/config')
const AppConstant = require('../app.constant')

module.exports = function createAdmin (req, res) {
    Admin.create(req.body).then(admin=>{
             res.send({
                 information : admin
             })
         }).catch (err => {
         res.status(500).send({
           error: 'An error has occured trying to create admin'
         })
     })
 }