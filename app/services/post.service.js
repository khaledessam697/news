const validations = require("../validations/post.validation");
const apiResponse = require("../../helpers/apiResponse");
const { GetFileById } = require("../controllers/upload.controller");
const { GetCategoryById,GetCategoriesName } = require("./category.service");

const path = require("path");
const db = require("../models");
const Post = db.post;

exports.GetPost = async (req) => {
  return await Post.find({})
    .sort("createdAt")
    .populate("cover")
    .populate("author")
    .populate("category")
    .select("-__v");
};

exports.GetPostById = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id)
    .populate("cover")
    .populate("author")
    .populate("category")
    .select("-__v");
  if (post) {
    return post;
  } else {
    return apiResponse.notFoundResponse(res, "لم يتم العثور على ذلك العنصر");
  }
};

exports.GetPostsByCategory = async (req, res) => {
  const validationResult = await validateObjectId(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
    }  const categoryId = req.query.categoryId;
  if(categoryId){
    let featuredPosts, defaultPosts;
    let result = {};
    featuredPosts = await Post.find({ category: categoryId, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("cover")
      .populate("author")
      .populate("category")
      .select("-__v");
    defaultPosts = await Post.find({ category: categoryId })
      .sort({ createdAt: -1 })
      .populate("cover")
      .populate("author")
      .populate("category")
      .select("-__v");
    result={featuredPosts,posts:defaultPosts}
    return result;
  }
  else{
 let categories=await GetCategoriesName();
 let sliderPosts,defaultPosts;
 let result ={sliderPosts:[],posts:[]};
 //categories.forEach(async(element,counter)=>{
   for (let element of categories){
     sliderPosts = await Post.find({ category: element.id, inSlider: true })
       .sort({ createdAt: -1 })
       .limit(3)
       .populate("cover")
       .populate("author")
       .populate("category")
       .select("-__v");
    defaultPosts = await Post.find({category:element.id }).sort({ createdAt: -1 })
    .populate("cover")
    .populate("author")
    .populate("category")
    .select("-__v");
    result.sliderPosts.push.apply(result.sliderPosts, sliderPosts);
    result.posts.push.apply(result.posts, defaultPosts);
 };
     return result;
  }
};

exports.AddPost = async (req, res) => {
  const validationResult = await validateAddPost(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
  if (req.body.category) {
    req.params.id = req.body.category;
    await GetCategoryById(req, res);
  }
  req.body.author = req.userId;
    if((await GetFileById(res,req.body.cover)).id){
  return await Post.create(req.body).catch((err) => {
    return apiResponse.ErrorResponse(res, err);
  });}
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  await this.GetPostById(req, res);
  const validationResult = await validateUpdatePost(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
    if((await GetFileById(res,req.body.cover)).id){

    
  return await Post.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  )
    .populate("cover")
    .select("-__v");}
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  await this.GetPostById(req, res);
  const post = await Post.findByIdAndDelete({
    _id: id,
  });

  if (!post) return apiResponse.ErrorResponse(res, "something went wrong!");

  return post;
};

//end of database services

//#region Joi Validation

const validateAddPost = async (req) => {
  const error = validations.addInfo.validate(req.body);
  return error;
};

const validateUpdatePost = async (req) => {
  const error = validations.updateInfo.validate(req.body);
  return error;
};

const validateObjectId = async (req) => {
  const error = validations.objectId.validate(req.query);
  return error;
};