import { makeError } from "../utils/responses.js"

export default validate = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return next(makeError(400, error.details[0].message));
    next();
  }
}
