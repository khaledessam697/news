const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const validations = {
  addInfo: Joi.object({
    // type: Joi.string().valid('blog'),
    content: Joi.string().required(),
    tile: Joi.string().required(),
    cover: Joi.objectId().required(),
    category: Joi.objectId().required(),
    isFeatured: Joi.boolean(),
    isStrory: Joi.boolean(),
  }),
  updateInfo: Joi.object({
    content: Joi.string().required(),
    tile: Joi.string().required(),
    cover: Joi.objectId().required(),
    category: Joi.objectId().required(),
    isFeatured: Joi.boolean(),
    isStrory: Joi.boolean(),
  }),
};
module.exports = validations;
