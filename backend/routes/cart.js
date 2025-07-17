const express = require("express");
const router = express.Router();
const {
  viewCart,
  addCart,
  updateCart,
  payment,
} = require("../controller/cart.controller");
//route to get cart
router.get("/userCart", viewCart);
router.post("/add-Cart", addCart);
router.put("/edit", updateCart);
router.post("/payment", payment);

module.exports = router;
