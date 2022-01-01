const mongoose = require("mongoose");

const CartItemSchema = mongoose.Schema(
  {
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    cartId: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
);

CartItemSchema.virtual("product", {
  ref: "ProductModel",
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

CartItemSchema.virtual("cart", {
  ref: "CartModel",
  localField: "cartId",
  foreignField: "_id",
  justOne: true,
});

const CartItemModel = mongoose.model(
  "CartItemModel",
  CartItemSchema,
  "cart_details"
);

module.exports = CartItemModel;
