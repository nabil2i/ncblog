import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Joi from "joi";
import jwt from "jsonwebtoken";
import ms from "ms";
import User from "../models/user.js";
import { makeError } from "../utils/responses.js";

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

  const data = {
    accessToken,
    // ...userData
  }

  res.status(200).json({
    success: true,
    data
  });
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
