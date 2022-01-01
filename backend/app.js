global.config = require(process.env.NODE_ENV === "production"
  ? "./config-prod.json"
  : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const productController = require("./controllers-layer/products-controller");
const CartController = require("./controllers-layer/cart-controller");
const OrderController = require("./controllers-layer/order-controller");
const AuthController = require("./controllers-layer/auth-controller");

const server = express();
server.use(fileUpload());
server.use(cors());
server.use(express.json());

server.use("/api", productController);
server.use("/api", CartController);
server.use("/api", OrderController);
server.use("/api", AuthController);

server.listen(3001, () =>
  console.log("App is running and listening on port 3001")
);
