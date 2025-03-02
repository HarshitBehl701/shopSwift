import Joi from "joi";

export const registerNewUserSchema = Joi.object({
    user_name: Joi.string().required(),
    email: Joi.string().email().required(),
    user_password: Joi.string().min(8).required()
})

export  const verifyAccountSchema = Joi.object({
    verification_code:Joi.string().required(),
    email:Joi.string().email().required()
})

export  const loginUserSchema  =  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export  const getUserDetailsSchema =  Joi.object({
    user_id:Joi.number().required()
})

export   const updateUserDetailsSchema  =  Joi.object({
    user_name: Joi.string().empty() ,
    user_email: Joi.string().empty() ,
    user_password: Joi.string().empty() ,
    address: Joi.string().empty() ,
})

export  const updateUserPhotoForAdminSchema = Joi.object({
    user_id:  Joi.string().required()
});

export const manageUserAccountForAdminSchema = Joi.object({
    user_id:  Joi.number().required(),
    user_name: Joi.string().empty() ,
    user_password: Joi.string().empty() ,
    user_address: Joi.string().empty(),
    user_email: Joi.string().email().empty(),
    user_cart: Joi.string().empty(),
    user_whislist: Joi.string().empty(),
    is_verified:  Joi.number().valid(0,1).empty(),
    change_verification_code: Joi.number().valid(0,1).empty(),
    verification_expiration: Joi.date().empty(),
    is_active:Joi.number().valid(0,1).empty(),
})