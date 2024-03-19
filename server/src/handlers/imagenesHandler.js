const {
  viewImagenes,
  createImagen,
  deleteImagen,
  uploadImage,
} = require("../controllers/imagenesController");
const fs = require("fs").promises;
const path = require("path");

// GET
const getImagenesHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await viewImagenes(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(`No se recuperaron las imágenes del producto`);
  }
};

// POST
const newImagenHandler = async (req, res) => {
  const { idProducto, url } = req.body;
  // {
  //     "url": "URL_DE_LA_IMAGEN",
  //     "idProducto": 3
  //   }

  try {
    const newImagen = await createImagen(idProducto, url);
    res.status(200).json(newImagen);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(
        `No se pudo crear el registro de la imagen para el producto ${idProducto} ${url}`
      );
  }
};

// DELETE
const deleteImagenHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteImagen(id);
    res
      .status(200)
      .json({ message: `Imagen con ID ${id} borrada exitosamente` });
  } catch (error) {
    res.status(400).send(`No se pudo borrar la Imagen con id ${id}`);
  }
};

const uploadImageH = async (req, res) => {
  try {
    const file = req.files.image;

    if (!file) {
      return res.status(400).json({ error: "Archivo imagen no especificado" });
    }

    const tempDir = path.join(__dirname, "../temp");
    await fs.mkdir(tempDir, { recursive: true });

    tempFilePath = path.join(tempDir, file.name);
    await file.mv(tempFilePath);

    console.log("Imagen guardada temporalmente en:", tempFilePath);

    const imageUrl = await uploadImage({ path: tempFilePath });
    await fs.unlink(tempFilePath);

    console.log("Imagen eliminada del directorio temporal:", tempFilePath);

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getImagenesHandler,
  newImagenHandler,
  deleteImagenHandler,
  uploadImageH,
};
