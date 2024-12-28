const  Joi  =  require('joi');

const  registerSellerSchema  = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    brandname: Joi.string().required(),
    password:  Joi.string().min(8).max(16).required()
})

const loginSellerSchema = Joi.object({
    email: Joi.string().email().required(),
    password:  Joi.string().min(8).max(16).required()
})

module.exports  =  {registerSellerSchema,loginSellerSchema};