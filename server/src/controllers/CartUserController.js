const { CartUsers } = require('../config/bd');

const CreateCarrito = async (idUser) => {
  try {
    const existingCarrito = await CartUsers.findOne({ where: { idUser } });

    if (existingCarrito) {
      return existingCarrito.id
    }

    const newCarrito = await CartUsers.create({ idUser }, { returning: true });
    return newCarrito.id;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  CreateCarrito
};
