import { NextFunction, Request, RequestHandler, Response } from "express";
import RoleModel from "../models/role.js";
import UserModel, { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";

interface CustomRequest extends Request {
  user: IUser;
}

export default function checkPermissions(requiredPermissions: string[]): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as CustomRequest;

    if (!customReq.user) return next(makeError(401, "Unauthorized"));
    
    try {
      // get the user from the database
      const user = await UserModel.findById(customReq.user._id).populate("roles");
      if (!user) return next(makeError(401, "Unauthorized"));

      // get the roles for the user
      const userRoles = user.roles;

      // make sure the permissions are loaded in the roles
      if (!userRoles[0]?.permissions) {
        const roles = await RoleModel.find({ _id: { $in: userRoles.map(role => role._id) } });
        customReq.user.roles = roles
      }

      // get all permissions for the user
      const userPermissions = customReq.user.roles.flatMap(role =>
        role.permissions.map(permission => permission.name)
      );

      // verify that the user has the required permissions
      const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));
      if (!hasPermission) return next(makeError(403, "You do not have permission to do this action"));

      next();
    } catch (error) {
      return next(makeError(500, "Internal Server Error"));
    }
  };
}