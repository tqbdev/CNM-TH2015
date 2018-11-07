const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
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
    const Driver = sequelize.define('Driver', {
        telephone: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        coordinate: DataTypes.GEOMETRY,
        ready: DataTypes.BOOLEAN, // busy | ready
        refreshToken: DataTypes.TEXT
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
        return bcrypt.compareAsync(password, this.password)
    }

    return Driver
}