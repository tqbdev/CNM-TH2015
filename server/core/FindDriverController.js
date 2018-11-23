const { Request, Driver } = require('../models')
const AppConstants = require('../app.constant')

function getLocatedRequests () {
  return Request.findAll({
    where: {
      status: AppConstants.REQUEST.LOCATED
    },
    order: [
      ['updatedAt', 'ASC']
    ]
  })
}

function getDriverById (id) {
  return Driver.findByPk(id)
}

module.exports = (app) => {
  const shortestDriver = {
    distance: Infinity,
    requestId: null,
    onlineDriver: null
  }
  const onlineDrivers = app.locals.onlineDrivers
  setInterval(async () => {
    const locatedRequests = await getLocatedRequests()
    // For each request
    onlineDrivers.forEach(async (socket, id) => {
      const driver = await getDriverById(id)
      if (driver.ready) {

      }
    })
    // Update re-tries count
    // If have shortestDriver => send request
    // If reject => update array reject driver
    // End for each
  }, 1000)
}
