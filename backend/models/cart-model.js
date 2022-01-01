const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    date: Date,
  },
  { versionKey: false }
);

const CartModel = mongoose.model("CartModel", CartSchema, "cart");

module.exports = CartModel;
