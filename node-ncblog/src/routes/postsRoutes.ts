import express, { RequestHandler } from "express";
import {
  createComment,
  createNewPost,
  deleteComment,
  // deleteCurrentUserPost,
  deletePost,
  // deleteUserComment,
  getAllPosts,
  getComment,
  getCommentReplies,
  getPost,
  getPostComments,
  getPostLikeStatus,
  likePost,
  updateComment,
  // updateCurrentUserPost,
  updatePost,
} from "../controllers/postsController.js";
import auth from "../middleware/auth.js";
import checkInjectTopParentCommentQuery from "../middleware/checkInjectTopParentCommentQuery.js";
import checkRole from "../middleware/checkRole.js";
import getPostQuery from "../middleware/getPostQuery.js";
import paginateWithLimit from "../middleware/paginateWithLimit.js";
import paginateWithPage from "../middleware/paginateWithPage.js";
import CommentModel from "../models/comment.js";
import PostModel from "../models/post.js";


const router = express.Router();

router.route('/')
  // get all blog posts
  .get(paginateWithPage(PostModel), getAllPosts)
  // create a blog post
  .post([auth as RequestHandler, checkRole(['blogauthor, admin, superadmin'])] , createNewPost);

router.route('/:id')
  // get a blog post
  .get([getPostQuery as RequestHandler], getPost)
  // update a blog post
  .put([auth as RequestHandler, checkRole(['admin', 'superadmin', 'blogauthor'])], updatePost)
  // delete a blog post
  .delete([auth as RequestHandler, checkRole(['admin', 'superadmin', 'blogauthor'])], deletePost)

router.route('/:id/like-status')
  // check if user liked a post or not
  .get(getPostLikeStatus);

router.route('/:id/like')
// like a post
  .put(auth as RequestHandler, likePost as RequestHandler);

// router.route('/:id/:authorId')  
//   .delete([auth as RequestHandler, checkRole(['blogauthor'])], deleteCurrentUserPost as RequestHandler)
//   .put([auth as RequestHandler, checkRole(['blogauthor'])], updateCurrentUserPost as RequestHandler);


// COMMENTS RELATED TO A POST
router.route('/:id/comments')
  // get all comments of a blog post
  .get(paginateWithLimit(CommentModel), getPostComments)
  // create a comment on a blog post
  .post(auth as RequestHandler, createComment);

//
router.route('/:id/comments/:cid')
  // get a comment of a blog post
  .get([auth as RequestHandler, checkRole(['admin', 'superadmin'])], getComment)
  // update a comment of a blog post
  .put([auth as RequestHandler], updateComment)
    // delete a comment of a blog post
  .delete([auth as RequestHandler], deleteComment);

router.route('/:id/comments/:cid/replies')
  // get all replies of a comment
  .get(checkInjectTopParentCommentQuery, paginateWithLimit(CommentModel), getCommentReplies);

// router.route('/:id/comments/:cid/:uid') 
//   // delete a comment of a blog post
//   .put([auth as RequestHandler], updateUserComment as RequestHandler)
//   // delete a comment of a blog post
//   .delete([auth as RequestHandler], deleteUserComment as RequestHandler);


export default router;
