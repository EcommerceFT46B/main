const { CartProducts } = require('../config/bd')

const CreateCartProduct = async (idCar, idUser, idProduct, cantidad, monto, estado) => {
  try {
    let existingProduct = await CartProducts.findOne({where: {idProduct}})
    if(!existingProduct){
      const newCarProduct = await CartProducts.create({
        idCar,
        idUser,
        idProduct,
        cantidad,
        monto,
        estado
      })
      return newCarProduct
    }
    else{
      // Si el producto ya está en el carrito, sumar la cantidad
      existingProduct.cantidad = cantidad
      await existingProduct.save()
      return existingProduct
    }
  } catch (error) {
    return error.message
  }
}

const GetCartProducts = async (idCar) => {
  try {
    const listCartProducts = await CartProducts.findAll({ where: { idCar: idCar } })
    return listCartProducts
  } catch (error) {
    return error.message
  }
}

const DropCartProducts = async (idProduct) => {
  try{
    const deleteCartProducts = await CartProducts.destroy({
      where: {
        idProduct: idProduct
      }
    })
    return deleteCartProducts
  }
  catch(error){
    return error.message
  }
}

module.exports = {
  CreateCartProduct,
  GetCartProducts,
  DropCartProducts
}
