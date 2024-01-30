import { logEvents } from "./logger.js";

const errorHandler = (err, req, res, next) => {
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
