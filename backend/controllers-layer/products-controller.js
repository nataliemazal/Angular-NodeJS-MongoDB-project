const fs = require("fs");
const path = require("path");
const express = require("express");
const logic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/product-model");
const router = express.Router();

// Get all categories: http://localhost:3001/api/categories
router.get("/categories", async (request, response) => {
  try {
    const categories = await logic.getAllCategoriesAsync();
    response.json(categories);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Get all products: http://localhost:3001/api/products
router.get("/products", async (request, response) => {
  try {
    const products = await logic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// Get all products: http://localhost:3001/api/products/by-category/<some-category-id>
router.get("/productsByCategory/:categoryId", async (request, response) => {
  try {
    const categoryId = request.params.categoryId;
    const products = await logic.getProductsByCategoryAsync(categoryId);
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// POST add product: http://localhost:3001/api/products
router.post("/products", async (request, response) => {
  try {
    const product = new ProductModel(request.body);
    const image =
      request.files && request.files.imageFile ? request.files.imageFile : null;
    const addedProduct = await logic.addProductAsync(product, image);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.put("/products/:id", async (request, response) => {
  try {
    const product = request.body;

    product._id = request.params.id;
    const image =
      request.files && request.files.imageFile ? request.files.imageFile : null;

    const updatedProduct = await logic.editProductAsync(product, image);
    response.json(updatedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// DELETE delete product: http://localhost:3001/api/products/<some-product-id>
router.delete("/products/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    await logic.deleteProductAsync(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/images/:name", (request, response) => {
  try {
    const name = request.params.name;
    let absolutePath = path.join(__dirname, "..", "images", `${name}`);
    if (!fs.existsSync(absolutePath)) {
      absolutePath = path.join(__dirname, "..", "images", "not-found.png");
    }
    response.sendFile(absolutePath);
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
