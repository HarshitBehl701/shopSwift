const   Joi  = require('joi');

const createProductValidation   = Joi.object({
    name: Joi.string().min(1).required(),
    category: Joi.string().valid('electronics', 'clothing', 'shoes', 'accessories', 'baby', 'furniture', 'home-decor').required(),
    price: Joi.number().min(0).required(),
    discount: Joi.number().min(0).required(),
    description: Joi.string().min(1).required() 
})

module.exports  = {createProductValidation};