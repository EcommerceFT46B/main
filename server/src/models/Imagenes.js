const { DataTypes } = require("sequelize");

module.exports = (database) => {
  const Imagenes = database.define("Imagenes", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Imagenes;
};
