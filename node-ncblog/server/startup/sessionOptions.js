const MongoStore = require('connect-mongo')

// console.log("mongo uri: ", process.env.NODE_APP_MONGODB_URI)

const sessionOptions = {
  secret: process.env.NODE_APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.NODE_APP_MONGODB_URI
    }),
    // // for seeing the cookie expiration time
    // cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}

module.exports = sessionOptions
