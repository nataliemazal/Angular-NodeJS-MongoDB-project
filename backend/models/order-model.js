const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    cartId: mongoose.Schema.Types.ObjectId,
    totalPrice: Number,
    shippingDate: Date,
    orderDate: Date,
    city: String,
    street: String,
    creditCard: Number,
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
);

OrderSchema.virtual("userDetails", {
  ref: "UserModel",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;
