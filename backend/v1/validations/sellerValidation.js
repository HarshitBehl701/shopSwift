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

const updateSellerSchema   = Joi.object({
    fullname: Joi.string().min(3).required(),
    brandname: Joi.string().required(),
    gstin: Joi.string().pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).allow(''),
    contact: Joi.string().pattern(/^\d{10}$/).allow(''),
    address: Joi.string().allow('')
})

const profilePicSchema  = Joi.object({
    file: Joi.object({
        originalname: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(2 * 1024 * 1024).required()  //maximum 2 MB
    })
})

module.exports  =  {registerSellerSchema,loginSellerSchema,updateSellerSchema ,profilePicSchema};