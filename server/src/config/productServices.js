const fs = require("fs");
const path = require("path");
const {
  Productos,
  Categorias,
  Marcas,
  Fabricantes,
  Imagenes,
} = require("../config/bd");

const productosJSONFilePath = path.join(__dirname, "../../api/productos.json");
const categoriasJSONFilePath = path.join(
  __dirname,
  "../../api/categorias.json"
);
const marcasJSONFilePath = path.join(__dirname, "../../api/marcas.json");
const fabricantesJSONFilePath = path.join(
  __dirname,
  "../../api/fabricantes.json"
);
const imagenesJSONFilePath = path.join(__dirname, "../../api/imagenes.json");

const createProductsFromJSON = async () => {
  try {
    const categoriasData = JSON.parse(
      fs.readFileSync(categoriasJSONFilePath, "utf8")
    );
    const marcasData = JSON.parse(fs.readFileSync(marcasJSONFilePath, "utf8"));
    const fabricantesData = JSON.parse(
      fs.readFileSync(fabricantesJSONFilePath, "utf8")
    );
    const productosData = JSON.parse(
      fs.readFileSync(productosJSONFilePath, "utf8")
    );
    const imagenesData = JSON.parse(
      fs.readFileSync(imagenesJSONFilePath, "utf8")
    );

    for (const categoriaData of categoriasData) {
      await Categorias.findOrCreate({ where: categoriaData });
    }

    for (const marcaData of marcasData) {
      await Marcas.findOrCreate({ where: marcaData });
    }

    for (const fabricanteData of fabricantesData) {
      await Fabricantes.findOrCreate({ where: fabricanteData });
    }

    for (const productoData of productosData) {
      const existingProduct = await Productos.findOne({
        where: { id: productoData.id },
      });
      if (existingProduct) {
        continue;
      }
      const categoria = await Categorias.findByPk(productoData.idCategoria);
      const marca = await Marcas.findByPk(productoData.idMarca);
      const fabricante = await Fabricantes.findByPk(productoData.idFabricante);

      if (!categoria || !marca || !fabricante) {
        console.error(
          `Error: No se encontró la información completa para el producto con ID ${productoData.id}.`
        );
        continue;
      }

      const producto = await Productos.create({
        ...productoData,
        idCategoria: categoria.id,
        idMarca: marca.id,
        idFabricante: fabricante.id,
      });

      const imagenesProducto = imagenesData.filter(
        (imagen) => imagen.idProducto === productoData.id
      );

      for (const imagen of imagenesProducto) {
        await Imagenes.create({
          url: imagen.url,
          idProducto: producto.id,
        });
      }
    }
  } catch (error) {
    console.error("Error al crear productos:", error);
  }
};

module.exports = { createProductsFromJSON };
