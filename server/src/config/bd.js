require("dotenv").config();
const { USER, PASSWORD, HOST, PORT, BDD } = process.env;
const { Sequelize } = require("sequelize");

const modelProductos = require("../models/Productos.js");
const modelCategorias = require("../models/Categorias.js");
const modelMarcas = require("../models/Marcas.js");
const modelFabricantes = require("../models/Fabricantes.js");
const modelImagenes = require("../models/Imagenes.js");
const modelUsuarios = require("../models/Usuarios.js");
const modelRoles = require("../models/Roles.js");
const modelPedidos = require("../models/Pedidos.js");
const modelPedidoProducto = require("../models/PedidoProducto.js");
const modelVotos = require("../models/Votos.js");
const modelCartUsers       = require("../models/CartUsers.js")
const modelCartProducts    = require("../models/CartProducts.js")

const sequelize = new Sequelize(
  `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
  {
    logging: false,
    native: false,
  }
);

const ProductosModel = modelProductos(sequelize);
const CategoriasModel = modelCategorias(sequelize);
const MarcasModel = modelMarcas(sequelize);
const FabricantesModel = modelFabricantes(sequelize);
const ImagenesModel = modelImagenes(sequelize);
const UsuariosModel = modelUsuarios(sequelize);
const RolesModel = modelRoles(sequelize);
const PedidosModel = modelPedidos(sequelize);
const PedidoProductoModel = modelPedidoProducto(sequelize);
const VotosModel = modelVotos(sequelize);
modelCartUsers(sequelize)
modelCartProducts(sequelize)

ProductosModel.belongsTo(CategoriasModel, { foreignKey: "idCategoria" });
ProductosModel.belongsTo(MarcasModel, { foreignKey: "idMarca" });
ProductosModel.belongsTo(FabricantesModel, { foreignKey: "idFabricante" });
ProductosModel.hasMany(ImagenesModel, { foreignKey: "idProducto" });
UsuariosModel.belongsTo(RolesModel, { foreignKey: "idRol" });
PedidosModel.belongsTo(UsuariosModel, { foreignKey: "idUsuario" });
PedidosModel.belongsToMany(ProductosModel, { through: PedidoProductoModel });
ProductosModel.belongsToMany(PedidosModel, { through: PedidoProductoModel });
UsuariosModel.hasOne(VotosModel, { foreignKey: "idUsuario" });
ProductosModel.hasMany(VotosModel, { foreignKey: "idProducto" });

(async () => {
  try {
    await sequelize.sync();
    console.log("Base de datos sincronizada correctamente.");
  } catch (error) {
    console.error("Error al sincronizar modelos con la base de datos:", error);
  }
})();

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
};
