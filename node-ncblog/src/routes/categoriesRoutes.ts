import express, { RequestHandler } from "express";
import { createNewCategory, deleteCategory, getAllCategories, getCategory, updateCategory

} from "../controllers/categoriesController.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import paginate from "../middleware/paginate.js";
import Category from "../models/category.js";

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
