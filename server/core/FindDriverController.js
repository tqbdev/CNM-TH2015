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
      RequestId: requestId,
      status: {
        [Op.or]: [AppConstants.PROCESS.SENT, AppConstants.PROCESS.REJECTED]
      } 
    }
  })
}

module.exports = (app) => {
  const shortestDriver = {
    distance: Infinity,
    request: null,
    driverId: null
  }
  const onlineDrivers = app.locals.onlineDrivers
  app.locals.sentRequest = []
  app.locals.sentDriver = []
  setInterval(async () => {
    const locatedRequests = await getLocatedRequests()
    await Promise.all(locatedRequests.map(async (request) => {
      // Initial shortestDriver
      shortestDriver.distance = Infinity
      shortestDriver.request = null
      shortestDriver.driverId = null

      if (request.retries > AppConstants.RETRIES) return
      // Call db
      const isSentRequest = await checkRequestSent(request.id)
      if (isSentRequest) {
        console.log('SENT REQUEST', isSentRequest)
        return
      }
      // if (_.includes(app.locals.sentRequest, request.id)) {
      //   console.log('SENT REQUEST', app.locals.sentRequest)
      //   return
      // }
      console.log('AFTER RETURN REQUEST')

      await Promise.all(onlineDrivers.keys().map(async (id) => {
        // Call db
        const isNOKDriver = await checkDriverOK(id, request.id)
        if (isNOKDriver) {
          console.log('SENT DRIVER', isNOKDriver)
          return
        }
        // if (_.includes(app.locals.sentDriver, id)) {
        //   console.log('SENT DRIVER', app.locals.sentDriver)          
        //   return
        // }
        console.log('AFTER RETURN DRIVER')

        const driver = await getDriverById(id)

        if (driver.ready) {
          const driverCoordinate = GlobalFunc.string2Coordinate(driver.coordinate)
          const requestCoordinate = GlobalFunc.string2Coordinate(request.locatedCoordinate)

          const distance = GlobalFunc.haversine(driverCoordinate, requestCoordinate)
          if (distance < shortestDriver.distance) {
            shortestDriver.distance = distance
            shortestDriver.request = request
            shortestDriver.driverId = id
          }
        }
      }))
      
      console.log(shortestDriver)
      if (shortestDriver.distance !== Infinity) {
        // if (_.includes(app.locals.sentRequest, shortestDriver.request.id) &&
        //     _.includes(app.locals.sentDriver, shortestDriver.driverId)) {
        //   return
        // }
        // if (await checkRequestSent(shortestDriver.request.id) ||
        //     await checkDriverOK(shortestDriver.driverId, shortestDriver.request.id)) {
        //   return
        // }
        
        
        // Call db create
        // app.locals.sentRequest.push(shortestDriver.request.id)
        // app.locals.sentDriver.push(shortestDriver.driverId)
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
    }))
  }, 10000)
}
