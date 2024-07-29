
import express, { RequestHandler } from "express";
import { createNewGenre, deleteGenre, getAllGenres, getGenre, updateGenre} from "../controllers/genresController";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
import paginate from "../middleware/paginate";
import Genre from "../models/genre";

const router = express.Router();

router.use(auth as RequestHandler);
router.use(admin as RequestHandler);

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
