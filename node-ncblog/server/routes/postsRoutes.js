import express from "express";
import {
  createComment,
  createNewPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getComment,
  deleteUserComment,
  updateUserComment,
  getPost,
  likePost,
  updateComment,
  deleteCurrentUserPost,
  updatePost,
  updateCurrentUserPost,
  getPostComments
} from "../controllers/postsController.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import writer from "../middleware/writer.js";
import paginate from "../middleware/paginate.js";
import Post from "../models/post.js";

const router = express.Router();

router.route('/')
  // get all blog posts
  .get(paginate(Post), getAllPosts)
  // create a blog post
  .post([auth, writer], createNewPost);

router.route('/:id')
  // get a blog post
  .get(getPost)
  // update a blog post
  .put([auth, admin], updatePost)
  // delete a blog post
  .delete([auth, admin], deletePost)

router.route('/:id/like')
// like a post
  .put(auth, likePost);


router.route('/:id/:userId')  
  .delete([auth, writer], deleteCurrentUserPost)
  .put([auth, writer], updateCurrentUserPost);

router.route('/:id/comments')
  // get all comments of a blog post
  .get(getPostComments)
  // create a comment on a blog post
  .post(auth, createComment)

//
router.route('/:id/comments/:cid')
  // get a comment of a blog post
  .get([auth, admin], getComment)
  // update a comment of a blog post
  .put([auth, admin], updateComment)
    // delete a comment of a blog post
  .delete([auth, admin], deleteComment);

router.route('/:id/comments/:cid/:uid') 
  // delete a comment of a blog post
  .put([auth], updateUserComment)
  // delete a comment of a blog post
  .delete([auth], deleteUserComment);


export default router;
