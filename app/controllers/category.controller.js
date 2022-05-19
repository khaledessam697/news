const Services = require("../services/category.service");
const apiResponse = require("../../helpers/apiResponse");

module.exports.GetCategoryById = async (req, res, next) => {
  try {
    const category = await Services.GetCategoryById(req,res);
        return apiResponse.successResponseWithData(
          res,
          "تم الاسترجاع بنجاح",
          category
        );

  } catch (err) {
    next(err);
    console.log(err);
  }
};
module.exports.GetCategory = async (req, res, next) => {
  try {
    const info = await Services.GetCategory(req);
        return apiResponse.successResponseWithData(
          res,
          "تم الاسترجاع بنجاح",
          info
        );

  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.AddCategory = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
   const category= await Services.AddCategory(req,res);
    return apiResponse.successResponseWithData(res, "تم الاضافة بنجاح", category);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  try {
    //await Services.validatePageInfo(req);
    const category = await Services.updateCategory(req,res);
    return apiResponse.successResponseWithData(
      res,
      "تم الاسترجاع بنجاح",
      category
    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  try {
    const info = await Services.deleteCategory(req);
    return apiResponse.successResponse(
      res,
      "تم الحذف بنجاح"    );
  } catch (err) {
    next(err);
    console.log(err);
  }
};
