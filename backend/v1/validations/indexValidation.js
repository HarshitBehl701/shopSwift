const Joi = require('joi');

const createCategoryValidation  = Joi.object({
    categoryname:  Joi.string().required(),
})

const createSubCategoryValidation  = Joi.object({
    categoryId:   Joi.string().required(),
    subCategoryname:   Joi.string().required(),
})

const updateCategoryStatusValidation = Joi.object({
    categoryname: Joi.string().required(),
    currentStatus: Joi.number().valid(1,0).required()
})

const updateSubCategoryStatusValidation = Joi.object({
    categoryId: Joi.string().required(),
    subCategoryname: Joi.string().required(),
    currentStatus: Joi.number().valid(1,0).required()
})

module.exports = {createCategoryValidation,createSubCategoryValidation,updateCategoryStatusValidation,updateSubCategoryStatusValidation};