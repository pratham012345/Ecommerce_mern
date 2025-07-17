const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Product } = require("../model/Product");
const { User } = require("../model/user1");

const product = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      message: "All products",
      products: products,
    });
  } catch {
    console.log("error");
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    let { name, price, image, description, brand, stock } = req.body;
    let { token } = req.headers;
    let decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email });
    const product = await Product.create({
      name,
      price,
      image,
      description,
      stock,
      brand,
      user: user.__id,
    });

    return res.status(200).json({
      message: "Product created successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "response not found",
      });
    }
    let { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email });
    if (user) {
      const product = await Product.findById(id);

      if (!product) {
        res.status(400).json({
          message: "product not there",
        });
      }
    }
    return res.status(200).json({
      message: "Product find successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let { name, price, image, description, stock, brand } = req.body;
    let { token } = req.headers;
    let decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email });

    if (user) {
      const productUpdated = await Product.findByIdAndUpdate(id, {
        name,
        price,
        brand,
        description,
        image,
        stock,
      });
      return res.status(200).json({
        message: "Product Updated Successfully",
        product: { name, price, brand, description, image, stock },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let { id } = req.params;
    let { token } = req.headers;
    let decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email });
    if (user) {
      const productDelete = await Product.findByIdAndDelete(id);

      res.status(200).json({
        message: "Product deleted successfully",
        product: productDelete,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  product,
  addProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
};
