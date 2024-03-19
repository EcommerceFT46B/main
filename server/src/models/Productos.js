const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Productos = sequelize.define("Productos", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    especificaciones: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    imagen:{
      type: DataTypes.STRING(500),
    },
    nroserie: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nromac: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    minimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    preferencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rating:{
      type:DataTypes.FLOAT,
      defaultValue: 0
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idMarca: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idFabricante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Productos;
};
