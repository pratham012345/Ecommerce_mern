const mongoose = require("mongoose");
const { product } = require("../controller/product.controller");
// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = { Cart };
