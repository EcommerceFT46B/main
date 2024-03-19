const {
  getAllProducts,
  getProductsById,
  getProductsByName,
  postNewProducts,
  changeProducts,
  deleteProducts,
  changeProductStock,
  changeProductRating,
} = require("../controllers/productsController");

const getProductsHandler = async (req, res) => {
  try {
    const response = await getAllProducts();

    res.status(200).json(response);
  } catch (error) {
    //res.status(400).send(`No se pudo recuperar información de los productos`);
    res.status(400).send(error.message);
  }
};

const getProductsDetailHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getProductsById(id);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).send(`No se encontró ningún producto con id ${id}`);
    }
  } catch (error) {
    res
      .status(400)
      .send(
        `Error al recuperar información del producto con id ${id}: ${error.message}`
      );
  }
};

const postNewProductHandler = async (req, res) => {
  const data = req.body;
  console.log("Datos recibidos en la solicitud:", data);
  try {
    const result = await postNewProducts(data);
    if (result.error) {
      console.error("Error al crear un nuevo producto:", result.error);
      return res.status(400).json({ error: result.error });
    }

    console.log("Producto creado exitosamente:", result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error interno del servidor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const changeProductHandler = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  //req.body:
  // {
  //   "nombre": "reemplazando datos xd",
  //   "descripcion": "nueva description xd",
  //   "idCategoria": 7,
  //   "idFabricante": 1,
  //   "imagenes": [
  //    {
  //      "url": "https://example.com/imagen7.jpg"
  //    },
  //    {
  //      "url": "https://example.com/imagen8.jpg"
  //    }
  //    ]
  // }

  try {
    const updatedProduct = await changeProducts(id, productData);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  //si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
  const { id, sw } = req.query;
  try {
    const response = await deleteProducts(id, sw);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .send(`No se pudo borrar la información del producto con id--> ${id}`);
  }
};

const getProductsByNameHandler = async (req, res) => {
  try {
    const { nombre } = req.query;

    const productsByName = await getProductsByName(nombre);

    if (productsByName.length === 0) {
      res.status(404).json({
        error: "No se encontraron productos con el nombre proporcionado",
      });
    } else {
      res.status(200).json(productsByName);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
};

const changeProductStockHandler = async (req, res) => {
  const { id, stock } = req.body;

  try {
    const productUpdate = await changeProductStock({ id, stock });
    res.status(200).json(productUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changeProductRatingHandler = async (req, res) => {
  const { id, rating } = req.body;

  try {
    const productUpdate = await changeProductRating({ id, rating });
    res.status(200).json(productUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProductsHandler,
  getProductsDetailHandler,
  postNewProductHandler,
  changeProductHandler,
  deleteProductHandler,
  getProductsByNameHandler,
  changeProductHandler,
  changeProductStockHandler,
  changeProductRatingHandler,
};
