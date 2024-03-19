const { CreateCarrito } = require('../controllers/CartUserController');

// POST 
const newCartUserHandler = async (req, res) => {
  try {
    const { idUser } = req.body
    const newCategory = await CreateCarrito(idUser)
    res.status(200).json(newCategory)
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`)
  }
}

module.exports = {
  newCartUserHandler
}
