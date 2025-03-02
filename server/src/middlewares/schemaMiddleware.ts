import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { getCustomCatchBlockResponseStructure } from "../utils/commonHelpers";

export const validateSchema = (schema: Joi.ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            await schema.validateAsync(req.body, { abortEarly: false }); // Collect all errors
            return next();
        } catch (error) {
            res.status(400).json(getCustomCatchBlockResponseStructure(error));
        }
    };
};