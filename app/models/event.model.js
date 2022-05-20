const mongoose = require("mongoose");

const Event = mongoose.model(
  "Event",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      content: String,
      cover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
     coverAbout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      coverOurVision: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      coverGoals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
      about: String,
      ourVision: String,
      goals:String
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

module.exports = Event;
