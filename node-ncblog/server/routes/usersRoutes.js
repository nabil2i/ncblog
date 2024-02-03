import express from "express";
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
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import editor from "../middleware/editor.js";
import paginate from "../middleware/paginate.js";
import User from "../models/user.js";

const router = express.Router()

router.route('/')
  // get all users
  .get([auth, admin], paginate(User), getAllUsers)
  // registration
  .post(createNewUser)

router.route('/me')
  // get logged in user data
  .get(auth,getCurrentUser)
  // update logged in user data
  .put(auth,updateCurrentUser)
  // delete logged in user
  .delete(auth,deleteCurrentUser);

// router.route('/me/posts')
//   // get logged in user posts
//   .get([auth, editor],getCurrentUserPosts)

router.route('/:id')
// get a user
  .get([auth, admin], getUser)
  // update user data
  .put([auth, admin], updateUser) 
  // delete a user
  .delete([auth, admin], deleteUser);

export default router;
