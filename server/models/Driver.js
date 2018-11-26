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
        coordinate: DataTypes.STRING,
        ready: {type: DataTypes.BOOLEAN, defaultValue: false}, // busy | ready
        refreshToken: DataTypes.TEXT
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    })

    // Driver.associate = function (models) {
    //     Driver.hasMany(models.User, {as: 'Users'})
    // }

    Driver.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }

    return Driver
}