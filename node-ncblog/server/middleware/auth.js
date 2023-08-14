const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // if taking token from cookies
  const token = req.cookies.token;

  //if taking token from header
  // const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.')
  }

  try {
    const decoded = jwt.verify(token, process.env.NODE_ENV_JWT_SECRET);
    // what we have in the token:
    // { _id: this._id, isAdmin: this.isAdmin }
    req.user = decoded;
    next();
  } catch(ex) {
    res.status(400).send('Invalid token.')
  }
}
