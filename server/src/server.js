const express = require("express");
const morgan = require("morgan");
const server = express();
const routes = require("./routes/index.js");
const cloudinary = require("cloudinary").v2;

require("./config/bd.js");

// Configurar Cloudinary con las credenciales de tu archivo de configuración
const config = require("../config.js");
cloudinary.config(config.cloudinary);
const fileUpload = require("express-fileupload");
server.use(fileUpload());

//MIDDLEWARE
server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

//ROUTES
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
