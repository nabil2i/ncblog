import _ from "lodash";
import Book from "../models/book.js";
import Comment, { validateComment, validateUpdateComment } from "../models/comment.js";
import { makeError } from "../utils/responses.js";

// @desc Like/Unlike a comment
// @route PUT /like/:id
// @access Private
export const likeComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;

    if (!commentId) return next(makeError(400, "Comment ID required"));

    const comment = await Comment.findById(commentId);
    if (!comment) return next(makeError(404, "The comment with given ID doesn't exist"));

    // console.log("found the comment")

    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
      comment.likes.push(userId);
      comment.numberOfLikes++;
    } else {
      comment.likes.splice(userIndex, 1);
      comment.numberOfLikes--;
    }

    await comment.save();

    res.json({ success: true, data: comment});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

