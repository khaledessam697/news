const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      tile: String,
      content: String,
      cover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      isFeatured: { type: Boolean, default: false },
      isStrory: { type: Boolean, default: false },
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

module.exports = Post;
