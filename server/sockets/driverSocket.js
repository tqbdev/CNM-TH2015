const HashMap = require('hashmap')

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
        console.log('ACCEPT', data)
      })

      socket.on('REJECT', data => {
        console.log('REJECT', data)
      })

      socket.on('disconnect', function(){
        app.locals.onlineDrivers.delete(+id)
        console.log('REMOVE SOCKET - ID DRIVER: ', id)
      });
    })
}
