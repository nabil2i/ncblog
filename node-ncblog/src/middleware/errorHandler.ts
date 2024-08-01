import { logEvents } from "./logger.js";
import {  } from "../models/user.js";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/error.js";

// interface CustomRequest extends Request {
//   user: User
// }

// declare module 'express-serve-static-core' {
//   interface Response {
//       error: (code: number, message: string) => Response;
//       success: (code: number, message: string, result: any) => Response
//   }
// }

const errorHandler = (err: CustomError, req: Request, res: Response) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t
  ${req.url}\t${req.headers.origin}`, 'errLog.log')

  console.log("stack", err.stack)
  const status = err.statusCode ? err.statusCode : 500

  res.status(status)
  // console.log(err);
  res.json({
    success: false,
    // error: { code: status, message: res.message },
    message: err.message,
    isError: true
  })

  // console.log("response::", res)
}

export default errorHandler
