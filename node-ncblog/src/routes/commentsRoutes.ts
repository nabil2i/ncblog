import express, { RequestHandler } from "express";
import {
  likeComment,
  getAllComments,
  deleteComment,
} from "../controllers/commentsController.ts";
import auth from "../middleware/auth.ts";
import admin from "../middleware/admin.ts";
import paginateWithLimit from "../middleware/paginateWithLimit.ts";
import Comment from "../models/comment.ts"
import paginate from "../middleware/paginate.ts";

const router = express.Router();

router.route('/')
  // get all comments
  .get([auth as RequestHandler, admin as RequestHandler], paginate(Comment), getAllComments);
  // .get([auth, admin], paginateWithLimit(Comment), getAllComments);
  
router.route('/like/:id')
  // like a comment
  .put(auth as RequestHandler, likeComment as RequestHandler);


  router.route('/:id')
  // get all comments
  .delete([auth as RequestHandler, admin as RequestHandler], deleteComment);


export default router;
