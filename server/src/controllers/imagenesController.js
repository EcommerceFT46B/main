const { Imagenes } = require("../config/bd");
const cloudinary = require("cloudinary").v2;

// VER IMAGENES POR PRODUCTO
const viewImagenes = async (id) => {
  try {
    const listImagen = await Imagenes.findAll({ where: { idProducto: id } });
    return [...listImagen];
  } catch (error) {
    return error.message;
  }
};

// AÑADIR IMAGEN A PRODUCTO
const createImagen = async (idProducto, url) => {
  try {
    const newImagen = await Imagenes.create({
      url: url,
      idProducto: idProducto,
    });
    return newImagen;
  } catch (error) {
    throw error;
  }
};

//BORRAR IMGEN DE PRODUCTO
const deleteImagen = async (id) => {
  try {
    const data = await Imagenes.findAll({ where: { id: id } });
    if (data.length === 0) {
      throw new Error(`El ID de la Imagen no existe ${id}`);
    } else {
      const delImagen = await Imagenes.destroy({ where: { id: id } });

      return delImagen;
    }
  } catch (error) {
    console.error(
      `Error al intentar borrar la imagen con ID ${id}: ${error.message}`
    );
    throw error;
  }
};

const uploadImage = async (file) => {
  try {
    const cloudinaryUploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "ecommerce PF",
    });
    const imageUrl = cloudinaryUploadResult.secure_url;

    console.log("Imagen subida a Cloudinary exitosamente:", imageUrl);

    return imageUrl;
  } catch (error) {
    console.error("Error al subir la imagen a Cloudinary:", error);
    throw new Error("Error interno del servidor al subir la imagen");
  }
};
module.exports = {
  viewImagenes,
  createImagen,
  deleteImagen,
  uploadImage,
};
