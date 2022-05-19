const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const validations = {
  addInfo: Joi.object({
    // type: Joi.string().valid('blog'),
    name: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.objectId().required(),
  }),
  updateInfo: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.objectId().required(),
  }),
};

module.exports = validations;
