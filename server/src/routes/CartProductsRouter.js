const { Router } = require("express")

const { CreateProductCart, GetProductCart, DeleteProductsCart } = require('../handlers/CartProductHandler')

const carProductRouter = Router()

carProductRouter.post("/new", CreateProductCart)
carProductRouter.get("/get/:idCar", GetProductCart)
carProductRouter.delete('/delete/:idProduct', DeleteProductsCart)

module.exports = carProductRouter