const express = require('express');
const {Genre, validateGenre } = require('../models/genre');
const router = express.Router();
const paginate = require('../middleware/paginate');
const genresController = require('../controllers/genresController.js');
const editor = require('../middleware/editor');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.route('/')
  // get all genres
  .get([auth, admin], paginate(Genre), genresController.getAllGenres)
  // create a genre
  .post([auth, admin], genresController.createNewGenre);

router.route('/:id')
  // get a genre
  .get([auth, admin], genresController.getGenre)
  // update a genre
  .put([auth, admin], genresController.updateGenre)
  // delete a genre
  .delete([auth, admin], genresController.deleteGenre);

module.exports = router;
