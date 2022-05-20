const db = require("../models");
const ROLES = db.ROLES;
const Category = db.category;
const apiResponse = require("../../helpers/apiResponse");

checkDuplicateCategory = (req, res, next) => {
  // Username
  Category.findOne({
    name: req.body.name,
  }).exec((err, category) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (category) {
      return apiResponse.ErrorResponse(
        res,
        "Failed! Category is already in exist!"
      );
    }
      next();
    });
  };


const verifyCategory = {
  checkDuplicateCategory,
};

module.exports = verifyCategory;
