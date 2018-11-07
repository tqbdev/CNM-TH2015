module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: DataTypes.STRING,
        telephone: DataTypes.STRING,
        address: DataTypes.STRING,
        coordinate: DataTypes.STRING,
        note: DataTypes.STRING,
        status: DataTypes.STRING // nonlocate | located | received | moving | completed
    })

    User.associate = function (models) {
        // User.belongsTo(models.Driver)
        // User.belongsTo(models.JWT_Table)
    }

    return User;
}