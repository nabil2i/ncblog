import { logEvents } from "./logger.js";
import {  } from "../models/user.js";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/error.js";


// declare module 'express-serve-static-core' {
//   interface Response {
//       error: (code: number, message: string) => Response;
//       success: (code: number, message: string, result: any) => Response
//   }
// }

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // console.error("Error caught in handler:", err);

  const customErr = err as CustomError
  logEvents(`${err.name}: ${err.message}\t${req.method}\t
  ${req.url}\t${req.headers.origin}`, 'errLog.log')
  
  // console.log(err.status)
  const status = customErr.status;
  
  console.error(
    `Error Status: ${status}, Error Name: ${customErr.name}, Message: ${customErr.message}`
  );
  // console.error("Error Stack: ", err.stack)

  res.status(status).json({
    success: false,
    isError: true,
    status: status,
    message: customErr.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })

  // console.log("Response: ", status, err.message)
}

export default errorHandler
