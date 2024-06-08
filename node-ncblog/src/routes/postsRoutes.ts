import express, { RequestHandler } from "express";
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
} from "../controllers/postsController.ts";
import admin from "../middleware/admin.ts";
import auth from "../middleware/auth.ts";
import writer from "../middleware/writer.ts";
import paginate from "../middleware/paginate.ts";
import Post from "../models/post.ts";

const router = express.Router();

router.route('/')
  // get all blog posts
  .get(paginate(Post), getAllPosts)
  // create a blog post
  .post([auth as RequestHandler, writer as RequestHandler], createNewPost);

router.route('/:id')
  // get a blog post
  .get(getPost)
  // update a blog post
  .put([auth as RequestHandler, admin as RequestHandler], updatePost)
  // delete a blog post
  .delete([auth as RequestHandler, admin as RequestHandler], deletePost)

router.route('/:id/like')
// like a post
  .put(auth as RequestHandler, likePost as RequestHandler);


router.route('/:id/:userId')  
  .delete([auth as RequestHandler, writer as RequestHandler], deleteCurrentUserPost as RequestHandler)
  .put([auth as RequestHandler, writer as RequestHandler], updateCurrentUserPost as RequestHandler);

router.route('/:id/comments')
  // get all comments of a blog post
  .get(getPostComments)
  // create a comment on a blog post
  .post(auth as RequestHandler, createComment)

//
router.route('/:id/comments/:cid')
  // get a comment of a blog post
  .get([auth as RequestHandler, admin as RequestHandler], getComment)
  // update a comment of a blog post
  .put([auth as RequestHandler, admin as RequestHandler], updateComment)
    // delete a comment of a blog post
  .delete([auth as RequestHandler, admin as RequestHandler], deleteComment);

router.route('/:id/comments/:cid/:uid') 
  // delete a comment of a blog post
  .put([auth as RequestHandler], updateUserComment as RequestHandler)
  // delete a comment of a blog post
  .delete([auth as RequestHandler], deleteUserComment as RequestHandler);


export default router;
