const   Joi  = require('joi');

const createProductValidation   = Joi.object({
    files: Joi.array().items(
        Joi.object({
            originalname: Joi.string().required(),
            mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
            size: Joi.number().max(2 * 1024 * 1024).required()  //maximum 2 MB
        })
    ).min(1).required(),
    name: Joi.string().min(1),
    category: Joi.string().valid('electronics', 'clothing', 'shoes', 'accessories', 'baby', 'furniture', 'home-decor').required(),
    price: Joi.string().min(0).required(),
    discount: Joi.string().min(0).required(),
    description: Joi.string().min(1).required(),
})

module.exports  = {createProductValidation};