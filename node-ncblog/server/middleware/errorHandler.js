import { logEvents } from "./logger.js";

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}\t${req.method}\t
  ${req.url}\t${req.headers.origin}`, 'errLog.log')

  console.log(err.stack)
  const status = err.statusCode ? err.statusCode : 500

  res.status(status)

  res.json({
    success: false,
    error: { code: status, message: err.message },
    message: err.message,
    isError: true
  })
}

export default errorHandler
