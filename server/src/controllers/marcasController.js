const { Marcas } = require("../config/bd");

// VER MARCAS
const viewMarcas = async () => {
  try {
    const listMarcas = await Marcas.findAll();
    listMarcas.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    return [...listMarcas];
  } catch (error) {
    return error.message;
  }
};

// CREAR MARCA
const createMarca = async (nombre, descripcion) => {
  try {
    const maxIdMarcas = await Marcas.max("id");

    const newIdMarcas = maxIdMarcas ? maxIdMarcas + 1 : 1;

    const newMarca = await Marcas.create({
      id: newIdMarcas,
      nombre,
      descripcion,
    });
    return newMarca;
  } catch (error) {
    console.error("Error al crear la Marca:", error.message);
    throw error;
  }
};

//ACTUALIZAR MARCA
const updateMarca = async (id, nombre, descripcion, estado) => {
  try {
    const existingMarca = await Marcas.findByPk(id);

    if (!existingMarca) {
      throw new Error("Marca inexistente");
    }

    await Marcas.update(
      { nombre: nombre, descripcion: descripcion, estado: estado },
      { where: { id: id } }
    );
    return await Marcas.findByPk(id);
  } catch (error) {
    throw error;
  }
};

//BORRAR MARCA
const deleteMarca = async (id, sw) => {
  //si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
  try {
    const Marca = await Marcas.findByPk(id);
    if (!Marca) {
      throw new Error(`El ID de la Marca no existe:${id}`);
    }
    if (sw === "true") {
      await Marcas.update({ estado: false }, { where: { id: id } });
    } else if (sw === "false") {
      await Marcas.update({ estado: true }, { where: { id: id } });
    } else {
      throw new Error("El parametro debe ser 'true' o 'false'");
    }
    return { message: "Categoría actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la Marca", error.message);
    throw error;
  }
};
module.exports = {
  viewMarcas,
  createMarca,
  updateMarca,
  deleteMarca,
};
