const path = require('path')

module.exports = {
  PORT: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'grab_bike',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../grab_bike.mysql')
    }
  },
  authencation: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
