const jwt = require("jsonwebtoken");
const { Cart } = require("../model/Cart");
const { User } = require("../model/user1");
const { Product } = require("../model/Product");
const { token } = require("morgan");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { product } = require("./product.controller");
const { model } = require("mongoose");
const sendEmail = require("../utils/userEmail");

const viewCart = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: {
        path: "products",
        model: "Product",
      },
    });
    if (!user) {
      res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Cart created",
      cart: user.cart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};
const addCart = async (req, res) => {
  try {
    const { token } = req.headers;
    let { productID, quantity } = req.body;
    const decodedToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodedToken.email });

    if (!productID || !quantity) {
      res.status(400).json({
        message: "some fields are missing",
      });
    }

    if (user) {
      const product = await Product.findById(productID);
      const userCart = await Cart.findById(user.cart);
      if (userCart) {
        const exists = userCart.products.some(
          (p) =>
            (typeof p.product === "object"
              ? p.product._id.toString()
              : p.product.toString()) === productID.toString()
        );
        if (exists) {
          return res.status(400).json({
            message: "Go to cart",
          });
        }
        userCart.products.push({ product: productID, quantity });
        userCart.total += product.price * quantity;

        await userCart.save();
      } else {
        const newCart = await Cart.create({
          products: [
            {
              product: productID,
              quantity: quantity,
            },
          ],
        });
        user.cart = newCart._id;
        await user.save();
      }
      res.status(200).json({
        message: "product added to cart",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productID, action } = req.body;
    const { token } = req.headers;

    const decodedToken = jwt.verify(token, "supersecret");

    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });
    if (!user || !user.cart) {
      return res.status(400).json({
        message: "cart not found",
      });
    }
    const cart1 = user.cart;
    const item = cart1.products.find(
      (p) => p.product._id.toString() === productID
    );
    if (!item) {
      return res.status(400).json({
        message: "Product not found",
      });
    }
    const totalPrice = item.product.price;

    //action logic

    if (action === "increase") {
      item.quantity += 1;
      cart1.total += totalPrice;
    } else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
        cart1.total -= totalPrice;
      } else {
        cart1.total -= totalPrice;
        cart1.products = cart1.products.filter(
          (p) => p.product._id.toString() !== productID
        );
      }
    } else if (action === "remove") {
      cart1.total -= totalPrice * item.quantity;
      cart1.products = cart1.products.filter(
        (p) => p.product._id.toString() !== productID
      );
    } else {
      return res.status(400).json({
        message: "Invalid action",
      });
    }
    await cart1.save();
    return res.status(200).json({
      message: "cart updated",
      cart: cart1,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

const payment = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });

    if (!user || !user.cart || user.cart.products.length === 0) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const lineItems = user.cart.products.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
        },
        unit_amount: item.product.price * 100, // Stripe takes amount in paisa
      },
      quantity: item.quantity,
    }));

    const currentUrl = process.env.CLIENT_URL;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${currentUrl}/success`,
      cancel_url: `${currentUrl}/cancel`,
    });

    //Send email to user
    await sendEmail(
      user.email,
      user.cart.products.map((item) => ({
        name: item.product.name,
        price: item.product.price,
      }))
    );

    // Empty cart
    user.cart.products = [];
    user.cart.total = 0;
    await user.cart.save();
    await user.save();

    res.status(200).json({
      message: "Get the payment URL",
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};
module.exports = { viewCart, addCart, updateCart, payment };
