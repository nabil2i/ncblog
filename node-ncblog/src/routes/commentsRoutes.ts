import express, { RequestHandler } from "express";
import {
  likeComment,
  getAllComments,
  deleteComment,
} from "../controllers/commentsController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import paginateWithLimit from "../middleware/paginateWithLimit.js";
import Comment from "../models/comment.js"
import paginate from "../middleware/paginate.js";

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
