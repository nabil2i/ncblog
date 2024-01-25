const express = require('express');
const { Author } = require('../models/author');
const router = express.Router();
const paginate = require('../middleware/paginate');
const authorsController = require('../controllers/authorsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.use(auth);
router.use(admin);

router.route('/')
  // get all authors
  .get(paginate(Author), authorsController.getAllAuthors)
  // create an author
  .post(authorsController.createNewAuthor);

router.route('/:id')
  // get an author
  .get(authorsController.getAuthor)
  // update an author
  .put(authorsController.updateAuthor)
  // delete an author
  .delete(authorsController.deleteAuthor);

module.exports = router;
