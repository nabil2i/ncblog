import express, { RequestHandler } from "express";
import { google, login, logout, refresh } from "../controllers/authController";
import loginLimiter from "../middleware/loginLimiter";
import auth from "../middleware/auth";

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
  .post(auth as RequestHandler, logout)


export default router;
