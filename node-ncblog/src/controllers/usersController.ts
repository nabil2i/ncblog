
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import ms from "ms";
import Post from "../models/post.js";
import RoleModel from "../models/role.js";
import User, { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";

interface CustomResponse extends Response {
  paginatedResults?: any;
}

interface CustomRequest extends Request {
// interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user?: IUser
}

// @desc Get all users
// @route GET /users
// @access Private Admin Only
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const customRes = res as CustomResponse;

  res.status(200).json({ success: true, data: customRes.paginatedResults});
  // const users = await User.find().select('-password').lean().sort('name');
  // if (!users.length) return next(makeError(400, "No user found"));
    // res.status(200).json({ success: true, data: users });
};

// @desc Create new user
// @route POST /users
// @access Public
export const createNewUser = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const { error } = validateUser(req.body);
  if (error) return next(makeError(400, error.details[0].message));

  const { username, email, firstname, lastname, password, password2 } = req.body;
  
  if (password !== password2) return next(makeError(400, "Passwords don't match"));

  let user = await User.findOne({ username });
  if (user) return next(makeError(409, "User with this username already registrated"));
    
  user = await User.findOne({ email });
  if (user) return next(makeError(409, "User with this email address already registrated"));
  
  user = new User(_.pick(req.body, ['username', 'email', 'password', 'firstname', 'lastname']));
  
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const roleUser = await RoleModel.findOne({ name: 'user'});
  if (roleUser) user.roles.push(roleUser._id);
  else return next(makeError(500, "An error occured"))
  
  await user.save();
  
  if (user) {
    const accessToken = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();
    
    // const userData = _.pick(user, ['_id', 'username', 'firstname', 'lastname', 'email', 'accessToken'])
    // userData.accessToken = accessToken;
    // userData.isAuthenticated = true;
    
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // web bserver only
      secure: true, // https only
      //sameSite: 'None',
      maxAge: ms('7days')
    })

    const { password: pass, ...rest } = user.toObject();
    const data = { accessToken, ...rest };

    res.status(201).json({ success: true, message: "New user created", data });
    // res.status(201).header('x-auth-token', token).json({
    //   success: true,
    //   message: "New user created",
    //   data: userData
    // });
  } else return next(makeError(400, "Invalid user details received"));
};

// @desc Get a user
// @route GET /users/:id
// @access Private
export const getUser = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const userId = req.params.id
  if (!userId) return next(makeError(400, "User ID required"));

  const user = await User.findById(userId).select('-password').lean().exec();
  if (!user) return next(makeError(404, "The user with the given ID was not found"));

  res.status(200).json({ success: true, data: user});
};

// @desc Update a user
// @route PUT /users/:id
// @access Private
export const updateUser = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const { username, email, isActive, password, img, isAdmin, roles, firstname, lastname } = req.body
  if (!username && !email && !(firstname && lastname) && !password)
  return next(makeError(400, "All fields must be provided"));

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  
  const userId = req.params.id
  const user = await User.findById(userId).exec()

  if (!user) return next(makeError(400, "User not found"));

  if (username) {
    if (username !== username.toLowerCase()) {
      return next(makeError(400, "Username must be lowercase"));
    }
    if (username.includes(' ')) {
      return next(makeError(400, "Username must not include space"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(makeError(400, "Username must be alphanumeric"));
    }

    const duplicate = await User.findOne({ username })
      .collation({ locale: 'en', strength: 2}).lean().exec();
  
    if (duplicate && duplicate._id.toString() !== userId) 
      return next(makeError(409, "Username already exists"));

    user.username = username
  }

  if (firstname) {
    user.firstname = firstname
  }

  if (lastname) {
    user.lastname = lastname
  }

  if (email) {
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate && duplicate._id.toString() !== userId) 
      return next(makeError(409, "Email already exists"));

    user.email = email
  }

  if (isActive) {
    user.isActive = isActive
  }

  if (img) {
    user.img = img
  }

  // if (isAdmin) {
  //   user.isAdmin = isAdmin
  // }

  if (roles) {
    user.roles = roles
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.password = newPassword;
  }
  
  const updatedUser = await user.save();

  // const user = await User.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //    $set: {
  //     username,
  //     email,
  //     password: newPassword
  //    }
  //   },
  //   { new: true }
  // )
    
  // if (!user) return next(makeError(400, "User not found."));
  
  const { password: pass, ...rest } = updatedUser.toObject()
  // const { password: pass, ...rest } = updatedUser._doc
  const data = {...rest }
  // const data = { accessToken,...rest }

  res.status(200).json({
    success: true,
    message: `${updatedUser.username} updated`
  });
};

// @desc Delete a user
// @route DELETE /users/:id
// @access Private
export const deleteUser = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const userId = req.params.id
  // console.log(userId)
  if (!userId) return next(makeError(400, "User ID required"));

  // const posts = await Post.lookup(userId).lean().exec();
  const post = await Post.findOne({ user: userId }).lean().exec();
  // console.log(post)
  if (post) return next(makeError(400, "User has posts"));

  const user = await User.findByIdAndDelete(userId);
    
  if (!user) return next(makeError(404, "The user with the given ID was not found"));

  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: `${user.username} with ID ${user._id} was deleted`
  });
};


// @desc Get current User
// @route GET /users/me
// @access Private
export const getCurrentUser = async (req: CustomRequest, res: CustomResponse) => {
  const userId = req.user?._id
  const user = await User.findById(userId).select('-password').lean().exec();
  res.status(200).json({ success: true, data: user});
};

// @desc Update current user
// @route PUT /users/me
// @access Private
export const updateCurrentUser = async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  const { username, email, isActive, password, firstname, lastname, img } = req.body
  // if (!username || typeof isActive !== 'boolean')
  if (!username && !email && !(firstname && lastname) && !password && !img)
  return next(makeError(400, "You must provide data"));

  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const userId = req.user?._id;
  const user = await User.findById(userId);

  if (!user) return next(makeError(400, "User not found"));

  if (!user.isActive) return next(makeError(400, "This user cannot make this request"));
  
  if (username) {
    if (username !== username.toLowerCase()) {
      return next(makeError(400, "Username must be lowercase"));
    }
    if (username.includes(' ')) {
      return next(makeError(400, "Username must not include space"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(makeError(400, "Username must be alphanumeric"));
    }

    const duplicate = await User.findOne({ username })
      .collation({ locale: 'en', strength: 2}).lean().exec();

    if (duplicate && duplicate._id?.toString() !== userId?.toString())
      return next(makeError(409, "Username already exists"));

    user.username = username
  }

  if (firstname) {
    user.firstname = firstname
  }

  if (lastname) {
    user.lastname = lastname
  }

  if (email) {
    const duplicate = await User.findOne({ email }).lean().exec();
    if (duplicate && duplicate._id.toString() !== userId)
       return next(makeError(409, "Email already exists"));

    user.email = email;
  }

  if (isActive) {
    user.isActive = isActive
  }

  if (img) {
    user.img = img
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    user.password = newPassword;
  }

  // const userData = _.pick(user, ['_id', 'username', 'firstname', 'lastname', 'email']);
  const updatedUser = await user.save()

  // const user = await User.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //    $set: {
  //     username,
  //     email,
  //     password: newPassword
  //    }
  //   },
  //   { new: true }
  // )
    
  // if (!user) return next(makeError(400, "User not found."));

  const accessToken = updatedUser.generateAuthToken();
  const refreshToken = updatedUser.generateRefreshToken();
  
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    // sameSite: 'None',
    maxAge: ms('7days')
  })

  const { password: pass, ...rest } = updatedUser.toObject();
  const data = { accessToken,...rest }

  res.status(200).json({
    success: true,
    message: `${updatedUser.username} updated`,
    data
  });
};

// @desc Delete current user
// @route DELETE /users/me
// @access Private
export const deleteCurrentUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id
  if (!userId) return next(makeError(400, "User ID required"));

  // const posts = await Post.lookup(userId).lean().exec();
  const post = await Post.findOne({ user: userId}).lean().exec();

  if (post) return next(makeError(400, "User has posts"));

  const user = await User.findByIdAndDelete(userId);
    
  if (!user) return next(makeError(404, "The user was not found"));

  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: `${user.username} with ID ${user._id} was deleted`
  });
};

// @desc Get current User Posts
// @route GET /users/me/posts
// @access Private
export const getCurrentUserPosts = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id
  if (!userId) return next(makeError(400, "User ID required"));

  const userPosts = await Post
    .find({ user: userId })
    .populate({
      path: 'user',
      select: 'firstname lastname'
    })
    .lean().exec();

  res.status(200).json({ success: true, data: userPosts });
};


function validateUser(req: Request) {
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
