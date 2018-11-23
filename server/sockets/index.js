const adminSocket = require('./adminSocket')
const driverSocket = require('./driverSocket')

module.exports = (io, app) => {
  // TODO: add middleware
  adminSocket(io, app)
  driverSocket(io, app)
}
