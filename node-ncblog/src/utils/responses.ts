// export const makeError = (statusCode, message) => {
//   return {
//     success: false,
//     message,
//     isError: true
//   }

import { CustomError } from "../models/error.js";

// }
export const makeError = (statusCode: number, message: string) => {
  const error = new Error() as CustomError;
  error.statusCode = statusCode;
  error.message = message;
  // error.error = err;
  return error;
}

// export const makeSuccess = (statusCode, message, data) => {
//   const response = new Response();
//   response.success = true;
//   response.statusCode = statusCode;
//   response.message = message;
//   response.data = data;
//   return response;
// }
