const { Router } = require("express")

const { newCartUserHandler } = require('../handlers/CartUserHandler')

const carUserRouter = Router();

carUserRouter.post("/new"     ,newCartUserHandler);

module.exports = carUserRouter;