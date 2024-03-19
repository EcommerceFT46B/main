const {
  getVotos,
  getVotoProductosById,
  postNewVoto,
  getVotosIdUsuario,
  deleteVote,
} = require("../controllers/votosController");

const getVotoHandler = async (req, res) => {
  try {
    const response = await getVotos();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .send(
        `No se pudo recuperar información del voto del usuario con id--> ${id}`
      );
  }
};
const getVotosIdUsuarioHandler = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const votos = await getVotosIdUsuario(idUsuario);
    res.status(200).json(votos);
  } catch (error) {
    res
      .status(400)
      .send(
        `No se pudo recuperar información del voto del usuario con id--> ${id}`
      );
  }
};
const getVotoProductosHandler = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const response = await getVotoProductosById(idProducto);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .send(
        `No se pudo recuperar información del voto con id--> ${idProducto}`
      );
  }
};

const postNewVotosHandler = async (req, res) => {
  const { idProducto, idUsuario, voto, comentario } = req.body;
  try {
    const newVoto = await postNewVoto(idProducto, idUsuario, voto, comentario);
    res.status(200).json(newVoto);
  } catch (error) {
    res.status(400).send(`No se pudo crear el registro del voto`);
  }
};
const deleteVoteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteVote(id);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .send(`No se pudo borrar la información del Voto con id--> ${id}`);
  }
};
module.exports = {
  getVotoHandler,
  getVotoProductosHandler,
  postNewVotosHandler,
  getVotosIdUsuarioHandler,
  deleteVoteHandler,
};
