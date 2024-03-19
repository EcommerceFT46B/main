const { Router } = require('express')

require("dotenv").config()
const rutaMercadoPago = Router()

const { CreateOrder, Succes, Webhook }  = require('../MercadoPago/Payments')

rutaMercadoPago.get('/CreateOrder' , CreateOrder)
rutaMercadoPago.get('/Succes' , Succes)
rutaMercadoPago.get('/WebHook' , Webhook)

module.exports = rutaMercadoPago
