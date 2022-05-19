const Joi = require('joi');

const validations = {
  addInfo: Joi.object({
    // type: Joi.string().valid('blog'),
    title: Joi.string().required(),
    content: Joi.string().required(),
    description: Joi.string().required(),
    titleAr: Joi.string().required(),
    contentAr: Joi.string().required(),
    descriptionAr: Joi.string().required(),
    category: Joi.string(),
    coverPhoto: Joi.any(),
    date: Joi.date().required(),
  }),
};

module.exports = validations;
