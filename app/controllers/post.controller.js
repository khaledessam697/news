const Services = require("../services/post.service");
const apiResponse = require("../../helpers/apiResponse");

module.exports.GetPostById = async (req, res, next) => {
  try {
    const post = await Services.GetPostById(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      post
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.GetPost = async (req, res, next) => {
  try {
    const post = await Services.GetPost(req);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", post);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.GetPostsByCategory = async (req, res, next) => {
  try {console.log("5555555555555555555555555555555");
    const post = await Services.GetPostsByCategory(req,res);
    return apiResponse.successResponseWithData(res, "تم الاسترجاع بنجاح", post);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.AddPost = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const post = await Services.AddPost(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاضافة بنجاح",
      post
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const post = await Services.updatePost(req, res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      post
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const info = await Services.deletePost(req);
    return apiResponse.successResponse(res, "تم الحذف بنجاح");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
