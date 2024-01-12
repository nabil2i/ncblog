const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.route('/')
  // login
  .post(authController.login)

  router.route('/logout')
  //logout
  .post(auth, authController.logout)


module.exports = router;
