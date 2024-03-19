const { Fabricantes } = require("../config/bd");

// VER FABRICANTES
const viewFabricantes = async () => {
  try {
    const listFabricantes = await Fabricantes.findAll();
    listFabricantes.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    return [...listFabricantes];
  } catch (error) {
    return error.message;
  }
};

//CREAR FABRICANTE
const createFabricante = async (nombre, descripcion) => {
  try {
    const maxIdFabricante = await Fabricantes.max("id");

    const newIdFabricante = maxIdFabricante ? maxIdFabricante + 1 : 1;

    const newFabricante = await Fabricantes.create({
      id: newIdFabricante,
      nombre,
      descripcion,
    });
    return newFabricante;
  } catch (error) {
    console.error("Error al crear el Fabricante:", error.message);
    throw error;
  }
};

//ACTUALIZAR FABRICANTE
const updateFabricante = async (id, nombre, descripcion, estado) => {
  try {
    const existingFabricante = await Fabricantes.findByPk(id);

    if (!existingFabricante) {
      throw new Error("Fabricante inexistente");
    }

    await Fabricantes.update(
      { nombre: nombre, descripcion: descripcion, estado: estado },
      { where: { id: id } }
    );
    return await Fabricantes.findByPk(id);
  } catch (error) {
    throw error;
  }
};

//BORRAR FABRICANTE
const deleteFabricante = async (id, sw) => {
  //si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
  try {
    const Fabricante = await Fabricantes.findByPk(id);
    if (!Fabricante) {
      throw new Error(`El ID de la categoria no existe ${id}`);
    }
    if (sw === "true") {
      await Fabricantes.update({ estado: false }, { where: { id: id } });
    } else if (sw === "false") {
      await Fabricantes.update({ estado: true }, { where: { id: id } });
    } else {
      throw new Error("El parametro 'sw' debe ser 'true' o 'false'");
    }
    return { message: "Fabricante actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar estado de Fabricante", error.message);
  }
  throw error;
};

module.exports = {
  viewFabricantes,
  createFabricante,
  updateFabricante,
  deleteFabricante,
};
