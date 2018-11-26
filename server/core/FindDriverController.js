const Sequelize = require('sequelize')
const _ = require('lodash')
const { Request, Driver, Process } = require('../models')
const AppConstants = require('../app.constant')
const GlobalFunc = require('./GlobalFunc')

const Op = Sequelize.Op;

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

function checkRequestSent(id) {
  return Process.count({
    where: {
      RequestId: id,
      status: AppConstants.PROCESS.SENT
    }
  })
}

function checkDriverOK(driverId, requestId) {
  return Process.count({
    where: {
      DriverId: driverId,
      [Op.or]: [{
        status: AppConstants.PROCESS.SENT
      }, {
        RequestId: requestId,
        status: AppConstants.PROCESS.REJECTED
      }],
    }
  })
}

module.exports = (app) => {
  const onlineDrivers = app.locals.onlineDrivers
  setInterval(async () => {
    const locatedRequests = await getLocatedRequests()
    for (const request of locatedRequests) {
      const shortestDriver = {
        distance: Infinity,
        request,
        driverId: null
      }

      if (request.retries > AppConstants.RETRIES) continue

      const isSent = await checkRequestSent(request.id)
      if (isSent) {
        // console.log('SENT REQUEST', isSent)
        continue
      }
      // console.log('AFTER RETURN REQUEST')

      for (const id of onlineDrivers.keys()) {
        const isReject = await checkDriverOK(id, request.id)
        if (isReject) {
          // console.log('SENT DRIVER', isReject)
          continue
        }
        // console.log('AFTER RETURN DRIVER')

        const driver = await getDriverById(id)

        if (driver.ready) {
          const driverCoordinate = GlobalFunc.string2Coordinate(driver.coordinate)
          const requestCoordinate = GlobalFunc.string2Coordinate(request.locatedCoordinate)

          const distance = GlobalFunc.haversine(driverCoordinate, requestCoordinate)
          if (distance < shortestDriver.distance) {
            shortestDriver.distance = distance
            shortestDriver.driverId = id
          }
        }
      }
      
      // console.log(shortestDriver)
      if (shortestDriver.distance !== Infinity) {
        await Process.create({
          RequestId: shortestDriver.request.id,
          DriverId: shortestDriver.driverId
        })

        onlineDrivers.get(shortestDriver.driverId).emit('SEND-REQUEST', shortestDriver.request)
      } else {
        const retries = request.retries + 1
        request.update({
          retries
        })
      }
    }
  }, 10000)
}
