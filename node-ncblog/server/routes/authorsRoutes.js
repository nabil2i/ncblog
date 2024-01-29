import express from "express";
import { createNewAuthor, deleteAuthor, getAllAuthors, getAuthor, updateAuthor } from "../controllers/authorsController.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import paginate from "../middleware/paginate.js";
import Author from "../models/author.js";

const router = express.Router();

router.use(auth);
router.use(admin);

router.route('/')
  // get all authors
  .get(paginate(Author), getAllAuthors)
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
