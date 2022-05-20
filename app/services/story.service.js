const validations = require("../validations/story.validation");
const apiResponse = require("../../helpers/apiResponse");
const { GetFileById } = require("../controllers/upload.controller");
const path = require("path");
const db = require("../models");
const Story = db.story;
//database services

exports.GetStory = async (req) => {
  let featuredStories, defaultStories;
  let result = {};
  featuredStories = await Story.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("cover")
    .populate("author")
    .select("-__v");
  defaultStories = await Story.find({ isFeatured: false })
    .sort({ createdAt: -1 })
    .populate("cover")
    .populate("author")
    .select("-__v");
  result = { featuredStories, posts: defaultStories };
  return result;
};

exports.GetStoryById = async (req, res) => {
  const id = req.params.id;
  const story = await Story.findById(id).populate("cover").select("-__v");
  if (story) {
    return story;
  } else {
    return apiResponse.notFoundResponse(res, "لم يتم العثور على ذلك العنصر");
  }
};
exports.AddStory = async (req, res) => {
  const validationResult = await validateAddStory(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
  await GetFileById(res, req.body.cover);
  return await Story.create(req.body).catch((err) => {
    return apiResponse.ErrorResponse(res, err);
  });
};

exports.updateStory = async (req, res) => {
  const id = req.params.id;
  await this.GetStoryById(req, res);
  const validationResult = await validateUpdateStory(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
  await GetFileById(res, req.body.cover);

  return await Story.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
    .populate("cover")
    .select("-__v");
};

exports.deleteStory = async (req, res) => {
  const id = req.params.id;
  await this.GetStoryById(req, res);
  const story = await Story.findByIdAndDelete({
    _id: id,
  });

  if (!story) return apiResponse.ErrorResponse(res, "something went wrong!");

  return story;
};

//end of database services

//#region Joi Validation

const validateAddStory = async (req) => {
  const error = validations.addInfo.validate(req.body);
  return error;
};

const validateUpdateStory = async (req) => {
  const error = validations.updateInfo.validate(req.body);
  return error;
};
