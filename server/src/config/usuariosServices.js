const fs = require("fs");
const path = require("path");
const { Usuarios, Votos, Roles } = require("../config/bd");

const usuariosJSONFilePath = path.join(__dirname, "../../api/usuarios.json");
const votosJSONFilePath = path.join(__dirname, "../../api/votos.json");
const rolesJSONFilePath = path.join(__dirname, "../../api/roles.json");

const createDataFromJSON = async () => {
  try {
    const rolesData = JSON.parse(fs.readFileSync(rolesJSONFilePath, "utf8"));

    for (const rolData of rolesData) {
      await Roles.findOrCreate({ where: rolData });
    }

    const usuariosData = JSON.parse(
      fs.readFileSync(usuariosJSONFilePath, "utf8")
    );

    for (const usuarioData of usuariosData) {
      const existingUsuario = await Usuarios.findOne({
        where: { id: usuarioData.id },
      });

      if (!existingUsuario) {
        const rol = await Roles.findByPk(usuarioData.idRol);
        if (!rol) {
          continue;
        }
        await Usuarios.create({ ...usuarioData, idRol: rol.id });
      }
    }

    const votosData = JSON.parse(fs.readFileSync(votosJSONFilePath, "utf8"));

    for (const votoData of votosData) {
      await Votos.findOrCreate({ where: votoData });
    }
  } catch (error) {
    console.error("Error al cargar datos desde archivos JSON:", error);
  }
};

module.exports = { createDataFromJSON };
