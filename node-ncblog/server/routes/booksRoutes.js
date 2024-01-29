import express from "express";
import { createNewBook, deleteBook, getAllBooks, getBook, updateBook} from "../controllers/booksController.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import paginate from "../middleware/paginate.js";
import Book from "../models/book.js";

const router = express.Router();

router.route('/')
  // get all books
  .get(paginate(Book), getAllBooks)
  // create a book
  .post([auth, admin], createNewBook);

router.route('/:id')
  // get a book
  .get(getBook)
  // update a book
  .put([auth, admin], updateBook)
  // delete a book
  .delete([auth, admin], deleteBook);

export default router;
