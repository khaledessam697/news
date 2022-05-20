const Services = require("../services/story.service");
const apiResponse = require("../../helpers/apiResponse");

module.exports.GetStoryById = async (req, res, next) => {
  try {
    const story = await Services.GetStoryById(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      story
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.GetStory = async (req, res, next) => {
  try {
    const info = await Services.GetStory(req);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", info);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.AddStory = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const story = await Services.AddStory(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاضافة بنجاح",
      story
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.updateStory = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const story = await Services.updateStory(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      story
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.deleteStory = async (req, res, next) => {
  try {
    const info = await Services.deleteStory(req);
    return apiResponse.successResponse(res, "تم الحذف بنجاح");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
