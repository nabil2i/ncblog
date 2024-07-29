import express from "express";
import { createNewAuthor, deleteAuthor, getAllAuthors, getAuthor, updateAuthor } from "../controllers/authorsController.ts";
import admin from "../middleware/admin.ts";
import auth from "../middleware/auth.ts";
import paginate from "../middleware/paginate.ts";
import AuthorModel from "../models/author.ts";

const router = express.Router();

router.use(auth as express.RequestHandler);
router.use(admin as express.RequestHandler);

router.route('/')
  // get all authors
  .get(paginate(AuthorModel), getAllAuthors)
  // create an author
  .post(createNewAuthor);

router.route('/:id')
  // get an author
  .get(getAuthor)
  // update an author
  .put(updateAuthor)
  // delete an author
  .delete(deleteAuthor);

export default router;
