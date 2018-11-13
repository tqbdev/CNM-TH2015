const passport = require('passport')
const AppConstant = require('../app.constant')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, role) {
    if (err || !user) {
      res.status(403).send({
        error: 'You do not have access to this resource'
      })
    } else {
      req.user = user
      req.role = role
      next()
    }
  })(req, res, next)
}
