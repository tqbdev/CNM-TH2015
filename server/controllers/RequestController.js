const { User } = require('../models')
const AppConstant = require('../app.constant')

module.exports = {
  async receiveRequest (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()

      await user.update({
        status: AppConstant.USER.UNLOCATED,
        coordinate: null
      })

      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in request receiver api.'
      })
    }
  },

  async getById (req, res) {
    try {
      const user = await User.findById(req.params.userId)
      const userJson = user.toJSON()

      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in get request by id.'
      })
    }
  },
}
