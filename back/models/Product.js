// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  category: String,
  subCategory: String,
  shortDescription: String,
  fullDescription: String,
  image: String,
  mechanism: [String],
  activeIngredients: [String],
  features: [String],
  instructions: [String],
  warnings: [String],
  suitableFor: [String],
});

module.exports = mongoose.model("Product", productSchema);
