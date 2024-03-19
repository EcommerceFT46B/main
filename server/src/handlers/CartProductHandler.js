const { CreateCartProduct, GetCartProducts, DropCartProducts } = require('../controllers/CartProductController');
// POST
const CreateProductCart = async (req, res) => {
  try {
    const { idCar, idUser, idProduct, cantidad, monto, estado } = req.body
    const newCarrito = await CreateCartProduct(idCar, idUser, idProduct, cantidad, monto, estado)
    res.status(200).json(`Response: ${newCarrito}`)
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`)
  }
}

// GET
const GetProductCart = async (req, res) => {
  try {
    const idCar = parseInt(req.params.idCar)
    const cartProducts = await GetCartProducts(idCar)
    res.status(200).json(cartProducts)
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`)
  }
}

// DELETE
const DeleteProductsCart = async (req, res) => {
  try {
    const idProduct = parseInt(req.params.idProduct)
    const eliminar = await DropCartProducts(idProduct)
    res.status(200).json(`Response: ${eliminar}`)
  }
  catch (error) {
    res.status(400).json(`Error: ${error.message}`)
  }
}

module.exports = {
  CreateProductCart,
  GetProductCart,
  DeleteProductsCart
}