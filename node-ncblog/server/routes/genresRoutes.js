const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();
const paginate = require('../middleware/paginate');
const genresController = require('../controllers/genresController.js');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.use(auth);
router.use(admin);

router.route('/')
  // get all genres
  .get(paginate(Genre), genresController.getAllGenres)
  // create a genre
  .post(genresController.createNewGenre);

router.route('/:id')
  // get a genre
  .get(genresController.getGenre)
  // update a genre
  .put(genresController.updateGenre)
  // delete a genre
  .delete(genresController.deleteGenre);

module.exports = router;
