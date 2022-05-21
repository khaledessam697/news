const validations = require("../validations/eventPost.validation");
const apiResponse = require("../../helpers/apiResponse");
const { GetFileById } = require("../controllers/upload.controller");
const { GetEventById } = require("./event.service");
const {GetEvent}=require('./event.service');
const path = require("path");
const db = require("../models");
const EventPost = db.eventPost;

exports.GetEventPost = async (req) => {
  return await EventPost.find({})
    .sort("createdAt")
    .populate("cover")
    .populate("author")
    .populate("category")
    .select("-__v");
};

exports.GetEventPostById = async (req, res) => {
  const id = req.params.id;
  const eventPost = await EventPost.findById(id)
    .populate("cover")
    .populate("author")
    .populate("category")
    .select("-__v");
  if (eventPost) {
    return eventPost;
  } else {
    return apiResponse.notFoundResponse(res, "لم يتم العثور على ذلك العنصر");
  }
};
exports.AddEventPost = async (req, res) => {
  const validationResult = await validateAddEventPost(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
  req.body.author = req.userId;
  req.params.id = req.body.event;
    if((await GetFileById(res,req.body.cover)).id){

 if((await GetEventById(req, res)).id)
{
  return await EventPost.create(req.body).catch((err) => {
    return apiResponse.ErrorResponse(res, err);
  });
}
}
};
exports.GetEventPostByEvent = async (req, res) => {
  const validationResult = await validateObjectId(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
  const eventId = req.query.eventId;
  if (eventId) {
    let featuredPosts, defaultPosts;
    let result = {};
    featuredPosts = await EventPost.find({ event: eventId, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("cover")
      .populate("author")
      .select("-__v");
    defaultPosts = await EventPost.find({
      event: categoryId    })
      .sort({ createdAt: -1 })
      .populate("cover")
      .populate("author")
      .select("-__v");
    result = { featuredPosts, posts: defaultPosts };
    return result;
  } else {
    let events = await GetEvent(req);
    console.log("events", events);
    let sliderPosts, defaultPosts;
    let result = { sliderPosts: [], posts: [] };
    for (let element of events) {
      sliderPosts = await EventPost.find({
        event: element.id,
        inSlider: true,
      })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate("cover")
        .populate("author")
        .select("-__v");
      defaultPosts = await EventPost.find({
        event: element.id
      })
        .sort({ createdAt: -1 })
        .populate("cover")
        .populate("author")
        .select("-__v");
      result.sliderPosts.push({ name: element.title, sliderPosts });
      result.posts.push({ name: element.title, defaultPosts });
    }
    return result;
  }
};
exports.updateEventPost = async (req, res) => {
  const id = req.params.id;
  await this.GetEventPostById(req, res);
  const validationResult = await validateUpdateEventPost(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
    if((await GetFileById(res,req.body.cover)).id){

  return await EventPost.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
    .populate("cover")
    .select("-__v");}
};

exports.deleteEventPost = async (req, res) => {
  const id = req.params.id;
  await this.GetEventPostById(req, res);
  const eventPost = await EventPost.findByIdAndDelete({
    _id: id,
  });

  if (!eventPost)
    return apiResponse.ErrorResponse(res, "something went wrong!");

  return eventPost;
};

//end of database services

//#region Joi Validation

const validateAddEventPost = async (req) => {
  const error = validations.addInfo.validate(req.body);
  return error;
};

const validateUpdateEventPost = async (req) => {
  const error = validations.updateInfo.validate(req.body);
  return error;
};
const validateObjectId = async (req) => {
  const error = validations.objectId.validate(req.query);
  return error;
};