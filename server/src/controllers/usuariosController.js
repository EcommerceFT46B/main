const { Usuarios } = require('../config/bd')
const Sequelize = require('sequelize');

const getAllUsuarios = async () => {
    const dbUsuarios = await Usuarios.findAll()
    return [...dbUsuarios]
}

const getUsuariosById = async (id) => {
    const dbUsuarios = await Usuarios.findAll({ where: { id: id } });
    return [...dbUsuarios];
}

const getUsuariosByEmail = async (email) => {
    console.log(email);
    const dbUsuarios = await Usuarios.findAll({ where: { email: email } });
    console.log(dbUsuarios);
    return dbUsuarios;
};

const getUsuariosByNombre = async (email) => {
    const dbUsuarios = await Usuarios.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: `%${nombre}%`,
            }
        }
    });
    console.log(dbUsuarios);
    return dbUsuarios;
};

const postNewUsuarios = async (
    email,
    password,
    picture,
    nombre,
    dirFacturacion,
    dirEnvio,
    telefono,
    estado,
    idRol,
) => {
    const data = await Usuarios.findAll({ where: { email: email } })
    if (data.length > 0) {
        throw new Error(`El email ya fue registrado: ${email}`);
    }
    else {
        const newUsuarios = await Usuarios.create(
            {
                email,
                password,
                picture,
                nombre,
                dirFacturacion,
                dirEnvio,
                telefono,
                estado,
                idRol,
            })
        return [newUsuarios];
    }
}

const changeUsuarios = async ({email, password, picture, nombre, dirFacturacion, dirEnvio, telefono, estado, idRol}) => {    console.log(id);
    try {
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            throw new Error(`No existe usuario con ese id: ${id}`);
        }
        const updatedUsuario = await Usuarios.update({
            email, password, picture, nombre, dirFacturacion, dirEnvio, telefono, estado, idRol
        });
        return updatedUsuario;
    } catch (error) {
        throw new Error(`No se actualizaron los datos del usuario: ${error.message}`);
    }
}


const deleteUsuario = async (id, sw) => {
    const data = await Usuarios.findAll({ where: { id: id } })
    if (data.length === 0) {
        throw new Error(`No existe id del Usuario: ${id}`);
    }
    else {
        if (sw === 'true') {
            const usuario = await Usuarios.destroy({ where: { id: id } })
        }
        else {
            const usuario = await Usuarios.update({ estado: sw }, { where: { id: id } })
        }
    }
}

module.exports = {
    getAllUsuarios,
    getUsuariosById,
    getUsuariosByEmail,
    getUsuariosByNombre,
    postNewUsuarios,
    changeUsuarios,
    deleteUsuario,
}