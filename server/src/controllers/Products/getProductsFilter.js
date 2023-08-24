const db = require("../../db");

const getFilteredProducts = async (category, min, max, order, genre) => {
  let products = await db.Product.findAll();

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (min && max) {
    products = products.filter(
      (product) => product.price >= min && product.price <= max
    );
  }

  if (order) {
    if (order === "A-Z") {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "Z-A") {
      products.sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === "date") {
      products.sort((a, b) => a.createdAt - b.createdAt);
    }
  }

  if (genre) {
    products = products.filter((product) => product.genre === genre);
  }
  return products;
};

module.exports = getFilteredProducts;
