require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

modelDefiners.forEach((model) => model(sequelize));

//relaciones aqui

const { User, Order, Product } = sequelize.models;

// User.hasMany(Payment);
// Payment.belongsTo(User);

// //

// PurchaseOrder.belongsTo(User);
// User.hasMany(PurchaseOrder);

// PurchaseOrder.belongsToMany(Product, { through: "OrderProduct" });
// Product.belongsToMany(PurchaseOrder, { through: "OrderProduct" });

// Favorite.hasMany(User);
// User.belongsTo(Favorite);

// Product.belongsToMany(Favorite, { through: "ProductFavorite" });
// Favorite.belongsToMany(Product, { through: "ProductFavorite" });

Product.belongsToMany(User, { through: "ProductsUser" });
User.belongsToMany(Product, { through: "ProductsUser" });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
