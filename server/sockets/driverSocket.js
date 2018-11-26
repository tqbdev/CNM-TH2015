const HashMap = require('hashmap')

const { Process } = require('../models')
const AppConstants = require('../app.constant')

module.exports = (io, app) => {
  app.locals.onlineDrivers = new HashMap()
  const driversSocket =  io
    .of('/drivers')
    .on('connection', function (socket) {
      const id = socket.handshake.query.id

      if (app.locals.onlineDrivers.has(id)) {
        socket.disconnect()
        return
      }

      app.locals.onlineDrivers.set(+id, socket)
      console.log('ADD SOCKET - ID DRIVER: ', id)

      socket.on('ACCEPT', data => {
        // console.log('ACCEPT', data)
        const requestId = data.requestId
        Process.findOne({
          where: {
            RequestId: requestId,
            DriverId: id,
            status: AppConstants.PROCESS.SENT
          }
        }).then(process => {
          if (process)
            process.update({
              status: AppConstants.PROCESS.ACCEPTED
            })
        })
      })

      socket.on('REJECT', data => {
        // console.log('REJECT', data)
        const requestId = data.requestId
        Process.findOne({
          where: {
            RequestId: requestId,
            DriverId: id,
            status: AppConstants.PROCESS.SENT
          }
        }).then(process => {
          if (process)
            process.update({
              status: AppConstants.PROCESS.REJECTED
            })
        })
      })

      socket.on('disconnect', function(){
        Process.findOne({
          where: {
            DriverId: id,
            status: AppConstants.PROCESS.SENT
          }
        }).then(process => {
          if (process)
            process.update({
              status: AppConstants.PROCESS.REJECTED
            })
        })
        app.locals.onlineDrivers.delete(+id)
        console.log('REMOVE SOCKET - ID DRIVER: ', id)
      });
    })
}
