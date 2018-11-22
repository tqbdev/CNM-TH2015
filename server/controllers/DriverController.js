const { Driver } = require('../models')
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

  async updateLocationById (req, res) {
    try {
      if (!req.body.coordinate) {
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

      await driver.update({
        coordinate: req.body.coordinate
      })

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
  }
}
