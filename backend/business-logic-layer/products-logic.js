require("../data-access-layer/dal");
const path = require("path");
const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");

const fs = require("fs");

// Get all categories
function getAllCategoriesAsync() {
  return CategoryModel.find().exec();
}

// Get all products
function getAllProductsAsync() {
  return ProductModel.find().populate("category").exec();
}

// Get products per category
function getProductsByCategoryAsync(categoryId) {
  // categoryId = "615f117176ba2eb1e7103408"
  return ProductModel.find({ categoryId }).populate("category").exec();
}

// Add product:
async function addProductAsync(product, image) {
  if (!image) {
    product.image = "";
    const addedProduct = product.save();
    return addedProduct;
  }
  if (image) {
    const productToadd = product;
    const extension = image.name.substr(image.name.lastIndexOf("."));

    const fileName = `${productToadd._id}${extension}`;

    product.image = fileName;
    const absolutePath = path.join(__dirname, "..", "images", fileName);

    await image.mv(absolutePath);

    const addedProduct = product.save();
    return addedProduct;
  }
}

async function editProductAsync(product, image) {
  const updatedProduct = await ProductModel.updateOne(
    { _id: product._id },
    product
  ).exec();

  if (image) {
    const extension = image.name.substr(image.name.lastIndexOf("."));

    const fileName = `${product._id}${extension}`;

    product.image = fileName;
    const absolutePath = path.join(__dirname, "..", "images", fileName);

    await image.mv(absolutePath);
    await ProductModel.updateOne(
      { _id: product._id },
      { image: product.image }
    ).exec();
  }
  return updatedProduct;
}

// Delete product:
function deleteProductAsync(_id) {
  return ProductModel.deleteOne({ _id }).exec();
}

module.exports = {
  getAllCategoriesAsync,
  getAllProductsAsync,
  getProductsByCategoryAsync,
  addProductAsync,
  editProductAsync,
  deleteProductAsync,
};
