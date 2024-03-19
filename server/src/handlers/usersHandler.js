const {
  getUsuarios,
  getUsuariosById,
  getUsuariosByEmail,
  getUsuariosByNombre,
  postNewUsuarios,
  changeUsuarios,
  deleteUsuario,
} = require("../controllers/usersController");

const getUsuariosHandler = async (req, res) => {
  try {
    const response = await getUsuarios();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(`No se pudo recuperar información de los Usuarios`+error.message);
  }
};

const getUsuariosByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getUsuariosById(id);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .send(`No se pudo recuperar información del usuario con id--> ${id}`);
  }
};

const getUsuariosByEmailHandler = async (req, res) => {
  const { email } = req.params;

  try {
    const response = await getUsuariosByEmail(email);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .send(
        `No se pudo recuperar información del usuario con email--> ${email}`
      );
  }
};

const postNewUsuarioHandler = async (req, res) => {
  const {
    email,
    password,
    picture,
    nombre,
    dirFacturacion,
    dirEnvio,
    telefono,
    estado,
    idRol,
  } = req.body;

  try {
    const newUsuario = await postNewUsuarios(
      email,
      password,
      picture,
      nombre,
      dirFacturacion,
      dirEnvio,
      telefono,
      estado,
      idRol
    );
    console.log("Nuevo usuario creado:", newUsuario);
    res.status(200).json(newUsuario);
  } catch (error) {
    console.error("Error al manejar la solicitud:", error);
    res.status(400).json(error.message);
  }
};

const changeUsuarioHandler = async (req, res) => {
  const { id } = req.params;
  const usuarioData = req.body;
  try {
    const updatedUsuario = await changeUsuarios(id, usuarioData);

    res.status(200).json(updatedUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUsuarioHandler = async (req, res) => {
  //si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
  const { id, sw } = req.query;
  try {
    const response = await deleteUsuario(id, sw);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .send(`No se pudo borrar la información del Usuarioo con id--> ${id}`);
  }
};

const getUsuariosByNombreHandler = async (req, res) => {
  try {
    const { nombre } = req.params;
    const dbUsuarios = await getUsuariosByNombre(nombre);
    if (dbUsuarios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios con ese nombre." });
    }
    res.status(200).json(dbUsuarios);
  } catch (error) {
    console.error(
      "Error al manejar la solicitud de obtener usuarios por nombre:",
      error
    );
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getUsuariosHandler,
  getUsuariosByIdHandler,
  getUsuariosByEmailHandler,
  postNewUsuarioHandler,
  changeUsuarioHandler,
  deleteUsuarioHandler,
  getUsuariosByNombreHandler,
};
