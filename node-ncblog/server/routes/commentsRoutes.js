import express from "express";
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
  .get([auth, admin], paginate(Comment), getAllComments);
  // .get([auth, admin], paginateWithLimit(Comment), getAllComments);
  
router.route('/like/:id')
  // like a comment
  .put(auth, likeComment);


  router.route('/:id')
  // get all comments
  .delete([auth, admin], deleteComment);


export default router;
