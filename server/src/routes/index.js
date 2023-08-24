const { Router } = require("express");

const routerProduct = require("./routerProduct");
const routerUser = require("./routerUser");
const routerPayment = require("./routerPayment");
const routerWishList = require("./routerWishList");
const routerOrders = require("./routerOrder");
const routerAdmin = require("./routerAdmin");

const router = Router();

router.use("/products", routerProduct);
router.use("/user", routerUser);
router.use("/payment", routerPayment);
router.use("/favorite", routerWishList);
router.use("/order", routerOrders);
router.use("/admin", routerAdmin);

module.exports = router;
