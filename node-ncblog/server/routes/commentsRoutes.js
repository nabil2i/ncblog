import express from "express";
import {
  likeComment
} from "../controllers/commentsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.route('/like/:id')
  // like a comment
  .put(auth, likeComment);


export default router;
