import express, { RequestHandler } from "express";
import {
  createNewUser,
  deleteCurrentUser,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  // getCurrentUserPosts,
  getUser,
  updateCurrentUser,
  updateUser
} from "../controllers/usersController";
import admin from "../middleware/admin";
import auth from "../middleware/auth";
import writer from "../middleware/writer";
import paginate from "../middleware/paginate";
import User from "../models/user";

const router = express.Router()

router.route('/')
  // get all users
  .get([auth as RequestHandler, admin as RequestHandler], paginate(User), getAllUsers)
  // registration
  .post(createNewUser)

router.route('/me')
  // get logged in user data
  .get(auth as RequestHandler, getCurrentUser as RequestHandler)
  // update logged in user data
  .put(auth as RequestHandler, updateCurrentUser as RequestHandler)
  // delete logged in user
  .delete(auth as RequestHandler, deleteCurrentUser as RequestHandler);

// router.route('/me/posts')
//   // get logged in user posts
//   .get([auth, writer],getCurrentUserPosts)

router.route('/:id')
// get a user
  .get([auth as RequestHandler, admin as RequestHandler], getUser)
  // update user data
  .put([auth as RequestHandler, admin as RequestHandler], updateUser) 
  // delete a user
  .delete([auth as RequestHandler, admin as RequestHandler], deleteUser);

export default router;
