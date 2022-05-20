const db = require("../models");
const apiResponse = require("../../helpers/apiResponse");
const validations = require("../validations/UploadFile.validation");

verifyFile = (req, res, next) => {
  const validationResult =  validateObjectId(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
    next();
  };
const validateObjectId =  (req) => {
  const error = validations.addInfo.validate(req.query);
  return error;
};
const verifyUploadedFile = {
  verifyFile,
};

module.exports = verifyUploadedFile;
