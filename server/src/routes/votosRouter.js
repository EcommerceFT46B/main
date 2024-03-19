const { Router } = require("express");
const {
  getVotoProductosHandler,
  postNewVotosHandler,
  getVotoHandler,
  getVotosIdUsuarioHandler,
  deleteVoteHandler,
} = require("../handlers/votosHandler");

const votesRouter = Router();

votesRouter.get("/", getVotoHandler);
votesRouter.get("/user/:idUsuario", getVotosIdUsuarioHandler);
votesRouter.get("/producto/:idProducto", getVotoProductosHandler);
votesRouter.post("/new", postNewVotosHandler);
votesRouter.delete("/delete/:id", deleteVoteHandler);

module.exports = votesRouter;
