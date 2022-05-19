const validations = require("../validations/category.validations");
const apiResponse = require("../../helpers/apiResponse");
const {GetFileById}=require('../controllers/upload.controller')
const path = require("path");
const db = require("../models");
const Category = db.category;
//database services


exports.GetCategory = async (req) => {
  return await Category.find({})
    .sort("createdAt")
    .populate("cover").select("-__v");
};

exports.GetCategoryById = async (req,res) => {
  const id = req.params.id;
  const category = await Category.findById(id).populate("cover").select("-__v");
  if(category )
  {
    return category;
  }
  else{console.log("5555555555555555555");
         return apiResponse.notFoundResponse(res, "لم يتم العثور على ذلك العنصر");
  }
};
exports.AddCategory = async (req,res) => {
  const validationResult = await validateAddCategory(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
     return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
  await GetFileById(res,req.body.cover);
  return await Category.create(req.body).catch(err=>{
         return apiResponse.ErrorResponse(res,err);

  });
};

/*{
  coverPhoto :file[0], 
  category,
  title,
  content,

}
}*/
exports.updateCategory = async (req,res) => {
  const id = req.params.id;
  await this.GetCategoryById(req,res);
  const validationResult = await validateUpdateCategory(req);
  console.log(validationResult);
  if (validationResult.error) {
    console.log(validationResult.error);
    return apiResponse.ErrorResponse(res, validationResult.error.message);
  }
    await GetFileById(res,req.body.cover);

 return await Category.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
   .populate("cover")
   .select("-__v");;
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
    await this.GetCategoryById(req, res);
  const category = await Category.findByIdAndDelete({
    _id: id,
  });

  if (!category) return apiResponse.ErrorResponse(res, "something went wrong!");

  return category;
};

//end of database services

//#region Joi Validation

const validateAddCategory = async (req) => {
  const error = validations.addInfo.validate(req.body);
  return error;
};

const validateUpdateCategory = async (req) => {
  const error = validations.updateInfo.validate(req.body);
  return error;
};