const { Router } = require("express");
const {
  getUsuariosHandler,
  getUsuariosByIdHandler,
  getUsuariosByNombreHandler,
  getUsuariosByEmailHandler,
  postNewUsuarioHandler,
  changeUsuarioHandler,
  deleteUsuarioHandler,
} = require("../handlers/usersHandler");

const usersRouter = Router();

usersRouter.get("/", getUsuariosHandler);
usersRouter.get("/:id", getUsuariosByIdHandler);
usersRouter.get("/nombre/:nombre", getUsuariosByNombreHandler);
usersRouter.get("/email/:email", getUsuariosByEmailHandler);
usersRouter.post("/new", postNewUsuarioHandler);
usersRouter.put("/change/:id", changeUsuarioHandler);
usersRouter.delete("/delete/", deleteUsuarioHandler);
module.exports = usersRouter;
