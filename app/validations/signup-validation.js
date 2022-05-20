const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const validations = {
  addInfo: Joi.object({
    username: Joi.string().required().min(3).max(20),
    email: Joi.string().email().min(3).max(20).required(),
    password: Joi.string().required().min(6).max(50),
    phoneNumber: Joi.string().required().min(6).max(20),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    roles: Joi.array().items(
      Joi.string().valid("user", "moderator", "admin").required()
    ),
  }),
};
module.exports = validations;
