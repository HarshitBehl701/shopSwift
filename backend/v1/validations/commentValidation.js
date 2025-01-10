const Joi  = require('joi');

const createCommentValidation  = Joi.object({
    comment: Joi.string().required()
})

const updateCommentStatusValidation  = Joi.object({
    commentId: Joi.string().required(),
    status: Joi.string().valid('hide','show').required()
})

module.exports = {createCommentValidation,updateCommentStatusValidation};