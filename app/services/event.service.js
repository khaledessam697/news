const validations = require("../validations/event.validation");
const apiResponse = require("../../helpers/apiResponse");
const { GetFileById } = require("../controllers/upload.controller");
const path = require("path");
const db = require("../models");
const Event = db.event;
//database services

exports.GetEvent = async (req) => {
  return await Event.find({})
    .sort("createdAt")
    .populate("cover")
    .select("-__v");
};

exports.GetEventById = async (req, res) => {
    console.log("------------------GetEventById------------------------");
  const id = req.params.id;
  const event = await Event.findById(id).populate("cover").select("-__v");
  if (event) {
    return event;
  } else {
    return apiResponse.notFoundResponse(res, "لم يتم العثور على ذلك العنصر");
  }
};
exports.AddEvent = async (req, res) => {
  const validationResult = await validateAddEvent(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }  if((await GetFileById(res,req.body.cover)).id){
  return await Event.create(req.body).catch((err) => {
    return apiResponse.ErrorResponse(res, err);
  });
}
};

exports.updateEvent = async (req, res) => {
  const id = req.params.id;
  await this.GetEventById(req, res);
  const validationResult = await validateUpdateEvent(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
    if((await GetFileById(res,req.body.cover)).id){

  return await Event.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
    .populate("cover")
    .select("-__v");}
};

exports.deleteEvent = async (req, res) => {
  const id = req.params.id;
  await this.GetEventById(req, res);
  const event = await Event.findByIdAndDelete({
    _id: id,
  });

  if (!event) return apiResponse.ErrorResponse(res, "something went wrong!");

  return event;
};

//end of database services

//#region Joi Validation

const validateAddEvent = async (req) => {
  const error = validations.addInfo.validate(req.body);
  return error;
};

const validateUpdateEvent = async (req) => {
  const error = validations.updateInfo.validate(req.body);
  return error;
};
