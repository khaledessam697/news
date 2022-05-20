const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const validations = {
  addInfo: Joi.object({
    // type: Joi.string().valid('blog'),
    title: Joi.string().required(),
    content: Joi.string().required(),
    cover: Joi.objectId().required(),
    isFeatured:Joi.boolean().required()
  }),
  updateInfo: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    cover: Joi.objectId().required(),
    isFeatured:Joi.boolean().required()
  }),
};

module.exports = validations;