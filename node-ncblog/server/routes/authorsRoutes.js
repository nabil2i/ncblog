const express = require('express');
const {Author, validateAuthor } = require('../models/author');
const router = express.Router();
const paginate = require('../middleware/paginate');
const authorsController = require('../controllers/authorsController');
const editor = require('../middleware/editor');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.route('/')
  // get all author
  .get([auth, admin], paginate(Author), authorsController.getAllAuthors)
  // create a author
  .post([auth, admin], authorsController.createNewAuthor);

router.route('/:id')
  // get a author
  .get(authorsController.getAuthor)
  // update a author
  .put([auth, admin], authorsController.updateAuthor)
  // delete a author
  .delete([auth, admin], authorsController.deleteAuthor);

module.exports = router;
