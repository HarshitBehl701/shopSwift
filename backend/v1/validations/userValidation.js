const Joi = require('joi');

const registerSchema  = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
})

const  loginSchema =   Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
})

const updateUserSchema =  Joi.object({
    name: Joi.string().min(3).max(30).required(),
    address: Joi.string().allow(''),
    contact: Joi.string().pattern(/^\d{10}$/)
})

const profilePicSchema = Joi.object({
    file: Joi.object({
        originalname: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(2 * 1024 * 1024).required()  //maximum 2 MB
    })
})

module.exports  = {registerSchema,loginSchema,updateUserSchema,profilePicSchema};