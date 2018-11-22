const { Request, Driver } = require('../models')
const AppConstants = require('../app.constant')

function getUnlocatedRequests () {
  return Request.findAll({
    where: {
      status: AppConstants.REQUEST.UNLOCATED
    },
    order: [
      ['updatedAt', 'DESC']
    ]
  })
}

function getAllRequests () {
  return Request.findAll({
    order: [
      ['updatedAt', 'DESC']
    ],
    include: [
      {
        model: Driver
      }
    ]
  })
}

module.exports = (io) => {
  const requestsSocket =  io
    .of('/requests')
    .on('connection', function (socket) {
      setInterval(async () => {
        const requests = await getUnlocatedRequests()
        requestsSocket.emit('OPEN', {
          requests
        })
      }, 5000);

      setInterval(async () => {
        const requests = await getAllRequests()
        requestsSocket.emit('ALL', {
          requests
        })
      }, 5000);
    })
}
