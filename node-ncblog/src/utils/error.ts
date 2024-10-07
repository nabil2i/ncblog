
export interface CustomError extends Error {
  isError: boolean;
  status: number
}

export const makeError = (status: number, message: string): CustomError => {
  // console.log(`Creating Error: Status ${status}, Message: ${message}`);

  const error = new Error(message) as CustomError;
  error.isError = true;
  error.status = status;

  // console.log(`Created Error: Status ${error.status}, Message: ${error.message}`);
  
  return error;
}
