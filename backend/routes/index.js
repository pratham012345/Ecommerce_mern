const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const { product } = require("../controller/product.controller");
const productRoute = require("./product");
const { cart } = require("../controller/cart.controller");
const cartRoute = require("./cart");
const { payment } = require("../controller/cart.controller");
router.use("/user", userRoute);

router.use("/", productRoute);


// router.use("/user", cartRoute);
router.use("/Cart", cartRoute);
router.use("/cartUpdate", cartRoute);
router.use("cartPayment", cartRoute);

module.exports = router;
