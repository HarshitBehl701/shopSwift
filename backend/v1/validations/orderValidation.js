const Joi = require("joi");

const createOrderSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = { createOrderSchema };
