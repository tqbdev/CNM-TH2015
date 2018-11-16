module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {})

  Trip.associate = function (models) {
    Trip.belongsTo(models.User)
    Trip.belongsTo(models.Driver)
  }

  return Trip
}
