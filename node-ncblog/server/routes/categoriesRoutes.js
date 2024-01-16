const express = require('express');
const {Category, validateCategory } = require('../models/category');
const router = express.Router();
const paginate = require('../middleware/paginate');
const categoriesController = require('../controllers/categoriesController');
const editor = require('../middleware/editor');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.route('/')
  // get all categories
  .get([auth, admin], paginate(Category), categoriesController.getAllCategories)
  // create a category
  .post([auth, admin], categoriesController.createNewCategory);

router.route('/:id')
  // get a category
  .get([auth, admin], categoriesController.getCategory)
  // update a category
  .put([auth, admin], categoriesController.updateCategory)
  // delete a category
  .delete([auth, admin], categoriesController.deleteCategory);

module.exports = router;
