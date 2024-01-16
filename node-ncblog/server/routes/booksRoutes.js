const express = require('express');
const {Book, validateBook } = require('../models/book');
const router = express.Router();
const paginate = require('../middleware/paginate');
const booksController = require('../controllers/booksController');
const editor = require('../middleware/editor');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.route('/')
  // get all books
  .get(paginate(Book), booksController.getAllBooks)
  // create a book
  .post([auth, admin], booksController.createNewBook);

router.route('/:id')
  // get a book
  .get(booksController.getBook)
  // update a book
  .put([auth, admin], booksController.updateBook)
  // delete a book
  .delete([auth, admin], booksController.deleteBook);

module.exports = router;
