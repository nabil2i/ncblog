module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).json({
      success: false,
      error: { code: 403, message: "Access denied."}
    });
  next();
}
