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
} from "../controllers/usersController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import paginate from "../middleware/paginateWithPage.js";
import User from "../models/user.js";

const router = express.Router()

router.route('/')
  // get all users
  .get([auth as RequestHandler, checkRole(['admin', 'superadmin']) as RequestHandler], paginate(User), getAllUsers)
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
  .get([auth as RequestHandler, checkRole(['admin', 'superadmin']) as RequestHandler], getUser)
  // update user data
  .put([auth as RequestHandler, checkRole(['admin', 'superadmin']) as RequestHandler], updateUser) 
  // delete a user
  .delete([auth as RequestHandler, checkRole(['admin', 'superadmin']) as RequestHandler], deleteUser);

export default router;
