import { Schema, Types } from "mongoose";
import CommentModel from "../models/comment.ts";
import PostModel, { IPost } from "../models/post.ts";
import { IUser } from "../models/user.ts";
import { makeError } from "../utils/responses.ts";
import { NextFunction, Request, Response } from "express";

interface CustomResponse extends Response{
  paginatedResults?: any;
}

interface CustomRequest extends Request {
// interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user?: IUser
}

// @desc Get all comments
// @route GET /
// @access Private Admin
export const getAllComments = async (req: Request, res: CustomResponse, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, data: res.paginatedResults});

    // const commentId = req.params.id;
    // const userId = req.user._id;
    // // console.log("hello", commentId)
    // if (!commentId) return next(makeError(400, "Comment ID required"));

    // const comment = await Comment.findById(commentId);
    // if (!comment) return next(makeError(404, "The comment with given ID doesn't exist"));

    // // console.log("found the comment")

    // const userIndex = comment.likes.indexOf(userId);
    // if (userIndex === -1) {
    //   comment.likes.push(userId);
    //   comment.numberOfLikes++;
    // } else {
    //   comment.likes.splice(userIndex, 1);
    //   comment.numberOfLikes--;
    // }

    // await comment.save();

    // res.json({ success: true, data: comment});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

// @desc Create a comment
// @route DELETE /comments/:id
// @access Private Admin
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.id;

  if (!commentId) return next(makeError(400, "Comment ID required"));

  try {
    const comment = await CommentModel.findById(commentId);
    
    if(!comment) return next(makeError(404, "The comment with given ID is not found"));
    // console.log("comment to delete", comment);
    // console.log(comment, "deleting replies");
    
    const parentPost = await PostModel.findById(comment.post);
    // console.log("parent post", parentPost);

    // delete the replies of the comment
    //await deleteReplies(comment.replies, parentPost);

    // delete the comment ID from its parent
    // before copilot
    if (parentPost) {
      if (comment.parentComment) {
        const parentComment = await CommentModel.findById(comment.parentComment);
        if (parentComment) {
          parentComment.replies = parentComment.replies.filter(replyId => (
            replyId.toString() !== commentId)
          )
          await parentComment.save();
        }
      } else {
        //delete the commend ID from the parent post
        parentPost.comments = parentPost.comments.filter(postCommentId => (
          postCommentId.toString() !== commentId)
        );
        // await parentPost.save();
      }
    }
    // fin pilot
       
      await CommentModel.findByIdAndDelete(commentId);

    if (parentPost) {
      parentPost.totalCommentsCount -= 1;
      await parentPost.save(); 
    }

    res.status(200).json({
      success: true,
      message: "Comment and replies deleted"
    });
  } catch (error) {
    return next(makeError(500, "Internal server error"));
  }
};


// @desc Like/Unlike a comment
// @route PUT /like/:id
// @access Private Auth
export const likeComment = async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  try {
    const commentId = req.params.id;
    const userId = req.user?._id;
    // console.log("hello", commentId)
    if (!commentId) return next(makeError(400, "Comment ID required"));

    const comment = await CommentModel.findById(commentId);
    if (!comment) return next(makeError(404, "The comment with given ID doesn't exist"));

    // console.log("found the comment")

    if (userId) {
      const userIndex = comment.likes.indexOf(userId);
      if (userIndex === -1) {
        comment.likes.push(userId);
        comment.numberOfLikes++;
      } else {
        comment.likes.splice(userIndex, 1);
        comment.numberOfLikes--;
      }
    }

    await comment.save();

    res.json({ success: true, data: comment});
  } catch(err) {
    console.log(err)
    return next(makeError(500, "Internal Server Error"));
  }
};

const deleteReplies = async (replyIds: Types.ObjectId[], parentPost: IPost) => {
  if (!replyIds || replyIds.length === 0) return;

  // Delete each reply
  for (const replyId of replyIds) {
    const replyToDelete= await CommentModel.findById(replyId);
    if (replyToDelete) {
      await deleteReplies(replyToDelete.replies, parentPost);
      
      // Remove the reply from its parent comment's replies
      if (replyToDelete.parentComment) {
        const parentComment = await CommentModel.findById(replyToDelete.parentComment);
        if (parentComment) {
          parentComment.replies = parentComment.replies.filter(replyId => (
            replyId.toString() !== replyToDelete._id.toString())
            );
            await parentComment.save();
          }
        }
        // await parentPost.save();
        // Delete the reply
        await CommentModel.findByIdAndDelete(replyId);
        parentPost.totalCommentsCount -= 1;
    }
  }
};