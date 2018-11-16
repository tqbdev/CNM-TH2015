const { User } = require('../models')
const AppConstants = require('../app.constant')

function getUnlocatedRequests () {
  return User.findAll({
    where: {
      status: AppConstants.USER.UNLOCATED
    },
    order: [
      ['updatedAt', 'DESC']
    ]
  })
}

function getAllRequests () {
  return User.findAll({
    order: [
      ['updatedAt', 'DESC']
    ]
  })
}

module.exports = (io) => {
  const requests =  io
    .of('/requests')
    .on('connection', function (socket) {
      setInterval(async () => {
        const users = await getUnlocatedRequests()
        requests.emit('OPEN', {
          users
        })
      }, 5000);

      setInterval(async () => {
        const users = await getAllRequests()
        requests.emit('ALL', {
          users
        })
      }, 5000);
    })
}
