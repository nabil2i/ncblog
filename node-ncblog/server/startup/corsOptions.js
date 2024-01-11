const allowedOrigins = require('./allowedOrigins')

// console.log(allowedOrigins)

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      console('Not allowed by CORS')
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, //sets Access Control Allow credentials header
  optionsSuccessStatus: 200
}

module.exports = corsOptions
