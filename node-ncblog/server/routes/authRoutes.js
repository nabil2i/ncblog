const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const loginLimiter = require('../middleware/loginLimiter')

router.route('/')
  // login
  .post(loginLimiter, authController.login)

router.route('/refresh')
  // refresh token
  .get(authController.refresh)

  router.route('/logout')
  //logout
  .post(auth, authController.logout)


module.exports = router;
