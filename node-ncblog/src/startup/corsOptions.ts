
import { CorsOptions } from 'cors';
import allowedOrigins from "./allowedOrigins";

// console.log(allowedOrigins)

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // origin: (origin: string, callback: (error: Error | null, success?: boolean) => void) => {
    // console.log("cors: ", origin)
    // console.log("allowed origins: ", allowedOrigins)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      //console('Not allowed by CORS')
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, //sets Access Control Allow credentials header
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}

export default corsOptions
// module.exports = corsOptions
