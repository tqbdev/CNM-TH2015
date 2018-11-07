const _ = require('lodash')

const { User } = require('../models')
const config = require('../config/config')
const AppConstant = require('../app.constant')

module.exports = {
   async createUser (req, res) {
        User.create(req.body).then(user=>{
            res.send({
                information : user
            })
        }).catch (err => {
        res.status(500).send({
          error: 'An error has occured trying to login'
        })
    })
},
    async getAllUser (req, res) {
          User.findAll().then(users=>{
              res.send({
                  list:users
              })
          })
      },
      async getUnlocation(req, res) {
        User.findOne({
            where: {
              status: 'UNLOCATION'
            }
          }).then(user =>{
              res.send({
                  information : user
              })
          })
      }
  }
  