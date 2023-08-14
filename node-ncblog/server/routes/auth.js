const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const express = require('express');
const { User } = require('../models/user')
const router = express.Router();

// login
router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);
    
    // log in the user
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid username or password.');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password.');
    
    // if login successful, send create a token and send it to user
    const token = user.generateAuthToken();
    // res.status(200).send(userData);
    // res.status(200).header('x-auth-token', token).send(userData);

    const userData = _.pick(user, ['_id', 'username', 'email', 'token'])
    userData.token = token;
    userData.isAuthenticated = true;
    // if storing the token in a cookie
    res.status(200).cookie('token' ,token, { httpOnly: true }).send(userData);
  } catch(err) {
    console.log(err);
  }
});

//logout
router.post('/logout', auth, async (req, res) => {
  try {
    res.clearCookie('token');
    res.send(" Logout successful.");
  } catch(err) {
    console.log(err);
  }

})

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(req);
}

module.exports = router;
