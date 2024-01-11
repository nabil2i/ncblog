module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error)
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: error.details[0].message
      }
    });
    next();
  }
}
