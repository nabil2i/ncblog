import rateLimit from "express-rate-limit";
import { logEvents } from "./logger.ts";
import ms from "ms";

const loginLimiter = rateLimit({
  windowMs: ms('60s'),
  max: 5, // Limit each IP to 5 login requests per `window` per minute
  message:
      { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
  handler: (req, res, next, options) => {
      logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
      // res.status(options.statusCode).send(options.message)
      res.status(options.statusCode).json({
        success: true,
        message: options.message
      });
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export default loginLimiter
