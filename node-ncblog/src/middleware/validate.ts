import Joi from "joi";
import { makeError } from "../utils/responses.js"
import { Request, Response, NextFunction } from "express";

export default function (validator: (body: any) => { error?: Joi.ValidationError }) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    next();
  }
}
