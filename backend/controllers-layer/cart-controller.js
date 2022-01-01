const express = require("express");
const verifyLoggedIn = require("../middlewares/verifyLoggedIn");

const logic = require("../business-logic-layer/cart-logic");
const CartModel = require("../models/cart-model");
const CartItemModel = require("../models/cartItem-model");

const router = express.Router();

router.get("/cart/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const cart = await logic.getCartByUserId(userId);
    response.json(cart);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Get all products: http://localhost:3001/api/cartItems/<some-cart-id>
router.get("/cartItems/:cartId", async (request, response) => {
  try {
    const cartId = request.params.cartId;
    const products = await logic.getProductsByCartAsync(cartId);
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// POST add cart: http://localhost:3001/api/carts
router.post("/carts", verifyLoggedIn, async (request, response) => {
  try {
    const cart = new CartModel(request.body);
    const addedCart = await logic.addCartAsync(cart);

    response.status(201).json(addedCart._id);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// POST add product to cart: http://localhost:3001/api/addToCart
router.post("/addToCart", verifyLoggedIn, async (request, response) => {
  try {
    const product = new CartItemModel(request.body);
    const addedProduct = await logic.addProductToCartAsync(product);

    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// DELETE delete one product from cart: http://localhost:3001/api/cartItem/<product id>
router.delete("/cartItem/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    await logic.deleteProductAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// DELETE delete all products from cart: http://localhost:3001/api/cart/<cart id>

router.delete("/cart/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    await logic.deleteAllProductsFromCartAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
