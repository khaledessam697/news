const Services = require("../services/event.service");
const apiResponse = require("../../helpers/apiResponse");

module.exports.GetEventById = async (req, res, next) => {
  try {
    const event = await Services.GetEventById(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      event
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.GetEvent = async (req, res, next) => {
  try {
    const info = await Services.GetEvent(req);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", info);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.AddEvent = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const event = await Services.AddEvent(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاضافة بنجاح",
      event
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.updateEvent = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const event = await Services.updateEvent(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      event
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.deleteEvent = async (req, res, next) => {
  try {
    const info = await Services.deleteEvent(req);
    return apiResponse.successResponse(res, "تم الحذف بنجاح");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
