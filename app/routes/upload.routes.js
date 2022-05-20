const apiResponse = require("../../helpers/apiResponse");
const upload = require("../../helpers/upload");
const multer = require("multer");
const { verifyFile } = require("../middlewares");

const {uploadAttachment}=require("../controllers/upload.controller")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/upload",[verifyFile.verifyFile,
    (req, res, next) => {
      upload.any()(req, res, function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
          // Everything went fine.
        }
        next();
      });
    }],
    uploadAttachment
  )};
