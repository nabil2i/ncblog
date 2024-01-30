import { makeError } from "../utils/responses.js"

export default function (req, res, next) {
  const roles = req.user.roles
  const lowercaseRoles = roles.map(role => role.toLowerCase());

  const userRole = "admin"

  if (!lowercaseRoles.includes(userRole.toLowerCase()))
    return next(makeError(403, "Access denied. Wrong permission"));
  
  next();
}
