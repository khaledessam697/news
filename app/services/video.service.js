const validations = require("../validations/video.validation");
const apiResponse = require("../../helpers/apiResponse");
const { GetFileById } = require("../controllers/upload.controller");
const path = require("path");
const db = require("../models");
const Video = db.video;
//database services

exports.GetVideo = async (req) => {
  return await Video.find({})
    .sort("createdAt")
    .populate("cover")
    .populate("videoUrl")
    .select("-__v");
};

exports.GetVideoById = async (req, res) => {
  const id = req.params.id;
  const video = await Video.findById(id)
    .populate("cover")
    .populate("videoUrl")
    .select("-__v");
  if (video) {
    return video;
  } else {
    return apiResponse.notFoundResponse(res, "لم يتم العثور على ذلك العنصر");
  }
};
exports.AddVideo = async (req, res) => {
  const validationResult = await validateAddVideo(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
    if((await GetFileById(res,req.body.cover)).id){

  return await Video.create(req.body).catch((err) => {
    return apiResponse.ErrorResponse(res, err);
  });
}
};

exports.updateVideo = async (req, res) => {
  const id = req.params.id;
  await this.GetVideoById(req, res);
  const validationResult = await validateUpdateVideo(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
    if((await GetFileById(res,req.body.cover)).id){


  return await Video.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
    .populate("cover")
    .populate("videoUrl")
    .select("-__v");}
};

exports.deleteVideo = async (req, res) => {
  const id = req.params.id;
  await this.GetVideoById(req, res);
  const video = await Video.findByIdAndDelete({
    _id: id,
  });

  if (!video) return apiResponse.ErrorResponse(res, "something went wrong!");

  return video;
};

//end of database services

//#region Joi Validation

const validateAddVideo = async (req) => {
  const error = validations.addInfo.validate(req.body);
  return error;
};

const validateUpdateVideo = async (req) => {
  const error = validations.updateInfo.validate(req.body);
  return error;
};
