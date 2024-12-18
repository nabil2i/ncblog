import express, { RequestHandler } from "express";
import {
  createNewBook, deleteBook, getAllBooks, getBook, updateBook
} from "../controllers/booksController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import paginate from "../middleware/paginateWithPage.js";
import BookModel from "../models/book.js";

const router = express.Router();

router.route('/')
  // get all books
  .get(paginate(BookModel), getAllBooks)
  // create a book
  .post([auth as RequestHandler, checkRole(['admin']) as RequestHandler], createNewBook);

router.route('/:id')
  // get a book
  .get(getBook)
  // update a book
  .put([auth as RequestHandler, checkRole(['admin']) as RequestHandler], updateBook)
  // delete a book
  .delete([auth as RequestHandler, checkRole(['admin']) as RequestHandler], deleteBook);

export default router;
