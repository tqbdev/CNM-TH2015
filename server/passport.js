const passport = require('passport')
const { Admin, Driver } = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')
const AppConstant = require('./app.constant')

passport.use(
  'jwt',
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
    secretOrKey: config.authencation.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      let user = null
      switch (jwtPayload.role) {
        case AppConstant.ROLE.DRIVER:
          user = await Driver.findOne({
            where: {
              id: jwtPayload.user.id
            }
          })
        break;
        case AppConstant.ROLE.ADMIN:
          user = await Admin.findOne({
            where: {
              id: jwtPayload.user.id
            }
          })
        break;
      }

      if (!user) {
        return done(new Error(), false)
      }

      return done(null, user, jwtPayload.role)
    } catch (err) {
      return done(new Error(), false)
    }
  })
)

module.exports = null
