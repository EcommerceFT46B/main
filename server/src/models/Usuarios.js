const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Usuarios = sequelize.define("Usuarios", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        //Min 3 characters, at least one letter a-z, one number 0-9
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/,
        notEmpty: true,
        len: [3, 30],
      },
    },
    picture: {
      type: DataTypes.STRING(500),
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    dirFacturacion: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    dirEnvio: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        isPhoneNumberFormat(value) {
          if (value && !/^[0-9]{3,15}$/.test(value))
            throw Error("Invalid phone number format.");
        },
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    idRol: {
      type: DataTypes.INTEGER,
    },
  });
  return Usuarios;
};

