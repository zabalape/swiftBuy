const db = require("../../db.js");
const { uploadImgProduct } = require("../../utils/cloudinary.js");

const generateRandomSKU = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let sku = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters.charAt(randomIndex);
  }

  return sku;
};

const createProduct = async (data, filePath) => {
  const product = {
    ...data,
    id: data.SKU ? data.SKU : generateRandomSKU(),
  };
  const newProduct = await db.Product.create(product);

  const result = await uploadImgProduct(filePath);
  newProduct.image_public_id = result.public_id;
  newProduct.image_secure_url = result.secure_url;
  await newProduct.save();
  return newProduct;
};

module.exports = createProduct;
