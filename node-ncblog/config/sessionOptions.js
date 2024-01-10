require('dotenv').config();
const MongoStore = require('connect-mongo')

const sessionOptions = {
  secret: process.env.NODE_ENV_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.NODE_ENV_MONGODB_URI
    }),
    // // for seeing the cookie expiration time
    // cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}

module.exports = sessionOptions
