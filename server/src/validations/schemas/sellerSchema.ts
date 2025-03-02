import  Joi from "joi";

export  const registerSellerSchema   = Joi.object({
    seller_name:  Joi.string().required(),
    brand_name:  Joi.string().required(),
    email:  Joi.string().required(),
    seller_password:  Joi.string().min(8).required(),
})

export  const verifySellerAccountSchema=  Joi.object({
    verification_code:  Joi.string().required(),
    email: Joi.string().email().required()
});

export  const getSellerDetailsForAdminSchema = Joi.object({
    seller_id: Joi.number().required()
})

export const loginSellerSchema =  Joi.object({
    email:  Joi.string().email().required(),
    seller_password: Joi.string().min(8).required()
})

export const updateSellerDetailsSchema  =  Joi.object({
    seller_name:  Joi.string().empty(),
    email:  Joi.string().email().empty(),
    brand_name:  Joi.string().empty(),
    seller_password:  Joi.string().empty(),
    gstin:  Joi.string().empty(),
})

export const updateSellerDetailsForAdminSchema  =  Joi.object({
    seller_id:Joi.number().required(),
    seller_name:  Joi.string().empty(),
    brand_name:  Joi.string().empty(),
    gstin:  Joi.string().empty(),
    email:  Joi.string().email().empty(),
    seller_password:  Joi.string().empty(),
    is_verified: Joi.number().valid(0,1).empty(),
    change_verification_code: Joi.number().valid(0,1).empty(),
    verification_expiration: Joi.date().empty(),
    is_active: Joi.number().valid(0,1).empty(),
})

export  const  updateSellerPhotoForAdminSchema = Joi.object({
    seller_id:  Joi.string().required()
})