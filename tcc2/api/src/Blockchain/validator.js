const Joi = require("joi");

module.exports = {
  create: {
    body: Joi.object({
      email: Joi.string().email().required(),
    })
  }
};