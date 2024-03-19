const { Votos } = require("../config/bd");
const sequelize = require("sequelize");

const getVotos = async () => {
  try {
    const votos = await Votos.findAll();
    return votos;
  } catch (error) {
    return error.message;
  }
};
const getVotosIdUsuario = async (idUsuario) => {
  try {
    const usuarioVotos = await Votos.findAll({
      where: { idUsuario: idUsuario },
    });
    return usuarioVotos;
  } catch (error) {
    console.error("Error al obtener los votos del usuario: ", error);
    throw error;
  }
};

const getVotoProductosById = async (idProducto) => {
  const votosDB = await Votos.findAll({
    attributes: ["comentario"],
    where: { idProducto: idProducto },
  });
  const promedio = await Votos.findAll({
    attributes: [[sequelize.fn("AVG", sequelize.col("voto")), "promedio"]],
    where: { idProducto: idProducto },
  });
  const count = await Votos.count({
    where: { idProducto: idProducto },
  });
  promedio.push({ count: count });
  return promedio.concat(votosDB);
};

const postNewVoto = async (idProducto, idUsuario, voto, comentario) => {
  try {
    const maxIdVoto = await Votos.max("id");

    const newIdVoto = maxIdVoto ? maxIdVoto + 1 : 1;
    const newVoto = await Votos.create({
      id: newIdVoto,
      idProducto,
      idUsuario,
      voto,
      comentario,
    });
    const promedio = await Votos.findAll({
      attributes: [[sequelize.fn("AVG", sequelize.col("voto")), "promedio"]],
      where: { idProducto: idProducto },
    });
    const count = await Votos.count({
      where: { idProducto: idProducto },
    });
    promedio.push({ count: count });
    return promedio.concat(newVoto);
  } catch (error) {
    console.error("Error al crear el voto :", error.message);
    throw error;
  }
};

const deleteVote = async (id) => {
  try {
    const voto = await Votos.findByPk(id);
    if (!voto) {
      throw new Error(`El voto con el ID ${id} no existe`);
    }

    await voto.destroy();
    return { message: "Voto eliminado correctamente" };
  } catch (error) {
    throw new Error(`No se pudo eliminar el voto: ${error.message}`);
  }
};
module.exports = {
  getVotosIdUsuario,
  getVotos,
  getVotoProductosById,
  postNewVoto,
  deleteVote,
};
