module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define('Process', {
      status: {type: DataTypes.INTEGER, defaultValue: 0}, // sent | rejected | accepted
  })

  Process.associate = function (models) {
      Process.belongsTo(models.Driver)
      Process.belongsTo(models.Request)
  }

  Process.destroy({
    where: {},
    truncate: true
  })

  return Process
}
