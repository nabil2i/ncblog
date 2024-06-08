import jwt, { JwtPayload, Secret} from "jsonwebtoken";
import dotenv from "dotenv";
import { makeError } from "../utils/responses.ts"
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.ts";

interface CustomRequest extends Request {
  user: User
}

dotenv.config();

export default function (req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  // console.log(authHeader)
  if (!authHeader || !authHeader.startsWith || !authHeader.startsWith('Bearer '))
    return next(makeError(401, "Unauthorized"));

  const accessToken = authHeader.split(' ')[1]
  // console.log(accessToken)
  const jwtSecret = process.env.NODE_APP_JWT_ACCESS_SECRET

  jwt.verify(
    accessToken,
    jwtSecret as Secret,
    (err, decoded) => {
      // console.log(err)
      if (err || !decoded)
        return next(makeError(403, "Forbidden"));

      req.user = decoded as User;
      next();
    }
  )



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
