const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => user.setDataValue('password', hash))
}

module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('driver', {
        username:  {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        coordinate: DataTypes.STRING,
        telephone: DataTypes.STRING,
        birthday: DataTypes.DATE,
        status: DataTypes.STRING,// busy | ready | standby
        rfToken: DataTypes.STRING 
    }, {
        hooks: {
          beforeCreate: hashPassword,
          beforeUpdate: hashPassword
        }
      })

    Driver.associate = function (models) {
        //Driver.belongsTo(models.User)
    }

    Driver.prototype.comparePassword = function (password) {
        console.log(bcrypt.compareSync('12345678', '$2a$08$YVDwJxqxuUc9lDIrCJnNQehV5Rg7VtJ2wI4c6U3yr.fgX/SqF1M4y'))
        return bcrypt.compareAsync(password, this.password)
      }

    return Driver
}