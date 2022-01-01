const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productName: String,
    categoryId: mongoose.Schema.Types.ObjectId,
    price: Number,
    image: String,
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false }
);

ProductSchema.virtual("category", {
  ref: "CategoryModel",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;
