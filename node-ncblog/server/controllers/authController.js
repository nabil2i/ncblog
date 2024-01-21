const asyncHandler = require('express-async-handler') 
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user')

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
  if (!user)
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
  
  const token = user.generateAuthToken();
  
  const userData = _.pick(user, ['_id', 'username', 'email', 'firstname', 'lastname', 'token'])
  // userData.token = token;
  userData.isAuthenticated = true;
  res.status(200).cookie('token' ,token, { httpOnly: true }).json({
    success: true,
    data: userData
  });
  // res.status(200).header('x-auth-token', token).json({
  //   success: true,
  //   data: userData
  //  })
});

// @desc Logout
// @route POST /auth/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
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
  logout
}
