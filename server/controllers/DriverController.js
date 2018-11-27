const _ = require('lodash')

const { Driver, Request } = require('../models')
const AppConstant = require('../app.constant')

module.exports = {
  async getById (req, res) {
    try {
      const driver = await Driver.findByPk(req.params.driverId)

      if (!driver) {
        return res.status(404).send({
          error: 'Not found driver has id ' + req.params.driverId
        })
      }

      const driverJson = driver.toJSON()
      res.send({
        driver: driverJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in get driver by id.'
      })
    }
  },

  async updateById (req, res) {
    try {
      if (_.isNil(req.body.coordinate) && _.isNil(req.body.ready)) {
        return res.status(405).send({
          error: 'The new location information was incorrect'
        })
      }

      const driver = await Driver.findByPk(req.params.driverId)

      if (!driver) {
        return res.status(404).send({
          error: 'Not found driver has id ' + req.params.driverId
        })
      }

      let updateFields = {}
      if (!_.isNil(req.body.coordinate)) {
        updateFields.coordinate = req.body.coordinate
      }
      if (!_.isNil(req.body.ready)) {
        updateFields.ready = req.body.ready
      }

      await driver.update(updateFields)

      const driverJson = driver.toJSON()
      res.send({
        driver: driverJson
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Error in update location for driver by id.'
      })
    }
  },

  async requestUpdate(req, res) {
    try {
      if (_.isNil(req.body.status)) {
        return res.status(405).send({
          error: 'The new status for request was incorrect'
        })
      }

      const request = await Request.findOne({
        where: {
          id: req.params.requestId,
          DriverId: req.user.id
        }
      })

      if (!request) {
        return res.status(404).send({
          error: 'Not found request has id '
                  + req.params.requestId
                  + ' for driver by id '
                  + req.user.id
        })
      }

      await request.update({
        status: req.body.status
      })

      const requestJson = request.toJSON()
      res.send({
        request: requestJson
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Error in update status for request by id.'
      })
    }
  }
}
