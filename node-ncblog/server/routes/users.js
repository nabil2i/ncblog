const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const { User, validate } = require('../models/user');
const router = express.Router();

// registration
router.post('/', async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // if (error) return res.status(400).send(error);
    
    const { username, email, password, password2 } = req.body;
    
    if (password !== password2) res.status(400).send("Passwords don't match.");
    // if (password !== password2) res.status(400).json({
    //   message: "Passwords don't match.",
    //   // additionalData: {message: "Passwords don't match."}
    // });
    let user = await User.findOne({ username: username});
    if (user) return res.status(400).send('User with this username already registrated.');
    // if (user) return res.status(400).json({
      //   message: 'User with this username already registrated.',
      //   // additionalData: {message: 'User already registrated.'}
      // });
      
      user = await User.findOne({ email: email });
      if (user) return res.status(400).send('User with this email address already registrated.');
    // if (user) return res.status(400).json({
    //   message: 'User with this email address already registrated.',
    //   // additionalData: {message: 'User already registrated.'}
    // });
    
    user = new User(_.pick(req.body, ['username', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();
    
    // send the user info to client with the token in the header
    const token = user.generateAuthToken();
    // res.status(201).header('x-auth-token', token).send(_.pick(user, ['id', 'username', 'email']));
    // or send it to be set in the cookie
    res.status(201).cookie('token', token, { httpOnly: true}).send(_.pick(user, ['id', 'username', 'email']));
    // res.status(201).send(_.pick(user, ['id', 'username', 'email']));
  } catch(err) {
    console.log(err);
    // res.json(err);
  }
})

// get logged in user data
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  } catch(err) {
    console.log(err);
  }
});

// update logged in user data
router.put('/me', auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: req.body.username,
        email: req.body.email,
        password: newPassword
      },
      { new: true } //
    ).select('-password');
      
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
  } catch(err) {
    console.log(err);
  }
});

// delete logged in user
router.delete('/me', auth, async (req, res) => {
  try {

    const user = await User.findByIdAndRemove(req.user._id);
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    res.clearCookie('token');
    res.send(" Profile successfully deleted.");
    // res.send(user);
  } catch(err) {
    console.log(err);
  }
});

// update user data
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        password: newPassword
      },
      { new: true } //
      );
      
      if (!user) return res.status(404).send('The user with the given ID was not found.');
      res.send(user);
    } catch(err) {
      // console.log(err);
    }
});
    
// delete a user
router.delete('/:id', [auth, admin], async (req, res) => {
  try {

    const user = await User.findByIdAndRemove(req.params.id);
  
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
  } catch(err) {
    console.log(err);
  }
});

// get all users
router.get('/', [auth, admin], async (req, res) => {
  try {
    const users = await User.find().sort('name');
    res.send(users);
  } catch(err) {
    console.log(err);
  }
});

// get a user
router.get('/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
  } catch(err) {
    console.log(err);
  }
});

function validateUser(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    password2: Joi.string().min(5).max(255).required(),
    
  });
  return schema.validate(req);
}

module.exports = router;
