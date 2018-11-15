module.exports = {
  PORT: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'grab_bike',
    user: process.env.DB_USER || 'root',

    password: process.env.DB_PASS || 'Chung123',

    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || '104.248.178.182'
    }
  },
  authencation: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: 60 * 1 // 1 minutes
  }
}
