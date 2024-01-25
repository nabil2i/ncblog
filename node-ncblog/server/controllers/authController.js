const asyncHandler = require('express-async-handler') 
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const ms = require('ms');
const jwt = require('jsonwebtoken');

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
      
  if (error)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: error.details[0].message}
    });
  
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (!user || !user.isActive)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: 'Invalid username or password'}
    });
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: 'Invalid username or password'}
    });
  
  const accessToken = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();
  
  const userData = _.pick(user, ['_id', 'username', 'email', 'firstname', 'lastname', 'accessToken'])
  userData.accessToken = accessToken;
  userData.isAuthenticated = true;

  res.cookie('jwt', refreshToken, {
    httpOnly: true, // web bserver only
    secure: true, // https only
    sameSite: 'None',
    maxAge: ms('7days')
  })

  res.status(200).json({
    success: true,
    data: userData
  });
  // res.status(200).header('x-auth-token', token).json({
  //   success: true,
  //   data: userData
  //  })
});


// @desc Refresh token
// @route GET /auth/refresh
// @access Public
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies

  if (!cookies.jwt) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    });
  }

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.NODE_APP_JWT_REFRESH_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err)
        return res.status(403).json({
          success: false,
          error: {
            code: 403,
            message: 'Forbidden'
          }
        });

      const user = await User.findOne({ username: decoded.username });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: {
            code: 400,
            message: 'Unauthorized'
          }
        });
      }

      const accessToken = user.generateAuthToken();

      res.status(200).json({
        success: true,
        data: { accessToken }
      });
    })
  );

});

// @desc Logout
// @route POST /auth/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.status(200).json({ success: true, message: "Logout successful"});
});


function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(req);
}

module.exports = {
  login,
  logout,
  refresh
}
