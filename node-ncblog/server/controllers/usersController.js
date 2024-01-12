
const asyncHandler = require('express-async-handler')
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { Post } = require('../models/post');

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean().sort('name');
  if (!users.length) {
    return res.status(400).json({
      success: false,
      error: { code: 400, message: 'No user found'}
    });
  }
    res.status(200).json({ success: true, data: users });
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({
    success: false,
    error: { code: 400, message: error.details[0].message}
  });

  const { username, email, password, password2 } = req.body;
  
  if (password !== password2)
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: "Passwords don't match",
      }
    });

  let user = await User.findOne({ username });
  if (user)
    return res.status(409).json({
      success: false, 
      error: {
        code: 409, 
        message: 'User with this username already registrated',
      }
    });
    
  user = await User.findOne({ email });
  if (user)
    return res.status(409).json({
      success: false,
      error: {
        code: 400, 
        message: 'User with this email address already registrated',
      }
    });
  
  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  await user.save();
  
  if (user) {
    const token = user.generateAuthToken();
    
    const userData = _.pick(user, ['_id', 'username', 'email', 'token'])
    userData.token = token;
    userData.isAuthenticated = true;
    
    res.status(201)
      .cookie('token', token, { httpOnly: true})
      .json({ success: { code: 201, message: "New user created", data: userData }});
    // res.status(201).header('x-auth-token', token).json({
    //   success: true,
    //   message: "New user created",
    //   data: userData
    // });
  } else {
    res.status(400).json({ error: {
      code: 400, message: "Invalid user details received"}});
  }
});

// @desc Get a user
// @route GET /users/:id
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "User ID required"}
    });
  }

  const user = await User.findById(userId).select('-password').lean().exec();
  if (!user) return res.status(404).json({
    success: false, 
    error: {
      code: 404,
      message: 'The user with the given ID was not found'
    }
  });
  res.status(200).json({ success: true, data: user});
});

// @desc Update a user
// @route PUT /users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, isActive, password } = req.body
  if (!username || typeof isActive !== 'boolean')
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "All fields must be provided"}
    });
  
  let userId = req.params.id
  const user = await User.findById(userId).exec()

  if (!user)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "User not found"}
    });

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== userId) {
      return res.status(409).json({
        success: false, 
        error: {
          code: 409, 
          message: 'Username already exists',
        }
      });
  }

  if (email) {
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate && duplicate._id.toString() !== userId) {
      return res.status(409).json({
        success: false, 
        error: {
          code: 409, 
          message: 'Email already exists',
        }
      });
    }
    user.email = email
  }

  user.username = username
  user.isActive = isActive

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.password = newPassword;
  }
  
  const updatedUser = await user.save()
  res.status(200).json({
    success: true,
    message: `${updatedUser.username} updated`
  });


  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  // // if (error) return res.status(400).json({message: error.details[0].message});
  
  // const salt = await bcrypt.genSalt(10);
  // const newPassword = await bcrypt.hash(req.body.password, salt);

  // const user = await User.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: newPassword
  //   },
  //   { new: true } //
  // ).select('-password');
    
  // if (!user) return res.status(400).json({ success: false, error: { code: 400, message: "The user with the given ID was not found."}});
  // res.status(200).json({ success: true, message: `${updatedUser.username} updated`});
});

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  let userId = req.params.id
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "User ID required"}
    });
  }

  // const posts = await Post.lookup(userId).lean().exec();
  const post = await Post.findOne({ user: userId }).lean().exec();

  if (post) {
    return res.status(404).json({
      success: false,
      error: { code: 404, message: 'User has posts'}
    });
  }

  const user = await User.findByIdAndRemove(userId);
    
  if (!user) return res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: 'The user with the given ID was not found'
      }
  });

  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: `${user.username} with ID ${user._id} was deleted`
  });
});

// @desc Get current User
// @route GET /users/me
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  let userId = req.user._id
  const user = await User.findById(userId).select('-password').lean().exec();
  res.status(200).json({ success: true, data: user});
});

// @desc Update current user
// @route PUT /users/me
// @access Private
const updateCurrentUser = asyncHandler(async (req, res) => {
  const { username, email, isActive, password } = req.body
  if (!username || typeof isActive !== 'boolean')
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "All fields must be provided"}
    });
  
  let userId = req.user._id;
  const user = await User.findById(userId).exec()

  if (!user)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "User not found"}
    });

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate._id.toString() !== userId) {
    return res.status(409).json({
      success: false, 
      error: {
        code: 409,
        message: 'Username already exists',
      }
    });
  }

  if (email) {
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate && duplicate._id.toString() !== userId) {
      return res.status(409).json({
        success: false, 
        error: {
          code: 409,
          message: 'Email already exists',
        }
      });
    }
    user.email = email;
  }

  user.username = username
  user.isActive = isActive

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.password = newPassword;
  }
  
  const updatedUser = await user.save()
  res.status(200).json({
    success: true,
    message: `${updatedUser.username} updated`
  });


  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // const salt = await bcrypt.genSalt(10);
  // const newPassword = await bcrypt.hash(req.body.password, salt);

  // const user = await User.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: newPassword
  //   },
  //   { new: true } //
  // ).select('-password');
    
  // if (!user) return res.status(400).json({ success: false, error: { code: 400, message: "The user with the given ID was not found."}});
  // res.status(200).json({ success: true, message: `${updatedUser.username} updated`});
});

// @desc Delete current user
// @route DELETE /users/me
// @access Private
const deleteCurrentUser = asyncHandler(async (req, res) => {
  let userId = req.user._id
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "User ID required"}
    });
  }

  // const posts = await Post.lookup(userId).lean().exec();
  const post = await Post.findOne({ user: userId}).lean().exec();

  if (post) {
    return res.status(404).json({
      success: false,
      error: { code: 404, message: 'User has posts'}
    });
  }

  const user = await User.findByIdAndRemove(userId);
    
  if (!user) return res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: 'The user with the given ID was not found'
      }
  });

  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: `${user.username} with ID ${user._id} was deleted`
  });
});


function validateUser(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
    password2: Joi.string().min(5).max(255).required(),
    
  });
  return schema.validate(req);
}

module.exports = {
  getAllUsers,
  createNewUser,
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser
}
