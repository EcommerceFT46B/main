const {
    getAllUsuarios,
    getUsuariosById,
    getUsuariosByEmail,
    getUsuariosByNombre,
    postNewUsuarios,
    changeUsuarios,
    deleteUsuario,
} = require('../controllers/usuariosController');

const getUsuariosHandler = async (req, res) => {
    try {
        const response = await getAllUsuarios()
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).send(`No se pudo recuperar información de los usuarios`);
    }
}
const getUsuariosByIdHandler = async (req, res) => {
    const { id } = req.params
    try {
        const response = await getUsuariosById(id)
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).send(`No se pudo recuperar información del usuario con id--> ${id}`);
    }
}

const getUsuariosByEmailHandler = async (req, res) => {
    const { email } = req.params
    
    try {
        const response = await getUsuariosByEmail(email)
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).send(`No se pudo recuperar información del usuario con email--> ${email}`);
    }
}

const postNewUsuarioHandler = async (req, res) => {
    const { email,
            password,
            picture,
            dirFacturacion,
            dirEnvio,
            telefono,
            estado,
            idRol, } = req.body;
    console.log(req.body);
    try {
        const newUsuario = await postNewUsuarios(
            email,
            password,
            picture,
            dirFacturacion,
            dirEnvio,
            telefono,
            estado,
            idRol
        )
        res.status(200).json(newUsuario)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const changeUsuarioHandler = async (req, res) => {
    const { id,
            email,
            password,
            picture,
            dirFacturacion,
            dirEnvio,
            telefono,
            estado,
            idRol } = req.body;
    try {
        const usuarioUpdate = await changeUsuarios({ 
            id,
            email,
            password,
            picture,
            dirFacturacion,
            dirEnvio,
            telefono,
            estado,
            idRol
        });
        res.status(200).json(usuarioUpdate);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteUsuarioHandler = async (req, res) => {
    //si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
    const { id, sw } = req.query
    try {
        const response = await deleteUsuario(id, sw)
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).send(`No se pudo borrar la información del Usuarioo con id--> ${id}`);
    }
}

const getUsuariosByNombreHandler = async (req, res) => {
    try {
        const { nombre } = req.query;
        const dbUsuarios = await getUsuariosByNombre(nombre);
        res.status(200).json(dbUsuarios);
    } catch (error) {
        res.status(404).json({ error: error.message });
        console.error(error);
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
}