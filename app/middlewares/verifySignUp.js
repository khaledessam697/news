const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const apiResponse = require("../../helpers/apiResponse");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
    if (req.body.username)
{
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      return apiResponse.ErrorResponse(
        res,
        "Failed! Username is already in use!"
      );
    }
  })
}
    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        return apiResponse.ErrorResponse(res, err);
      }

      if (user) {
        return apiResponse.ErrorResponse(
          res,
          "Failed! Email is already in use!"
        );
      }

      next();
    });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return apiResponse.ErrorResponse(
          res,
          `Failed! Role ${req.body.roles[i]} does not exist!`
        );
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
