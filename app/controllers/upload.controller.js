const apiResponse = require("../../helpers/apiResponse");
const path = require("path");
const db = require("../models");
const File = db.file;
module.exports.uploadAttachment = (req, res, next) => {
  try {
    if (!req.files.length) {
      throw "no file is found";
    }
    console.log(req.files);
    const file = new File({
      originalname: req.files[0].originalname,
      mimetype: req.files[0].mimetype,
      path: req.files[0].path,
      size: req.files[0].size,
      originalname: req.files[0].originalname,
      fileType: req.query.type,
      fullPath:  req.files[0].location,
    });

    file.save((err, file) => {
      if (err) {
        throw err;
      }
    });
    return apiResponse.successResponseWithData(
      res,
      "uploaded success",
      //path.join(process.env.ABSOLUTE_PATH, req.files[0].filename)
      file
    );
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err);
  }
};


module.exports.GetFileById = async (res,id) => {
  console.log("------------------GetFileById------------------------");
  const file = await File.findById(id).select("-__v");
  console.log(file);
  if (file) {
    return file;
  } else {
    return apiResponse.notFoundResponse(res, "لم يتم العثور على ذلك الملف");
  }
};