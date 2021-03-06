const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    categoryName: String,
  },
  { versionKey: false }
);

const CategoryModel = mongoose.model(
  "CategoryModel",
  CategorySchema,
  "categories"
);

module.exports = CategoryModel;
