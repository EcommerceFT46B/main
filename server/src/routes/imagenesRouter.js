const { Router } = require("express");
const {
  getImagenesHandler,
  newImagenHandler,
  deleteImagenHandler,
  uploadImageH,
} = require("../handlers/imagenesHandler");

const ImagenRouter = Router();

ImagenRouter.get("/:id", getImagenesHandler);
ImagenRouter.post("/new", newImagenHandler);
ImagenRouter.delete("/delete/:id", deleteImagenHandler);
ImagenRouter.post("/uploadImage", uploadImageH);

module.exports = ImagenRouter;
