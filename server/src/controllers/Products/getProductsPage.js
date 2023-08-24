const db = require("../../db");

const getProductsPage = async (page) => {
  const allProducts = await db.Product.findAll();

  const lastProduct = page * 10;
  const firstProduct = lastProduct - 10;
  const currentProducts = allProducts.slice(firstProduct, lastProduct);

  return currentProducts;
};

module.exports = getProductsPage;
