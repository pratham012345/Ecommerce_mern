const express = require("express");
const router = express.Router();
const {
  product,
  addProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

//Task one see all the product
router.get("/products", product);

//Task two add products
router.post("/add-product", addProduct);
router.get("/product/:id", singleProduct);

//Task update product
router.put("/edit/:id", updateProduct);
router.delete("/del/:id", deleteProduct);

module.exports = router;

