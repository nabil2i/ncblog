import express, { RequestHandler } from "express";
import { createNewCategory, deleteCategory, getAllCategories, getCategory, updateCategory} from "../controllers/categoriesController";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
import paginate from "../middleware/paginate";
import Category from "../models/category";

const router = express.Router();

router.use(auth as RequestHandler);
router.use(admin as RequestHandler);

router.route('/')
  // get all categories
  .get(paginate(Category), getAllCategories)
  // create a category
  .post(createNewCategory);

router.route('/:id')
  // get a category
  .get(getCategory)
  // update a category
  .put(updateCategory)
  // delete a category
  .delete(deleteCategory);

export default router;
