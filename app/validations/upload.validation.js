const Joi = require("joi");

const validations = {
  type: Joi.string().valid("video", "image").required(),
};

module.exports = validations;
