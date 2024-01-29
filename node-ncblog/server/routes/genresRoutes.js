
import express from "express";
import { createNewGenre, deleteGenre, getAllGenres, getGenre, updateGenre} from "../controllers/genresController.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import paginate from "../middleware/paginate.js";
import Genre from "../models/genre.js";

const router = express.Router();

router.use(auth);
router.use(admin);

router.route('/')
  // get all genres
  .get(paginate(Genre), getAllGenres)
  // create a genre
  .post(createNewGenre);

router.route('/:id')
  // get a genre
  .get(getGenre)
  // update a genre
  .put(updateGenre)
  // delete a genre
  .delete(deleteGenre);

export default router;
