const Services = require("../services/video.service");
const apiResponse = require("../../helpers/apiResponse");

module.exports.GetVideoById = async (req, res, next) => {
  try {
    const video = await Services.GetVideoById(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      video
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.GetVideo = async (req, res, next) => {
  try {
    const info = await Services.GetVideo(req);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", info);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.AddVideo = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const video = await Services.AddVideo(req, res);
    return apiResponse.successResponseWithData(res, "تم الاضافة بنجاح", video);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.updateVideo = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const video = await Services.updateVideo(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      video
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.deleteVideo = async (req, res, next) => {
  try {
    const info = await Services.deleteVideo(req);
    return apiResponse.successResponse(res, "تم الحذف بنجاح");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
