const HashMap = require('hashmap')

module.exports = (io, app) => {
  app.locals.onlineDrivers = new HashMap()
  const driversSocket =  io
    .of('/drivers')
    .on('connection', function (socket) {
      const id = socket.handshake.query.id
      app.locals.onlineDrivers.set(+id, socket)
      console.log('ADD SOCKET - ID DRIVER: ', id)

      socket.on('disconnect', function(){
        app.locals.onlineDrivers.delete(+id)
        console.log('REMOVE SOCKET - ID DRIVER: ', id)
      });
    })
}
