const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const paginate = require('../middleware/paginate');
const categoriesController = require('../controllers/categoriesController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.use(auth);
router.use(admin);

router.route('/')
  // get all categories
  .get(paginate(Category), categoriesController.getAllCategories)
  // create a category
  .post(categoriesController.createNewCategory);

router.route('/:id')
  // get a category
  .get(categoriesController.getCategory)
  // update a category
  .put(categoriesController.updateCategory)
  // delete a category
  .delete(categoriesController.deleteCategory);

module.exports = router;
