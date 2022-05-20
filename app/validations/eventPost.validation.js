const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const validations = {
  addInfo: Joi.object({
    // type: Joi.string().valid('blog'),
    content: Joi.string().required(),
    title: Joi.string().required(),
    cover: Joi.objectId().required(),
    event: Joi.objectId().required(),
    isFeatured: Joi.boolean(),
    inSlider: Joi.boolean(),
  }),
  updateInfo: Joi.object({
    content: Joi.string().required(),
    title: Joi.string().required(),
    cover: Joi.objectId().required(),
    event: Joi.objectId().required(),
    isFeatured: Joi.boolean(),
    inSlider: Joi.boolean(),
  }),
  objectId: Joi.object({
    eventId: Joi.objectId(),
  }),
};
module.exports = validations;