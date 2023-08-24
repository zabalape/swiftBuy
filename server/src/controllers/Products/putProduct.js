const db = require("../../db");
const { deleteImg, uploadImgProduct } = require("../../utils/cloudinary");

const putProduct = async (id, data, fileUrl, filePath) => {
  const product = await db.Product.findByPk(id);

  if (!product) throw new Error("Product not found");

  let updateProduct = { ...data };

  if (filePath || fileUrl) {
    // await deleteImg(product.image_public_id);
    const result = filePath
      ? await uploadImgProduct(filePath)
      : await uploadImgProduct(fileUrl);
    updateProduct = {
      ...updateProduct,
      price: Number(updateProduct.price),
      image_public_id: result.public_id,
      image_secure_url: result.secure_url,
    };
  }

  await product.update(updateProduct);

  return product;
};

module.exports = putProduct;
