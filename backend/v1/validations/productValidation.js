const Joi = require("joi");

const createProductValidation = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  price: Joi.string().min(0).required(),
  discount: Joi.string().min(0).required(),
  description: Joi.string().min(1).required(),
});

const editProductValidation = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.string().required(),
  subCategory: Joi.string().required(),
  price: Joi.string().min(0).required(),
  discount: Joi.string().min(0).required(),
  description: Joi.string().min(1).required(),
  files: Joi.allow(''),
  deleteFiles: Joi.string()
  .custom((value, helpers) => {
    try {
      const parsed = JSON.parse(value); // Parse the JSON string
      if (!Array.isArray(parsed)) {
        throw new Error();
      }
      return parsed; // Return the parsed array
    } catch (err) {
      return helpers.message("Images must be a valid JSON array");
    }
  })
  .allow(''),
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

const productFilterValidations  = Joi.object({
  condition: Joi.object({
    fieldName: Joi.string().required(),
    operand:  Joi.string().valid('==','>=','<=','>','<').required(),
    requiredValue: Joi.required()
  }),
  limit: Joi.number().min(1).required()
})

module.exports = {createProductValidation,editProductValidation,updateStatusProductValidation,updateRatingProductValidation,updateViewProductValidation,productFilterValidations};