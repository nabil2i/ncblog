require('dotenv').config();
const path = require('path')
const express = require('express');
const cors = require('cors');
const corsOptions = require('../../config/corsOptions')
// const expressLayout = require('express-ejs-layouts'); // if using ejs
const methodOverride = require('method-override');
// cookie-parser will grave, save,... cookies
const cookieParser = require('cookie-parser');
// to store sessions
const session = require('express-session');
const sessionOptions = require('../../config/sessionOptions')
const { logger } = require('../middleware/logger');
const errorHandler = require('../middleware/errorHandler');
const home = require('../routes/home');
const admin = require('../routes/admin');
const posts = require('../routes/posts');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../routes/error');


module.exports = function(app) {

  app.use(cors(corsOptions));
  app.use(logger);
  app.use(express.urlencoded({ extended: true})); // to past params in post request, forms
  app.use(express.json());
  app.use(cookieParser());
  app.use(methodOverride('_method'));
  app.use(session(sessionOptions));
  
  app.use('/', express.static(path.join(__dirname, '..', 'public'))); //app.use(express.static('public'));
  // templating engine
  // app.use(expressLayout);
  // app.set('layout', './layouts/main'); // default layout
  // app.set('view engine', 'ejs'); // view engine is ejs
  
  app.use('/', home);
  app.use('/admin', admin);
  app.use('/api/posts', posts);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.all('*', error);
  app.use(errorHandler)
}
