import express, { RequestHandler } from "express";
import {
  getAllComments,
  getComment,
  getCommentLikeStatus,
  likeComment,
} from "../controllers/commentsController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import paginate from "../middleware/paginateWithPage.js";
import Comment from "../models/comment.js";

const router = express.Router();

router.route('/')
  // get all comments
  .get([auth as RequestHandler, checkRole(['admin']) as RequestHandler], paginate(Comment), getAllComments);
  // .get([auth, admin], paginateWithLimit(Comment), getAllComments);

router.route('/:id')
  // get all comments
  .get([auth as RequestHandler, checkRole(['admin']) as RequestHandler], getComment);
  // .delete([auth as RequestHandler, checkRole(['admin']) as RequestHandler], deleteComment);

router.route('/:id/like-status')
  // check if user liked a comment or not
  .get(getCommentLikeStatus);

router.route('/:id/like')
// like a comment
  .put(auth as RequestHandler, likeComment as RequestHandler);

export default router;
