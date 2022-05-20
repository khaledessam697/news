const mongoose = require("mongoose");

const Story = mongoose.model(
  "Story",
  new mongoose.Schema(
    {
      title: String,
      content: String,
      cover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      isFeatured: { type: Boolean, default: false },
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

module.exports = Story;
