import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel, { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";

interface CustomRequest extends Request {
  user?: IUser
}

dotenv.config();

export default async function auth(req: Request, res: Response, next: NextFunction) {
  // console.log("verifying credentials...")
  const authHeader = req.headers.authorization

  // console.log("Header:", authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return next(makeError(401, "Unauthorized"));

  const accessToken = authHeader.split(' ')[1]
  // console.log(accessToken)

  if (!accessToken)
    return next(makeError(401, "Unauthorized"))
  
  const jwtSecret = process.env.NODE_APP_JWT_ACCESS_SECRET
  // console.log("jwtsecret: ", jwtSecret)

  if (!jwtSecret)
    return next(makeError(500, "Internal Server Error: JWT secret is not defined"));

  try {
    const decoded = jwt.verify(accessToken, jwtSecret) as JwtPayload;
    const user = await UserModel.findById((decoded)._id);
    if (!user) return next(makeError(401, "Unauthorized"));
    req.user = user;
    next()

  } catch (err) {
    return next(makeError(403, "Token invalid or expired"));
  }
  // jwt.verify(
  //   accessToken,
  //   jwtSecret as Secret,
  //   (err: jwt.VerifyErrors | null, decoded) => {
  //    // console.log("decoded: ", decoded)
  //     if (err || !decoded)
  //       // console.log("err: ", err)
  //       // return next(makeError(403, err));
  //       return next(makeError(403, "Forbidden"));

  //     req.user = decoded as User;
  //     next();
  //   }
  // )



  // // if taking token from cookies
  // const refreshToken = req.cookies.jwt;

  // if (!refreshToken) {
  //   return res.status(401).json({
  //     success: false,
  //     error: {
  //       code: 401,
  //       message: 'Unauthorized'
  //     }
  //   });
  // }
  
  // try {
  //   const decoded = jwt.verify(
  //     jwt,
  //     process.env.NODE_APP_JWT_REFRESH_SECRET
  //   );
  //   req.user = decoded;
  //   next();
  // } catch(ex) {
  //   res.status(400).json({
  //     success: false,
  //     error: {
  //       code: 400,
  //       message: 'Invalid token'
  //     }
  //   });
  // }
}
