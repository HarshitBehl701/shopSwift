const  Joi  =  require('joi');

const  registerSellerSchema  = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    brandName: Joi.string().required(),
})

module.exports  =  {registerSellerSchema};