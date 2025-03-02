import  Joi from "joi";

export const  contactUsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message:  Joi.string().required()
})

export const createNewCategorySchema  = Joi.object({
    name:   Joi.string().required()
})

export const createNewSubCategorySchema = Joi.object({
    category_id: Joi.number().required(),
    sub_category_name:Joi.string().required()
})

export  const  updateCategorySchema =  Joi.object({
    category_id:   Joi.string().required(),
    name:   Joi.string().empty(),
    is_active: Joi.string().valid("0","1").empty()
})


export  const  updateSubCategorySchema =  Joi.object({
    category_id:   Joi.string().required(),
    sub_category_id:   Joi.string().required(),
    sub_category_name:   Joi.string().empty(),
    is_active: Joi.string().valid("0","1").empty()
})