import express from "express";
import { google, login, logout, refresh } from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import loginLimiter from "../middleware/loginLimiter.js";

const router = express.Router();

router.route('/')
  // login
  .post(loginLimiter, login)

router.route('/refresh')
  // refresh token
  .get(refresh)

  router.route('/google')
  //google OAuth
  .post(google)

  router.route('/logout')
  //logout
  .post(auth, logout)


export default router;
