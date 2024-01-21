const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
// const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const editor = require('../middleware/editor');
const express = require('express');
const { User, validate } = require('../models/user');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
  // get all users
  .get([auth, admin], usersController.getAllUsers)
  // registration
  .post(usersController.createNewUser)

router.route('/me')
  // get logged in user data
  .get(auth,usersController.getCurrentUser)
  // update logged in user data
  .put(auth,usersController.updateCurrentUser)
  // delete logged in user
  .delete(auth,usersController.deleteCurrentUser);

router.route('/me/posts')
  // get logged in user posts
  .get([auth, editor],usersController.getCurrentUserPosts)

router.route('/:id')
// get a user
  .get([auth, admin], usersController.getUser)
  // update user data
  .put([auth, admin], usersController.updateUser) 
  // delete a user
  .delete([auth, admin], usersController.deleteUser);

module.exports = router;
