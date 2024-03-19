const { Categorias } = require("../config/bd");

// VER CATEGORIAS
const viewCategory = async () => {
  try {
    const listCategory = await Categorias.findAll();
    listCategory.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    return [...listCategory];
  } catch (error) {
    return error.message;
  }
};

// CREAR CATEGORIA
const createCategory = async (nombre, descripcion) => {
  try {
    const maxIdCategoria = await Categorias.max("id");

    const newIdCategoria = maxIdCategoria ? maxIdCategoria + 1 : 1;

    const newCategory = await Categorias.create({
      id: newIdCategoria,
      nombre,
      descripcion,
    });
    return newCategory;
  } catch (error) {
    console.error("Error al crear la categoría:", error.message);
    throw error;
  }
};

//ACTUALIZAR CATEGORIA
const updateCategory = async (id, nombre, descripcion, estado) => {
  try {
    const existingCategory = await Categorias.findByPk(id);

    if (!existingCategory) {
      throw new Error("Categoria inexistente");
    }

    await Categorias.update(
      { nombre: nombre, descripcion: descripcion, estado: estado },
      { where: { id: id } }
    );

    return await Categorias.findByPk(id);
  } catch (error) {
    throw error;
  }
};

//BORRAR CATEGORIA
const deleteCategory = async (id, sw) => {
  //si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
  try {
    const categoria = await Categorias.findByPk(id);
    if (!categoria) {
      throw new Error(`El ID de la Categoría no existe ${id}`);
    }

    if (sw === "true") {
      await Categorias.update({ estado: false }, { where: { id: id } });
    } else if (sw === "false") {
      await Categorias.update({ estado: true }, { where: { id: id } });
    } else {
      throw new Error("El parámetro 'sw' debe ser 'true' o 'false'.");
    }

    return { message: "Categoría actualizada correctamente" };
  } catch (error) {
    console.error(
      `Error al actualizar la información de la categoría con id ${id}: ${error.message}`
    );
    throw error;
  }
};

module.exports = {
  viewCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
