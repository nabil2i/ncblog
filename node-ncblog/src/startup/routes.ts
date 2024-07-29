import compression from "compression";
import cors from "cors";
import express, { ErrorRequestHandler, Express } from "express";
import path from "path";
//import sessionOptions from './sessionOptions.ts';
import corsOptions from "./corsOptions.ts";
// import expressLayout from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import { logger } from "../middleware/logger.ts";
import auth from "../routes/authRoutes.ts";
import authors from "../routes/authorsRoutes.ts";
import books from "../routes/booksRoutes.ts";
import categories from "../routes/categoriesRoutes.ts";
import error from "../routes/error.ts";
import genres from "../routes/genresRoutes.ts";
// import home from "../routes/home.ts";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import errorHandler from "../middleware/errorHandler.ts";
import comments from "../routes/commentsRoutes.ts";
import posts from "../routes/postsRoutes.ts";
import users from "../routes/usersRoutes.ts";
//import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function(app: Express) {
  app.use(cors(corsOptions));
  app.use(compression())
  app.use(logger);
  app.use(express.urlencoded({ extended: true}));
  app.use(express.json());
  app.use(cookieParser());
  app.use(methodOverride('_method'));
  // app.use(session(sessionOptions));
  
  // const __dirname = path.resolve();
  // app.use(express.static(path.join(__dirname, '..', '..', '..', 'react-ncblog', 'dist')));
  app.use('/', express.static(path.join(__dirname, '..', 'public')));
  // app.use(express.static('public'));
  // templating engine
  // app.use(expressLayout);
  // app.set('layout', './layouts/main'); // default layout
  // app.set('view engine', 'ejs'); // view engine is ejs
  
  // app.use('/', home);
  app.use('/api/posts', posts);
  app.use('/api/books', books);
  app.use('/api/authors', authors);
  app.use('/api/genres', genres);
  app.use('/api/categories', categories);
  app.use('/api/users', users);
  app.use('/api/comments', comments);
  app.use('/api/auth', auth);
  // app.get('*', (req, res, next) => {
  //   res.sendFile(path.join(__dirname, '..', '..', '..', 'react-ncblog', 'dist', 'index.html'));
  // });
  app.all('*', error);
  app.use(errorHandler as ErrorRequestHandler);
}
