const {
  sequelize,
  Admin,
  Driver
} = require('../models')

const Promise = require('bluebird')
const admins = require('./admins.json')
const drivers = require('./drivers.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      admins.map(admin => {
        Admin.create(admin)
      })
    )

    await Promise.all(
      drivers.map(driver => {
        Driver.create(driver)
      })
    )
  })
