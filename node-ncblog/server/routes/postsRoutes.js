import express from "express";
import {
  createComment,
  createNewPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getComment,
  deleteUserComment,
  getPost,
  updateComment,
  deleteCurrentUserPost,
  updatePost,
  updateCurrentUserPost
} from "../controllers/postsController.js";
import admin from "../middleware/admin.js";
import auth from "../middleware/auth.js";
import editor from "../middleware/editor.js";
import paginate from "../middleware/paginate.js";
import Post from "../models/post.js";

const router = express.Router();

router.route('/')
  // get all blog posts
  .get(paginate(Post), getAllPosts)
  // create a blog post
  .post([auth, editor], createNewPost);

router.route('/:id')
  // get a blog post
  .get(getPost)
  // update a blog post
  .put([auth, admin], updatePost)
  // delete a blog post
  .delete([auth, admin], deletePost)

router.route('/:id/:userId')  
  .delete([auth, editor], deleteCurrentUserPost)
  .put([auth, editor], updateCurrentUserPost);

router.route('/:id/comments')
  // get all comments of a blog post
  // .get([auth, admin], paginate(Comment), getPostComments)
  // create a comment on a blog post
  .post(auth, createComment)

router.route('/:id/comments/:cid')
  // get a comment of a blog post
  .get([auth, admin], getComment)
  // update a comment of a blog post
  .put([auth, admin], updateComment)
    // delete a comment of a blog post
  .delete([auth, admin], deleteComment);

router.route('/:id/comments/:cid/:uid') 
  // delete a comment of a blog post
  .delete([auth], deleteUserComment);


export default router;
