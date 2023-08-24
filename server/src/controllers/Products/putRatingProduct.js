const db = require("../../db");

const ratingProduct = async (id, rating) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  if (product.dataValues.rating.length >= 50) {
    product.rating.shift();
  }

  await product.update({
    ...product,
    rating: [...product.rating, rating],
  });

  return product;
};

module.exports = ratingProduct;
