const asyncHandler = require('express-async-handler') // to avoid writing try/catch 
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { User } = require('../models/user')

// @desc Login
// @route POST /
// @access Public
const login = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
      
  if (error) return res.status(400).json({ success: false, error: { code: 400, message: error.details[0].message}});
  
  // log in the user
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid username or password.'}});
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ success: false, error: { code: 400, message: 'Invalid username or password.'}});
  
  // if login successful, send create a token and send it to user
  const token = user.generateAuthToken();
  // res.status(200).send(userData);
  // res.status(200).header('x-auth-token', token).send(userData);

  const userData = _.pick(user, ['_id', 'username', 'email', 'token'])
  userData.token = token;
  userData.isAuthenticated = true;
  // if storing the token in a cookie
  res.status(200).cookie('token' ,token, { httpOnly: true }).json({ success: true, data: userData});
});

// @desc Logout
// @route POST /logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  // console.log("logout")
  res.clearCookie('token');
  res.status(200).json({ success: true, message: "Logout successful."});
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