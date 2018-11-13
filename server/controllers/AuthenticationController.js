const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')
const _ = require('lodash')

const { Driver, Admin } = require('../models')
const config = require('../config/config')
const AppConstant = require('../app.constant')

function jwtSignUser (user, role) {
  return jwt.sign({
    user,
    role
  }, config.authencation.jwtSecret, {
    expiresIn: config.authencation.jwtExpiresIn
  })
}

module.exports = {
  async driverRegister (req, res) {
    try {
      const refreshToken = randtoken.uid(256)
      const user = await Driver.create(req.body)

      const userJson = user.toJSON()
      delete userJson['refreshToken']
      await user.update({refreshToken})

      res.send({
        user: userJson,
        token: jwtSignUser(userJson, AppConstant.ROLE.DRIVER),
        refreshToken
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },

  async driverLogin (req, res) {
    try {
      const { telephone, password } = req.body
      const user = await Driver.findOne({
        where: {
          telephone
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const refreshToken = randtoken.uid(256)
      const userJson = user.toJSON()
      delete userJson['refreshToken']
      await user.update({refreshToken})

      res.send({
        user: userJson,
        token: jwtSignUser(userJson, AppConstant.ROLE.DRIVER),
        refreshToken
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  },

  async driverToken (req, res) {
    try {
      const { telephone, refreshToken } = req.body
      const user = await Driver.findOne({
        where: {
          telephone,
          refreshToken
        }
      })

      if (!user) {
        return res.status(401).send({
          error: 'The information was incorrect'
        })
      }

      // const refreshToken = randtoken.uid(256)
      const userJson = user.toJSON()
      delete userJson['refreshToken']
      // await user.update({refreshToken})

      res.send({
        user: userJson,
        token: jwtSignUser(userJson, AppConstant.ROLE.DRIVER),
        // refreshToken
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  },

  async driverRevokeToken (req, res) {
    try {
      const { telephone, refreshToken } = req.body
      const user = await Driver.findOne({
        where: {
          telephone,
          refreshToken
        }
      })

      if (!user) {
        return res.status(401).send({
          error: 'The information was incorrect'
        })
      }

      await user.update({refreshToken: null})

      res.send({
        msg: 'Revoke token successfully'
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to revoke token'
      })
    }
  },

  async adminLogin (req, res) {
    try {
      const {username, password} = req.body
      const user = await Admin.findOne({
        where: {
          username
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const refreshToken = randtoken.uid(256)
      const userJson = user.toJSON()
      delete userJson['refreshToken']
      await user.update({refreshToken})

      res.send({
        user: userJson,
        token: jwtSignUser(userJson, AppConstant.ROLE.ADMIN),
        refreshToken: refreshToken
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  },

  async adminToken (req, res) {
    try {
      const { username, refreshToken } = req.body
      const user = await Admin.findOne({
        where: {
          username,
          refreshToken
        }
      })

      if (!user) {
        return res.status(401).send({
          error: 'The information was incorrect'
        })
      }

      // const refreshToken = randtoken.uid(256)
      const userJson = user.toJSON()
      delete userJson['refreshToken']
      // await user.update({refreshToken})

      res.send({
        user: userJson,
        token: jwtSignUser(userJson, AppConstant.ROLE.ADMIN),
        // refreshToken
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  },

  async adminRevokeToken (req, res) {
    try {
      const { username, refreshToken } = req.body
      const user = await Admin.findOne({
        where: {
          username,
          refreshToken
        }
      })

      if (!user) {
        return res.status(401).send({
          error: 'The information was incorrect'
        })
      }

      await user.update({refreshToken: null})

      res.send({
        msg: 'Revoke token successfully'
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to revoke token'
      })
    }
  },
}
