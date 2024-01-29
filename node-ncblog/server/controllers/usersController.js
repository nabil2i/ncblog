import _ from "lodash";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import Post from "../models/post.js";
import ms from "ms";

// @desc Get all users
// @route GET /users
// @access Private
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').lean().sort('name');
  if (!users.length) {
    return res.status(400).json({
      success: false,
      error: { code: 400, message: 'No user found'}
    });
  }
    res.status(200).json({ success: true, data: users });
};

// @desc Create new user
// @route POST /users
// @access Private
export const createNewUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({
    success: false,
    error: { code: 400, message: error.details[0].message}
  });

  const { username, email, firstname, lastname, password, password2 } = req.body;
  
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
  
  user = new User(_.pick(req.body, ['username', 'email', 'password', 'firstname', 'lastname']));
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  await user.save();
  
  if (user) {
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();
    
    // const userData = _.pick(user, ['_id', 'username', 'firstname', 'lastname', 'email', 'accessToken'])
    // userData.accessToken = accessToken;
    // userData.isAuthenticated = true;
    
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // web bserver only
      secure: true, // https only
      sameSite: 'None',
      maxAge: ms('7days')
    })

    const data = {
      accessToken,
      // ...userData
    }

    res.status(200).json({ success: { code: 201, message: "New user created", data }});
    // res.status(201).header('x-auth-token', token).json({
    //   success: true,
    //   message: "New user created",
    //   data: userData
    // });
  } else {
    res.status(400).json({ error: {
      code: 400, message: "Invalid user details received"}});
  }
};

// @desc Get a user
// @route GET /users/:id
// @access Private
export const getUser = async (req, res) => {
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
};

// @desc Update a user
// @route PUT /users/:id
// @access Private
export const updateUser = async (req, res) => {
  const { username, email, isActive, password } = req.body
  if (!username || typeof isActive !== 'boolean')
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "All fields must be provided"}
    });
  
  const userId = req.params.id
  const user = await User.findById(userId).exec()

  if (!user)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "User not found"}
    });

  const duplicate = await User.findOne({ username })
    .collation({ locale: 'en', strength: 2}).lean().exec();
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
};

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
export const deleteUser = async (req, res) => {
  const userId = req.params.id
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
};


// @desc Get current User
// @route GET /users/me
// @access Private
export const getCurrentUser = async (req, res) => {
  const userId = req.user._id
  const user = await User.findById(userId).select('-password').lean().exec();
  res.status(200).json({ success: true, data: user});
};

// @desc Update current user
// @route PUT /users/me
// @access Private
export const updateCurrentUser = async (req, res) => {
  const { username, email, isActive, password, firstname, lastname } = req.body
  // if (!username || typeof isActive !== 'boolean')
  if (!username && !email && !(firstname && lastname) && !password)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "You must provide data to update"}
      // error: { code: 400, message: "All fields must be provided"}
    });
  
  const userId = req.user._id;
  const user = await User.findById(userId).exec()

  if (!user)
    return res.status(400).json({
  success: false,
  error: { code: 400, message: "User not found"}
  });

  if (!user.isActive)
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "This user cannot make this request"}
    });
  
  if (username) {
    const duplicate = await User.findOne({ username })
      .collation({ locale: 'en', strength: 2}).lean().exec();
      if (duplicate && duplicate._id.toString() !== userId) {
        return res.status(409).json({
          success: false, 
          error: {
            code: 409,
            message: 'Username already exists',
          }
        });
    }
    user.username = username
  }

  if (firstname) {
    user.firstname = firstname
  }

  if (firstname) {
    user.lastname = lastname
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

  
  // user.isActive = isActive

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.password = newPassword;
  }

  // const userData = _.pick(user, ['_id', 'username', 'firstname', 'lastname', 'email',

  // ]);
  
  const updatedUser = await user.save()

  const accessToken = updatedUser.generateAuthToken();
  const refreshToken = updatedUser.generateRefreshToken();
  
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: ms('7days')
  })

  const data = {
    accessToken,
    // ...userData
  }


  res.status(200).json({
    success: true,
    message: `${updatedUser.username} updated`,
    data
  });

  // res
  //   .status(200)
  //   .json({
  //     success: true,
  //     message: `${updatedUser.username} updated`,
  //     data: userData
  // });


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
};

// @desc Delete current user
// @route DELETE /users/me
// @access Private
export const deleteCurrentUser = async (req, res) => {
  const userId = req.user._id
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
};



// @desc Get current User Posts
// @route GET /users/me/posts
// @access Private
export const getCurrentUserPosts = async (req, res) => {
  const userId = req.user._id
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "User ID required"}
    });
  }

  const userPosts = await Post
    .find({ user: userId })
    .populate({
      path: 'user',
      select: 'firstname lastname'
    })
    .lean().exec();

  res.status(200).json({ success: true, data: userPosts });
};



function validateUser(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    firstname: Joi.string().min(2).max(50).required(),
    lastname: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
    password2: Joi.string().min(5).max(255).required(),
    
  });
  return schema.validate(req);
}
