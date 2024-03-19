const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Pedidos = sequelize.define("Pedidos", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dirEnvio: {
      type: DataTypes.STRING,
      allowNull: null,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: null,
    },
    metodoPago: {
      type: DataTypes.STRING(200),
      allowNull: null,
    },
  });
  return Pedidos;
};
