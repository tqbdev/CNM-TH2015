module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define('Request', {
        name: DataTypes.STRING,
        telephone: DataTypes.STRING,
        address: DataTypes.STRING,
        locatedAddress: DataTypes.STRING,
        locatedCoordinate: DataTypes.STRING,
        note: DataTypes.TEXT,
        status: {type: DataTypes.INTEGER, defaultValue: 0}, // nonlocate | located | received | moving | completed
        retries: {type: DataTypes.INTEGER, defaultValue: 0}
    })

    Request.associate = function (models) {
        Request.belongsTo(models.Driver)
    }

    return Request
}
