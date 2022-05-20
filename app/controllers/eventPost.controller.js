const Services = require("../services/eventPost.service");
const apiResponse = require("../../helpers/apiResponse");

module.exports.GetEventPostById = async (req, res, next) => {
  try {
    const eventPost = await Services.GetEventPostById(req, res);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", eventPost);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.GetEventPost = async (req, res, next) => {
  try {
    const eventPost = await Services.GetEventPost(req);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", eventPost);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.GetEventPostByEvent = async (req, res, next) => {
  try {
    const eventPost = await Services.GetEventPostByEvent(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاضافة بنجاح",
      eventPost
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.AddEventPost = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const eventPost = await Services.AddEventPost(req, res);
    return apiResponse.successResponseWithData(res, "تم الاضافة بنجاح", eventPost);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.updateEventPost = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const eventPost = await Services.updateEventPost(req, res);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", eventPost);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.deleteEventPost = async (req, res, next) => {
  try {
    const info = await Services.deleteEventPost(req);
    return apiResponse.successResponse(res, "تم الحذف بنجاح");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
