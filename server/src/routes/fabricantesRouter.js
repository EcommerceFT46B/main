const { Router } = require("express");
const {
  getFabricantesHandler,
  newFabricanteHandler,
  updateFabricanteHandler,
  deleteFabricanteHandler,
} = require("../handlers/fabricantesHandler");

const fabRouter = Router();

fabRouter.get("/", getFabricantesHandler);
fabRouter.post("/new", newFabricanteHandler);
fabRouter.put("/change/:id", updateFabricanteHandler);
fabRouter.delete("/delete/", deleteFabricanteHandler);

module.exports = fabRouter;
