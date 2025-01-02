const Joi = require("joi");

const createProductValidation = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  price: Joi.string().min(0).required(),
  discount: Joi.string().min(0).required(),
  description: Joi.string().min(1).required(),
});

const updateStatusProductValidation  = Joi.object({
  productId: Joi.string().required(),
  currentStatus: Joi.string().valid(1,0).required()
})

const  updateRatingProductValidation  =   Joi.object({
  productId: Joi.string().required(),
  action:  Joi.string().valid('add_view','update_rating').required(),
  rating: Joi.number().min(0).max(5).required()
})

const  updateViewProductValidation = Joi.object({
  productId: Joi.string().required(),
  action:  Joi.string().valid('add_view','update_rating').required()
})

module.exports = {createProductValidation,updateStatusProductValidation,updateRatingProductValidation,updateViewProductValidation};