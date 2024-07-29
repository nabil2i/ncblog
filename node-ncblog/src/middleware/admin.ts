import { Request, Response, NextFunction } from "express";
import { makeError } from "../utils/responses.ts"
import { User } from "../models/user.ts";
// import { ParamsDictionary, ParsedQs } from 'express-serve-static-core';

interface CustomRequest extends Request {
// interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user: User
}

export default function (req: CustomRequest, res: Response, next: NextFunction) {
  const roles = req.user.roles
  const lowercaseRoles = roles.map(role => role.toLowerCase());

  const userRole = "admin"

  if (!lowercaseRoles.includes(userRole.toLowerCase()))
    return next(makeError(403, "Access denied. Wrong permission"));
  
  next();
}
