require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
// cookie-parser will grave, save,... cookies
const cookieParser = require('cookie-parser');
// to store sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')

const home = require('../routes/home');
const admin = require('../routes/admin');
const posts = require('../routes/posts');


module.exports = function(app) {

  app.use(express.urlencoded({ extended: true}));
  app.use(express.json());
  app.use(cookieParser());
  app.use(methodOverride('_method'));

  app.use('/', home);
  app.use('/admin', admin);
  app.use('/api/posts', posts);

}