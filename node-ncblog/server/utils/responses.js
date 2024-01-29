export const makeError = (statusCode, message, err) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  error.error = err;
  return error;
}

export const makeSuccess = (statusCode, message, data) => {
  const response = new Response();
  response.success = true;
  response.statusCode = statusCode;
  response.message = message;
  response.data = data;
  return response;
}
