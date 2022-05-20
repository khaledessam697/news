const mongoose = require("mongoose");

const EventPost = mongoose.model(
  "EventPost",
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
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
      isFeatured: { type: Boolean, default: false },
      inSlider: { type: Boolean, default: false },
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

module.exports = EventPost;
