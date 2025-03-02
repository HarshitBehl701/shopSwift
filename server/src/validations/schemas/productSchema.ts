import  Joi from "joi";

export const createNewProductSchema  = Joi.object({
    product_name:  Joi.string().required() ,
    description:  Joi.string().empty() ,
    category:  Joi.string().empty() ,
    sub_category:  Joi.string().empty() ,
    price:  Joi.string().empty() ,
    discount:  Joi.string().empty()
})

export  const updateProductDetailsForSellerSchema  =  Joi.object({
    product_id:  Joi.string().required(),
    product_name: Joi.string().empty(),
    description: Joi.string().empty(),
    deleteImages:Joi.string().empty(),
    category: Joi.number().empty(),
    sub_category: Joi.number().empty(),
    price: Joi.number().empty(),
    discount: Joi.number().empty(),
    status: Joi.number().valid(0,1).empty(),
    is_active: Joi.number().valid(0,1).empty(),
})

export const updateProductDetailsForAdminSchema = Joi.object({
    product_id:  Joi.number().required(),
    product_name: Joi.string().empty(),
    description: Joi.string().empty(),
    deleteImages:Joi.string().empty(),
    category: Joi.number().empty(),
    sub_category: Joi.number().empty(),
    price: Joi.number().empty(),
    discount: Joi.number().empty(),
    status: Joi.number().valid(0,1).empty(),
    is_active: Joi.number().valid(0,1).empty(),
    seller_id: Joi.number().empty(),
    views: Joi.number().empty(),
    number_of_customer_rate:Joi.number().empty(),
    average_rating: Joi.number().empty(),
    sum_rating:  Joi.number().empty(),
})

export  const getSellerAllProductsForAdminSchema  =  Joi.object({
    seller_id:  Joi.number().required()
})

export const manageUserCartSchema  = Joi.object({
    product_id: Joi.number().required(),
    action: Joi.string().valid('add','remove').required()
})

export const manageUserWhislistSchema  = Joi.object({
    product_id: Joi.number().required(),
    action: Joi.string().valid('add','remove').required()
})
    
export const manageUserCartForAdminSchema  = Joi.object({
    user_id: Joi.number().required(),
    product_id: Joi.number().required(),
    action: Joi.string().valid('add','remove').required()
})

export const manageUserWhislistForAdminSchema  = Joi.object({
    user_id: Joi.number().required(),
    product_id: Joi.number().required(),
    action: Joi.string().valid('add','remove').required()
})