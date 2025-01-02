const Joi = require("joi");

const createProductValidation = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.string()
    .valid(
      "electronics",
      "clothing",
      "shoes",
      "accessories",
      "baby",
      "furniture",
      "home-decor"
    )
    .required(),
  price: Joi.string().min(0).required(),
  discount: Joi.string().min(0).required(),
  description: Joi.string().min(1).required(),
});

const updateStatusProductValidation  = Joi.object({
  productId: Joi.string().required(),
  currentStatus: Joi.string().valid(1,0).required()
})

module.exports = {createProductValidation,updateStatusProductValidation};