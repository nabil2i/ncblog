require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const expressLayout = require('express-ejs-layouts'); // if using ejs
const methodOverride = require('method-override');
// cookie-parser will grave, save,... cookies
const cookieParser = require('cookie-parser');
// to store sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')

const home = require('../routes/home');
const admin = require('../routes/admin');
const posts = require('../routes/posts');
const users = require('../routes/users');
const auth = require('../routes/auth');


module.exports = function(app) {

  app.use(cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5000',
      'http://localhost:3000'
    ]
  }));
  app.use(express.urlencoded({ extended: true})); // to past params in post request, forms
  app.use(express.json());
  app.use(cookieParser());
  app.use(methodOverride('_method'));

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
    // for seeing the cookie expiration time
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  }));

  // public folder for JS images etc
  // app.use(express.static('public'));

  // templating engine
  // app.use(expressLayout);
  // app.set('layout', './layouts/main'); // default layout
  // app.set('view engine', 'ejs'); // view engine is ejs

  app.use('/', home);
  app.use('/admin', admin);
  app.use('/api/posts', posts);
  app.use('/api/users', users);
  app.use('/api/auth', auth);

}
