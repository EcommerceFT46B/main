const {
  viewFabricantes,
  createFabricante,
  updateFabricante,
  deleteFabricante,
} = require("../controllers/fabricanteController");

// GET
const getFabricantesHandler = async (req, res) => {
  try {
    const response = await viewFabricantes();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(`No se pudo recuperar información de los Fabricantes`);
  }
};

// POST
const newFabricanteHandler = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const newFabricante = await createFabricante(nombre, descripcion);
    res.status(200).json(newFabricante);
  } catch (error) {
    // console.log(error);
    res
      .status(400)
      .send(
        `No se pudo crear el registro del fabricante ${nombre} ${descripcion}`
      );
  }
};

// UPDATE
const updateFabricanteHandler = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  try {
    const newFabricante = await updateFabricante(
      id,
      nombre,
      descripcion,
      estado
    );
    res.status(200).json(newFabricante);
  } catch (error) {
    // console.log(error);
    res.status(400).send(error.message);
  }
};

// DELETE
const deleteFabricanteHandler = async (req, res) => {
  const { id, sw } = req.query;
  try {
    const delFabricante = await deleteFabricante(id, sw);
    res.status(200).json(delFabricante);
  } catch (error) {
    // console.log(error);
    res.status(400).send(`No se pudo borrar la categoria con id ${id}`);
  }
};

module.exports = {
  getFabricantesHandler,
  newFabricanteHandler,
  updateFabricanteHandler,
  deleteFabricanteHandler,
};
