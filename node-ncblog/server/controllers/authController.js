import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Joi from "joi";
import jwt from "jsonwebtoken";
import ms from "ms";
import User from "../models/user.js";
import { makeError } from "../utils/responses.js";
import { generatePassword, makeNames, makeUsername } from "../utils/user.js";

dotenv.config();

// @desc Login
// @route POST /auth
// @access Public
export const login = async (req, res, next) => {
  const { error } = validate(req.body);
      
  if (error) return next(makeError(400, error.details[0].message));
  
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (!user || !user.isActive) return next(makeError(400, "Invalid username or password"));
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return next(makeError(400, "Invalid username or password"));
  
  const accessToken = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();
  
  // const userData = _.pick(user, ['_id', 'username', 'email', 'firstname', 'lastname', 'accessToken'])
  // userData.accessToken = accessToken;
  // userData.isAuthenticated = true;
  
  res.cookie('jwt', refreshToken, {
    httpOnly: true, // web bserver only
    secure: true, // https only
    sameSite: 'None',
    maxAge: ms('7days')
  })
  
  const { password: pass, ...rest } = user._doc;
  const data = { accessToken, ...rest }

  res.status(200).json({ success: true, data });
  // res.status(200).header('x-auth-token', token).json({
  //   success: true,
  //   data: userData
  //  })
};


// @desc Refresh token
// @route GET /auth/refresh
// @access Public
export const refresh = async (req, res, next) => {
  const cookies = req.cookies

  if (!cookies.jwt) return next(makeError(401, "Unauthorized"));

  const refreshToken = cookies.jwt
  // console.log("refresh result resh token", refreshToken)

  jwt.verify(
    refreshToken,
    process.env.NODE_APP_JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) return next(makeError(403, "Forbidden"));

      const user = await User.findOne({ username: decoded.username });

      if (!user) return next(makeError(401, "Unauthorized"));

      const accessToken = user.generateAuthToken();

      res.status(200).json({
        success: true,
        data: { accessToken }
      });
    }
  );
};

// @desc Google OAuth
// @route POST /auth/google
// @access Public
export const google = async (req, res, next) => {
  const { name, email, photo } = req.body;
  const user = await User.findOne({ email });
  // console.log(user)
  if (user) {
    // login the user
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: ms('7days')
    })

    const { password: pass, ...rest } = user._doc;
    const data = { accessToken, ...rest }
  
    res.status(200).json({ success: true, data });
  } else {
    // signup the user
    const username = await makeUsername(name);
    if (!username) return next(makeError(500, "An error occured"));

    const names = makeNames(name);
    const firstname = names.firstname;
    const lastname = names.lastname;
    const img = photo;
    const generatedPassword = generatePassword();

    const newUser = new User({ username, email, firstname, lastname, img });
    
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(generatedPassword, salt);

    await newUser.save();

    if (newUser) {
      // console.log(newUser);
      const accessToken = newUser.generateAuthToken();
      const refreshToken = newUser.generateRefreshToken();
  
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: ms('7days')
      })
  
      const { password: pass, ...rest } = newUser._doc;
      const data = { accessToken, ...rest }
    
      res.status(201).json({ success: true, data });
    } else {
      return next(makeError(400, 'Invalid use details'))
    }
  } 
};

// @desc Logout
// @route POST /auth/logout
// @access Private
export const logout = async (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });
  res.status(200).json({ success: true, message: "Logout successful"});
};


function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(req);
}
