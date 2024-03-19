const {
  viewCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// GET
const getCategoryHandler = async (req, res) => {
  try {
    const response = await viewCategory();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(`No se pudo recuperar información de las Categorias`);
  }
};

// POST
const newCategoryHandler = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const newCategory = await createCategory(nombre, descripcion);
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(400)
      .send(
        `No se pudo crear el registro de la categoria ${nombre} ${descripcion}`
      );
  }
};

// UPDATE
const updateCategoryHandler = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  try {
    const updatedCategory = await updateCategory(
      id,
      nombre,
      descripcion,
      estado
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// DELETE
const deleteCategoryHandler = async (req, res) => {
  const { id, sw } = req.query;
  try {
    const delCategory = await deleteCategory(id, sw);
    res.status(200).json(delCategory);
  } catch (error) {
    res.status(400).send(`No se pudo borrar la categoria con id ${id}`);
  }
};

module.exports = {
  getCategoryHandler,
  newCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
};
