const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      cover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    },
    {
      timestamps: true,
      toObject: {
        virtuals: true,
      },
      toJSON: {
        virtuals: true,
      },
    }
  )
);

module.exports = Category;
