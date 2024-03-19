const {
  Productos,
  Imagenes,
  Categorias,
  Marcas,
  Fabricantes,
  Votos,
} = require("../config/bd");
const { Sequelize } = require("sequelize");

const getAllProducts = async () => {
  try {

    const products = await Productos.findAll({
      include: [
        { model: Imagenes },
        { model: Categorias },
        { model: Marcas },
        { model: Fabricantes },
        { model: Votos },
      ],
      attributes: { exclude: ["idCategoria", "idMarca", "idFabricante"] },
    });

    products.forEach((product) => {
      if (product.Categoria && !product.Categoria.estado) {
        product.Categoria.nombre = "Categoría inactiva";
      }
      if (product.Marca && !product.Marca.estado) {
        product.Marca.nombre = "Marca inactiva";
      }
      if (product.Fabricante && !product.Fabricante.estado) {
        product.Fabricante.nombre = "Fabricante inactivo";
      }
    });


    return products;
  } catch (error) {
    throw new Error("Error al obtener todos los productos: " + error.message);
  }
};

const getProductsById = async (id) => {
  const product = await Productos.findOne({
    where: { id: id },
    include: [
      { model: Imagenes },
      { model: Categorias },
      { model: Marcas },
      { model: Fabricantes },
    ],
    attributes: { exclude: ["idCategoria", "idMarca", "idFabricante"] },
  });
  return product;
};

const getProductsByName = async (nombre) => {
  const bddProducts = await Productos.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          nombre: {
            [Sequelize.Op.iLike]: `%${nombre}%`,
          },
        },
        {
          descripcion: {
            [Sequelize.Op.iLike]: `%${nombre}%`,
          },
        },
      ],
    },
    include: [
      { model: Imagenes },
      { model: Categorias },
      { model: Marcas },
      { model: Fabricantes },
      { model: Votos },
      { model: Votos },
    ],
    attributes: { exclude: ["idCategoria", "idMarca", "idFabricante"] },
  });

  return bddProducts;
};


const postNewProducts = async (data) => {
  try {
    const {
      nombre,
      descripcion,
      especificaciones,
      nroserie,
      nromac,
      precio,
      stock,
      minimo,
      preferencia,
      estado,
      idCategoria,
      idMarca,
      idFabricante,
      imagen
    } = data;

    //console.log("Datos recibidos para crear un nuevo producto:", data);

    if (!idCategoria || !idMarca || !idFabricante) {
      //console.error("Error: la categoría, marca o fabricante no están especificados");
      return {
        error: "La categoría, marca o fabricante no están especificados",
      };
    }
    if (!imagen) {
      //console.error("Error: la URL de la imagen no está especificada");
      return { error: "La URL de la imagen no está especificada" };
    }

    const existingProduct = await Productos.findOne({
      where: { nroserie: nroserie },
    });
    if (existingProduct) {
      //console.error(`Error: Ya existe un producto con el nro. Serie: ${nroserie}`);
      return { error: `Ya existe un producto con el nro. Serie: ${nroserie}`};
    }

    console.log("Creando un nuevo producto en la base de datos...");
    const newProductId = (await Productos.max("id")) + 1 || 1;
    const newProduct = await Productos.create({
      id: newProductId,
      nombre,
      descripcion,
      especificaciones,
      nroserie,
      nromac,
      precio,
      stock,
      minimo,
      preferencia,
      estado,
      idCategoria,
      idMarca,
      idFabricante,
      imagen
    });

    //console.log("Producto creado exitosamente:", newProduct);

    //console.log("Creando una nueva imagen asociada al producto...");
    
    const uploadedImage = await Imagenes.create({
      url: imagen,
      idProducto: newProductId,
    });

    //console.log("Imagen asociada creada exitosamente:", uploadedImage);

    //console.log("Obteniendo el producto recién creado con sus asociaciones...");

    const productWithAssociations = await Productos.findByPk(newProduct.id, {
      include: [
        { model: Imagenes },
        { model: Categorias },
        { model: Marcas },
        { model: Fabricantes },
      ],
      attributes: { exclude: ["idCategoria", "idMarca", "idFabricante"] },
    });

    //console.log("Producto con asociaciones:", productWithAssociations);

    return productWithAssociations;
  } catch (error) {
    //console.error("Error al crear un nuevo producto:", error);
    throw error;
  }
};
const changeProducts = async (id, productData) => {
  try {
    const existingProduct = await Productos.findByPk(id, {
      include: [
        { model: Imagenes },
        { model: Categorias },
        { model: Marcas },
        { model: Fabricantes },
      ],
      attributes: { exclude: ["idCategoria", "idMarca", "idFabricante"] },
    });

    if (!existingProduct) {
      throw new Error(`El ID del producto no existe: ${id}`);
    }

    await existingProduct.update(productData);

    if (productData.imagenes && Array.isArray(productData.imagenes)) {
      await Promise.all(
        productData.imagenes.map(async (imagen) => {
          await Imagenes.create({ ...imagen, idProducto: id });
        })
      );
    }

    const updatedProduct = await Productos.findByPk(id, {
      include: [
        { model: Imagenes },
        { model: Categorias },
        { model: Marcas },
        { model: Fabricantes },
      ],
      attributes: { exclude: ["idCategoria", "idMarca", "idFabricante"] },
    });

    return updatedProduct;
  } catch (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
};

const deleteProducts = async (id, sw) => {
  //si sw es true se borra el registro de la tabla, si es false se desactiva el registro y no se elimina
  try {
    const product = await Productos.findByPk(id);

    if (!product) {
      throw new Error(`El ID del producto no existe ${id}`);
    }

    if (sw === "true") {
      await product.update({ estado: false });
    } else if (sw === "false") {
      await product.update({ estado: true });
    } else {
      throw new Error("El parámetro 'sw' debe ser 'true' o 'false'.");
    }

    return { message: "Producto actualizado correctamente" };
  } catch (error) {
    throw new Error(
      `No se pudo actualizar la información del producto con id ${id}: ${error.message}`
    );
  }
};

const changeProductStock = async ({ id, stock }) => {
  try {
    const product = await Productos.findByPk(id);
    if (!product) {
      throw new Error(`El ID del producto no existe: ${id}`);
    }

    await product.update({ stock: stock });

    return product;
  } catch (error) {
    throw new Error(
      `Error al actualizar el stock del producto: ${error.message}`
    );
  }
};
module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByName,
  postNewProducts,
  changeProducts,
  deleteProducts,
  changeProductStock,
};