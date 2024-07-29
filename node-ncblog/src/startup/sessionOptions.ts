import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config()

const sessionOptions = {
  secret: process.env.NODE_APP_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.NODE_APP_MONGODB_URI,
    // ttl: 14 * 24 * 60 * 60,
    // autoRemove: 'native' 
  }),
  cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}

export default sessionOptions
