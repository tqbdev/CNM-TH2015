module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admin', {
        username:  {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        telephone: DataTypes.STRING,
        rfToken: DataTypes.STRING
    })
    
  
    return Admin
  }
  