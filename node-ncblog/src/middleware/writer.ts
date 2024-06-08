import { Request, Response, NextFunction } from "express";
import { makeError } from "../utils/responses.js"
import { User } from "../models/user.js";

interface CustomRequest extends Request {
  user: User
}

export default function (req: CustomRequest, res: Response, next: NextFunction) {
  // console.log(req.user)
  const roles = req.user.roles
  const lowercaseRoles = roles.map(role => role.toLowerCase());

  const userRole = "writer"

  if (!lowercaseRoles.includes(userRole.toLowerCase()))
    return next(makeError(403, "Access denied. Wrong permission"));
  next();
}
