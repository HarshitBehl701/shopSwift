import  Joi from "joi";

export const createNewcommentSchema  = Joi.object({
    order_id:Joi.number().required(),
    product_id:Joi.number().required(),
    user_comment: Joi.string().required()
});


export const updateCommentSchema  = Joi.object({
    comment_id: Joi.number().required(),
    user_comment: Joi.string().empty(),
    is_active: Joi.number().valid(0,1).empty()
});


export const  getProductAllCommentsSchema = Joi.object({
    product_id:   Joi.number().required()
})


export const getOrderAllCommentsSchema  = Joi.object({
    order_id:  Joi.number().required()
});

export const getUserAllCommentsSchema  = Joi.object({
    user_id:  Joi.number().required()
});

export  const updateCommentForAdminSchema = Joi.object({
    product_id:  Joi.number().required(),
    order_id:  Joi.number().required(),
    user_id:  Joi.number().required(),
    user_comment:  Joi.string().required(),
    is_active:  Joi.number().valid(0,1).required(),
})