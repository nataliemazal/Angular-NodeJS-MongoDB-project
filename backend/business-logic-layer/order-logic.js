require("../data-access-layer/dal");
const OrderModel = require("../models/order-model");

function getOrderByUserId(userId) {
  return OrderModel.find({ userId }).populate("userDetails").exec();
}

function addOrderAsync(order) {
  order.orderDate = Date();
  return order.save();
}

function getTotalOrders() {
  return OrderModel.countDocuments().exec();
}

function getFullShippingDate() {
  return OrderModel.find().select("shippingDate");
}

module.exports = {
  getOrderByUserId,
  addOrderAsync,
  getTotalOrders,
  getFullShippingDate,
};
