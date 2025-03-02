import Joi from "joi";

export  const createNewOrderSchema =  Joi.object({
    product_id: Joi.number().required(),
    price: Joi.number().required(),
    quantity: Joi.number().min(1).empty()
})

export  const cancelOrderSchema =  Joi.object({
    order_id: Joi.number().required()
})

export  const manageOrderRatingForUserSchema =  Joi.object({
    order_id: Joi.number().required(),
    rating:  Joi.number().min(0).max(5).required()
})

export  const getAllOrdersOfProductForSellerSchema =  Joi.object({
    product_id: Joi.number().required()
})

export  const getAllOrdersOfProductForAdminSchema =  Joi.object({
    product_id: Joi.number().required()
})

export const updateExistingOrderForSellerSchema =  Joi.object({
    price:  Joi.number().empty(),
    cancel_reason:  Joi.string().empty(),
    order_status:  Joi.string().valid('Pending','Processing','Shipped','Delivered','Cancelled','Refunded','Failed','On Hold','Returned').empty(),
    is_active:  Joi.number().valid(0,1).empty(),
    order_id: Joi.number().required()
})

export const updateExistingOrderForAdminSchema =  Joi.object({
    product_id:Joi.number().required(),
    user_id:Joi.number().required(),
    price:  Joi.number().required(),
    order_status:  Joi.string().valid('Pending','Processing','Shipped','Delivered','Cancelled','Refunded','Failed','On Hold','Returned').required(),
    is_active:  Joi.number().valid(0,1).required(),
    order_id: Joi.number().required()
})

export  const getAllOrdersOfUserForAdminSchema = Joi.object({
    user_id: Joi.number().required()
});