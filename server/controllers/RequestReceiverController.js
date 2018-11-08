const { User } = require('../models')

module.exports = {
  async receiveRequest (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()

      res.send({
        user: userJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in request receiver api.'
      })
    }
  }
}
