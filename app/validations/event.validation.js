const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const validations = {
  addInfo: Joi.object({
    title: Joi.string().required().min(3).max(20),
    description: Joi.string().required().min(3).max(400),
    content: Joi.string().required().min(6),
    cover: Joi.objectId().required(),
    about: Joi.string().min(6),
    ourVision: Joi.string().min(6),
    coverAbout: Joi.objectId().required(),
    coverOurVision: Joi.objectId().required(),
    coverGoals: Joi.objectId().required(),
    goals: Joi.string().required().min(6),
  }),
  updateInfo: Joi.object({
    title: Joi.string().required().min(3).max(20),
    description: Joi.string().required().min(3).max(400),
    content: Joi.string().required().min(6),
    cover: Joi.objectId().required(),
    about: Joi.string().min(6),
    ourVision: Joi.string().min(6),
    coverAbout: Joi.objectId().required(),
    coverOurVision: Joi.objectId().required(),
    coverGoals: Joi.objectId().required(),
    goals: Joi.string().required().min(6),
  }),
};
module.exports = validations;