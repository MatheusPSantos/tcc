const Joi = require("joi");

module.exports = {
  create: {
    body: Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().min(3).required(),
    })
  },
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(3),
    })
  }
};