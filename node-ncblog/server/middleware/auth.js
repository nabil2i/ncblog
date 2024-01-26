const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || req.headers.authorization
  // console.log(authHeader)
  if (!authHeader || !authHeader.startsWith || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    });
  }

  const accessToken = authHeader.split(' ')[1]
  // console.log(accessToken)

  jwt.verify(
    accessToken,
    process.env.NODE_APP_JWT_ACCESS_SECRET,
    (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(403).json({
          success: false,
          error: {
            code: 403,
            message: 'Forbidden'
          }
        });
      }

      req.user = decoded;
      next();
    }
  )



  // // if taking token from cookies
  // const refreshToken = req.cookies.jwt;

  // if (!refreshToken) {
  //   return res.status(401).json({
  //     success: false,
  //     error: {
  //       code: 401,
  //       message: 'Unauthorized'
  //     }
  //   });
  // }
  
  // try {
  //   const decoded = jwt.verify(
  //     jwt,
  //     process.env.NODE_APP_JWT_REFRESH_SECRET
  //   );
  //   req.user = decoded;
  //   next();
  // } catch(ex) {
  //   res.status(400).json({
  //     success: false,
  //     error: {
  //       code: 400,
  //       message: 'Invalid token'
  //     }
  //   });
  // }
}
