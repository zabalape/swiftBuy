const { Router } = require("express");

const getOrder = require("../controllers/Orders/getOrders");

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getOrder(id);
    res.json(order);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { idBuyer, idProducts } = req.body;

//     const newOrder = await createOrder(idBuyer, idProducts);
//     res.json(newOrder);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
