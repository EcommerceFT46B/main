const { Usuarios, Votos, Roles } = require("../config/bd");
const { Sequelize } = require("sequelize");

const getUsuarios = async () => {
  try {

    const usuarios = await Usuarios.findAll({
      include: [{ model: Roles }, { model: Votos }],
      attributes: { exclude: ["idRol"] },
    });

    return usuarios;
  } catch (error) {
    throw new Error("Error al obtener todos los usuarios: " + error.message);
  }
};

const getUsuariosById = async (id) => {
  const dbUsuarios = await Usuarios.findOne({
    where: { id: id },
    include: [{ model: Roles }, { model: Votos }],
    attributes: { exclude: ["idRol"] },
  });
  return dbUsuarios;
};

const getUsuariosByNombre = async (nombre) => {
  try {
    const dbUsuarios = await Usuarios.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: `%${nombre}%`,
        },
      },
      include: [{ model: Roles }, { model: Votos }],
      attributes: { exclude: ["idRol"] },
    });

    // Filtrar usuarios únicos por ID
    const uniqueUsuarios = dbUsuarios.filter(
      (usuario, index, self) =>
        index === self.findIndex((u) => u.id === usuario.id)
    );

    return uniqueUsuarios;
  } catch (error) {
    console.error("Error al buscar usuarios por nombre:", error);
    throw error;
  }
};

const getUsuariosByEmail = async (email) => {
  const dbUsuarios = await Usuarios.findAll({
    where: { email: email },
    include: [{ model: Roles }, { model: Votos }],
    attributes: { exclude: ["idRol"] },
  });

  if (dbUsuarios.length === 0) {
    throw new Error("No se encontraron usuarios con ese email.");
  }

  return dbUsuarios;
};

const postNewUsuarios = async (
  email,
  password,
  picture,
  nombre,
  dirFacturacion = "",
  dirEnvio = "",
  telefono = "",
  estado = true,
  idRol = 2
) => {
  try {
    const usuarioExistente = await Usuarios.findOne({ where: { email } });
    if (usuarioExistente) {
      return [usuarioExistente];
    }
    const maxIdUser = await Usuarios.max("id");

    const newUserId = maxIdUser ? maxIdUser + 1 : 1;

    const nuevoUsuario = await Usuarios.create({
      id: newUserId,
      email,
      password,
      picture,
      nombre,
      dirFacturacion,
      dirEnvio,
      telefono,
      estado,
      idRol,
    });

    const usuarioConRol = await Usuarios.findByPk(nuevoUsuario.id, {
      include: [{ model: Roles }, { model: Votos }],
      attributes: { exclude: ["idRol"] },
    });

    return [usuarioConRol];
  } catch (error) {
    throw error;
  }
};

const changeUsuarios = async (id, usuarioData) => {
  try {
    const existingUsuario = await Usuarios.findByPk(id, {
      include: [{ model: Votos }, { model: Roles }],
      attributes: { exclude: ["idRol"] },
    });

    if (!existingUsuario) {
      throw new Error(`El ID del usuario no existe: ${id}`);
    }

    if (usuarioData.Role && usuarioData.Role.id) {
      const existingRole = await Roles.findByPk(usuarioData.Role.id);
      if (!existingRole) {
        throw new Error(`El ID del rol no existe: ${usuarioData.Role.id}`);
      }

      await existingUsuario.update({ idRol: usuarioData.Role.id });
    }

    await existingUsuario.update(usuarioData);

    const updatedUsuario = await Usuarios.findByPk(id, {
      include: [{ model: Votos }, { model: Roles }],
      attributes: { exclude: ["idRol"] },
    });
    return updatedUsuario;
  } catch (error) {
    throw new Error(`Error al actualiar el usuario: ${error.message}`);
  }
};

const deleteUsuario = async (id, sw) => {
  // si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
  try {
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      throw new Error(`El ID del usuario no existe: ${id}`);
    }

    if (sw === "true") {
      await usuario.update({ estado: false });
    } else if (sw === "false") {
      await usuario.update({ estado: true });
    } else {
      throw new Error("El parámetro 'sw' debe ser 'true' o 'false'.");
    }

    return { message: "Usuario actualizado correctamente" };
  } catch (error) {
    throw new Error("No se pudo actualizar el Usuario");
  }
};

module.exports = {
  getUsuarios,
  getUsuariosById,
  getUsuariosByEmail,
  getUsuariosByNombre,
  postNewUsuarios,
  changeUsuarios,
  deleteUsuario,
};
