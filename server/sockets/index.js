const adminSocket = require('./adminSocket')
const driverSocket = require('./driverSocket')

module.exports = (io) => {
  // TODO: add middleware
  adminSocket(io)
  driverSocket(io)
}
