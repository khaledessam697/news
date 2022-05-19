const mongoose = require("mongoose");

const File = mongoose.model(
  "File",
  new mongoose.Schema({
    originalname: String,
    mimetype: String,
    path: String,
    size: Number,
    originalname: String,
    fileType: String,
    fullPath: String,
  })
);

module.exports = File;
