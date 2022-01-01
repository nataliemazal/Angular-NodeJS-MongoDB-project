const express = require("express");
const verifyLoggedIn = require("../middlewares/verifyLoggedIn");
const logic = require("../business-logic-layer/order-logic");
const OrderModel = require("../models/order-model");

const router = express.Router();

router.get("/order/:userId", async (request, response) => {
  try {
    const userId = request.params.userId;
    const order = await logic.getOrderByUserId(userId);
    response.json(order);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/fullShippingDates", async (request, response) => {
  try {
    const dates = await logic.getFullShippingDate();
    response.json(dates);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// POST add order: http://localhost:3001/api/orders
router.post("/orders", verifyLoggedIn, async (request, response) => {
  try {
    const order = new OrderModel(request.body);
    const addedOrder = await logic.addOrderAsync(order);
    response.status(201).json(addedOrder);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/totalOrders", async (request, response) => {
  try {
    const totalOrders = await logic.getTotalOrders();
    response.status(201).json(totalOrders);
  } catch {
    response.status(500).send(err.message);
  }
});

module.exports = router;
