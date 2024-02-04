import cors from "cors";
import express from "express";
import path from "path";
import corsOptions from "./corsOptions.js";
// import expressLayout from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import session from "express-session";
import methodOverride from "method-override";
import errorHandler from "../middleware/errorHandler.js";
import { logger } from "../middleware/logger.js";
import auth from "../routes/authRoutes.js";
import authors from "../routes/authorsRoutes.js";
import books from "../routes/booksRoutes.js";
import categories from "../routes/categoriesRoutes.js";
import error from "../routes/error.js";
import genres from "../routes/genresRoutes.js";
import home from "../routes/home.js";
import posts from "../routes/postsRoutes.js";
import users from "../routes/usersRoutes.js";
import comments from "../routes/commentsRoutes.js";
import sessionOptions from "./sessionOptions.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
export default function(app) {

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

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
  app.use('/api/comments', comments);
  app.use('/api/auth', auth);
  app.all('*', error);
  app.use(errorHandler)
}
