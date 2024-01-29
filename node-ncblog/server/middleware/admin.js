export default function (req, res, next) {
  const roles = req.user.roles
  const lowercaseRoles = roles.map(role => role.toLowerCase());

  const userRole = "admin"

  if (!lowercaseRoles.includes(userRole.toLowerCase()))
    return res.status(403).json({
      success: false,
      error: { code: 403, message: "Access denied. Wrong permission."}
    });
  next();
}
