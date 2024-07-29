import express, { RequestHandler } from "express";
import { createNewBook, deleteBook, getAllBooks, getBook, updateBook} from "../controllers/booksController";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
import paginate from "../middleware/paginate";
import BookModel from "../models/book";

const router = express.Router();

router.route('/')
  // get all books
  .get(paginate(BookModel), getAllBooks)
  // create a book
  .post([auth as RequestHandler, admin as RequestHandler], createNewBook);

router.route('/:id')
  // get a book
  .get(getBook)
  // update a book
  .put([auth as RequestHandler, admin as RequestHandler], updateBook)
  // delete a book
  .delete([auth as RequestHandler, admin as RequestHandler], deleteBook);

export default router;
