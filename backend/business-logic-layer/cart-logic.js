require("../data-access-layer/dal");
const CartItemModel = require("../models/cartItem-model");
const CartModel = require("../models/cart-model");

// Get products(cartDetail)  - by cartId
function getProductsByCartAsync(cartId) {
  return CartItemModel.find({ cartId }).populate(["cart", "product"]).exec();
}

function getCartByUserId(userId) {
  return CartModel.find({ userId }).exec();
}

// Open cart:
function addCartAsync(cart) {
  cart.date = Date();
  return cart.save();
}

function addProductToCartAsync(product) {
  return product.save();
}

// Delete product from cart:
function deleteProductAsync(_id) {
  return CartItemModel.deleteOne({ _id }).exec();
}

function deleteAllProductsFromCartAsync(_id) {
  return CartItemModel.deleteMany({ cartId: _id }).exec();
}

module.exports = {
  addProductToCartAsync,
  getProductsByCartAsync,
  addCartAsync,
  deleteProductAsync,
  getCartByUserId,
  deleteAllProductsFromCartAsync,
};
