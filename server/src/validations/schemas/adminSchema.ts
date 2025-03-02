import Joi from "joi";

export  const  registerAdminSchema  = Joi.object({
    admin_name: Joi.string().required(),
    admin_email: Joi.string().required(),
    admin_password: Joi.string().min(8).required(),
});

export const loginAdminSchema =  Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const updateAdminDetailsSchema =  Joi.object({
    admin_id:Joi.number().required(),
    admin_name: Joi.string().empty() ,
    admin_email: Joi.string().empty() ,
    admin_password: Joi.string().empty() ,
    is_active: Joi.number().valid(0,1).empty() ,
})

export const getAdminDetailsSchema = Joi.object({
    admin_id: Joi.number().required()
})