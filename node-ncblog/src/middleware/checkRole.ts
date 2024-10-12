import { NextFunction, Request, RequestHandler, Response } from "express";
import UserModel, { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";
import { IRole } from "../models/role.js";


interface CustomRequest extends Request {
  user: IUser
}

export default function checkRole(roleslist: string[]): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest
    if (!customReq.user) return next(makeError(401, "Unauthorized"));
    
    try {
      const user = await UserModel.findById(customReq.user._id).populate("roles");
      if (!user) return next(makeError(401, "Unauthorized"));

      const userRoles = user?.roles as IRole[];

      const hasRole = userRoles.some((role) => roleslist.includes(role.name));
      if (!hasRole) return next(makeError(403, "Access denied. Wrong permission"));

      // const hasRole = user?.roles
      //   .filter((role): role is IRole => typeof role !== 'string')
      //   .some((role: IRole) => roleslist.includes(role.name));
      // if (!hasRole) return next(makeError(403, "Access denied. Wrong permission"));
      
      next();
    } catch (error) {
      return next(makeError(500, "Internal Server Error"));
    }
  };
}
// export default function (roleslist: [string]) {
//   return async (req: CustomRequest, res: Response, next: NextFunction) => {
//     if (!req.user) return next(makeError(401, "Unauthorized"));
    
//     try {
//       const user = await UserModel.findById(req.user._id).populate("roles");
//       const hasRole = user?.roles.some((role: any) => roleslist.includes(role.name));
//       if (!hasRole) return next(makeError(403, "Access denied. Wrong permission"));
//       next();
//     } catch (error) {
//       return next(makeError(500, "Internal Server Error"));
//     }
//   };
// }
