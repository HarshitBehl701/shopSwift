const Joi = require("joi");

const createOrderSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

const  updateOrderStatusSchema  = Joi.object({
  status:  Joi.string().valid("ordered" , "cancelled" , "processing", "out for delivery", "delivered").required()
})

const updateRatingSchema = Joi.object({
  rating:  Joi.number()
})

module.exports = { createOrderSchema ,updateOrderStatusSchema ,updateRatingSchema};