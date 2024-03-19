const mercadopago = require('mercadopago');

require("dotenv").config()
const { ACCESTOKEN2 } = process.env;

const CreateOrder = async (req, res) => {
  mercadopago.configure({    
    acces_token: ACCESTOKEN2
  })
  const preference = {
    items:
    [
      {
        title: 'Producto1',
        unit_price: 25000,
        currency_id: 'COP',
        quantity: 1
      }
    ],
    back_urls: {
      success: 'http://localhost:3001/exito',
      failure: 'http://localhost:3001/fallo',
      pending: 'http://localhost:3001/pendiente',
    },
    auto_return: 'approved'
  }
  try {
    const response = await mercadopago.preferences.create(preference);
    console.log(response)
    res.status(200).send(`Hola soy CreateOrder`)
  } catch (error) {
    console.log(error)
    res.status(500).send(`error`)
  }
}

const Succes = async (req, res) => {
  try {
    res.status(200).send(`Hola soy Succes`)
  } catch (error) {
    res.status(500).send(`error`)
  }
}

const Webhook = async (req, res) => {
  try {
    res.status(200).send(`Hola soy Webhook`)
  } catch (error) {
    res.status(500).send(`error`)
  }
}

module.exports = { CreateOrder, Succes, Webhook }