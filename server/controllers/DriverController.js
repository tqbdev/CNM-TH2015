const _ = require('lodash')

const { Driver } = require('../models')
const config = require('../config/config')
const AppConstant = require('../app.constant')

module.exports = {
    async createDriver (req, res) {
         Driver.create(req.body).then(driver=>{
             res.send({
                 information : driver
             })
         }).catch (err => {
         res.status(500).send({
           error: 'An error has occured trying to login'
         })
     })
 }, async getAllDriver (req, res) {
           Driver.findAll().then(drivers=>{
               res.send({
                   list:drivers
               })
           })
       },
       async updateStatus (req, res) {
        Driver.update({ready:req.body.ready},{
            where: {id:req.body.id}
        }).then(driver=>{
            res.send({
                status: "success!"
            })
        })
    }
   }