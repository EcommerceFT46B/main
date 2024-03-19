const { DataTypes } = require('sequelize');

module.exports = (database) => {
    database.define('CartUsers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
} 
