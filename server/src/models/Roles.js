const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Roles = sequelize.define("Roles", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rol: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Roles;
};
