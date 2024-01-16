const path = require('path')
const express = require('express');
const cors = require('cors');
const corsOptions = require('./corsOptions')
// const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionOptions = require('./sessionOptions')
const { logger } = require('../middleware/logger');
const errorHandler = require('../middleware/errorHandler');
const home = require('../routes/home');
const posts = require('../routes/postsRoutes');
const authors = require('../routes/authorsRoutes');
const books = require('../routes/booksRoutes');
const genres = require('../routes/genresRoutes');
const categories = require('../routes/categoriesRoutes');
const users = require('../routes/usersRoutes');
const auth = require('../routes/authRoutes');
const error = require('../routes/error');


module.exports = function(app) {

  app.use(cors(corsOptions));
  app.use(logger);
  app.use(express.urlencoded({ extended: true}));
  app.use(express.json());
  app.use(cookieParser());
  app.use(methodOverride('_method'));
  app.use(session(sessionOptions));
  
  app.use('/', express.static(path.join(__dirname, '..', 'public')));
  // app.use(express.static('public'));
  // templating engine
  // app.use(expressLayout);
  // app.set('layout', './layouts/main'); // default layout
  // app.set('view engine', 'ejs'); // view engine is ejs
  
  app.use('/', home);
  app.use('/api/posts', posts);
  app.use('/api/books', books);
  app.use('/api/authors', authors);
  app.use('/api/genres', genres);
  app.use('/api/categories', categories);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.all('*', error);
  app.use(errorHandler)
}
