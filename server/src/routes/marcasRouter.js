const { Router } = require("express");
const {
  getMarcasHandler,
  newMarcaHandler,
  updateMarcaHandler,
  deleteMarcaHandler,
} = require("../handlers/marcasHandler");

const marcasRouter = Router();

marcasRouter.get("/", getMarcasHandler);
marcasRouter.post("/new", newMarcaHandler);
marcasRouter.put("/change/:id", updateMarcaHandler);
marcasRouter.delete("/delete/", deleteMarcaHandler);

module.exports = marcasRouter;
