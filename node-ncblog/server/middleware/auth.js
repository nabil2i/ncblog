const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // if taking token from cookies
  const token = req.cookies.token;

  //if taking token from header
  // const token = req.header('x-auth-token');

  // console.log("hehe")
  if (!token) {
    return res.status(401).json({ success: false, error: { code: 401, message: 'Access denied. No token provided.'}})
  }
  
  // console.log("found token")
  try {
    const decoded = jwt.verify(token, process.env.NODE_APP_JWT_SECRET);
    // { _id: this._id, isAdmin: this.isAdmin, roles: this.roles, isActive: this.isActive }
    req.user = decoded;
    // console.log("user after auth middleware:", decoded)
    next();
  } catch(ex) {
    res.status(400).json({success: false, error: { cdode: 400, message: 'Invalid token.'}})
  }
}
