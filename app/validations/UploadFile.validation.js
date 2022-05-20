const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const validations = {
  addInfo: Joi.object({
    type:
      Joi.string().valid("video", "image").required()
  }),
};
module.exports = validations;
