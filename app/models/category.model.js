const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
    description: String,
    cover: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  })
);

module.exports = Category;
