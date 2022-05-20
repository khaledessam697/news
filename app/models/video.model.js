const mongoose = require("mongoose");

const Video = mongoose.model(
  "Video",
  new mongoose.Schema(
    {
      title: String,
      content: String,
      cover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      videoUrl: {
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

module.exports = Video;
