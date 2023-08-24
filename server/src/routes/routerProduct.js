const { Router } = require("express");
const fs = require("fs-extra");

const createProduct = require("../controllers/Products/createProduct");
const getProductById = require("../controllers/Products/getProductById");
const getProducts = require("../controllers/Products/getProducts");
const getProductsPage = require("../controllers/Products/getProductsPage");
const putProduct = require("../controllers/Products/putProduct");
const putRatingProduct = require("../controllers/Products/putRatingProduct");
const getFilteredProductsHandler = require("../controllers/Products/getProductsFilter");
const deleteProduct = require("../controllers/Products/delProductById");


function calculateAverageRating(ratingArray) {
  console.log(ratingArray);
  const validRatings = ratingArray.filter(rating => typeof rating === 'number' && !isNaN(rating));
  const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
  return validRatings.length > 0 ? totalRating / validRatings.length : 0;
}

const router = Router();

router.get("/filters", async (req, res) => {
  try {
    const { category, min, max, order, genre } = req.query;
    
    let products = await getFilteredProductsHandler(
      category,
      min,
      max,
      order,
      genre
    );
    if (products.length === 0) {
      res
        .status(400)
        .json({ mensaje: "There are no products matching the filters" });
    } else {
      // Calcula el promedio de calificaciones y asigna a cada producto
      products = products.map(product => {
        const averageRating = calculateAverageRating(product.rating);
        product.averageRating = parseFloat(averageRating.toFixed(2));
        return product;
      });

      res.status(200).json(products);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An expected error has ocurred" });
  }
});

/**----            Traer productos             ----**/
router.get("/", async (req, res) => {
  try {
    const { name, page } = req.query;

    if (page) {
      const products = await getProductsPage(page);
      return res.json(products);
    }
    let products = name ? await getProducts(name) : await getProducts();

    products = products.map(product => {
      const averageRating = calculateAverageRating(product.rating);
      product.averageRating = parseFloat(averageRating.toFixed(2));
      return product;
    });

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let product = await getProductById(id);

    console.log(product);

    // const averageRating = calculateAverageRating(product.rating);
    // product.averageRating = parseFloat(averageRating.toFixed(2));

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/**----            Crear producto               ----**/

router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const filePath = data.image ?? req.files.image.tempFilePath;
    const newProduct = await createProduct(data, filePath);

    if (!data.image) {
      await fs.unlink(filePath);
    }
    const averageRating = calculateAverageRating(newProduct.rating);
    newProduct.averageRating = parseFloat(averageRating.toFixed(2));

    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/**----               Modificar usuario          ----**/
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const fileUrl = data.image ?? "";

    const filePath = req.files ? req.files.image.tempFilePath : "";

    const product = await putProduct(id, data, fileUrl, filePath);

    if (filePath) {
      await fs.unlink(filePath);
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

/**----                   Rating                  ----**/

router.put("/rating/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const product = await putRatingProduct(id, rating);
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).json({ message: "Product successfully removed" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Error deleting product" });
  }
});

module.exports = router;
