import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import CommentModel from "../models/comment.js";
import LikeCommentModel from "../models/likecomment.js";
import { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

interface CustomResponse extends Response{
  paginatedResults?: any;
}

// interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
interface CustomRequest extends Request {
// interface CustomRequest extends Request<ParamsDictionary, any, any, ParsedQs> {
  user?: IUser
  postQuery?: { _id?: String, slug?: String }
}

interface CustomQueryRequest extends Request {
  
}

interface PickedPost {
  _id: string;
  title: string;
  author: IUser
}

interface PickedComment {
  _id: Types.ObjectId;
  text: string;
  userId: Types.ObjectId;
  userRepliedToId: Types.ObjectId;
  parentCommentId: Types.ObjectId;
  postId: Types.ObjectId;
}

// @desc Get all comments
// @route GET /comments
// @access Private Admin
export const getAllComments = async (req: Request, res: Response) => {
  const customRes = res as CustomResponse;

  res.status(200).json({ success: true, data: customRes.paginatedResults});
};

// @desc Create a comment
// @route GET /comments/:id
// @access Private Admin
export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.id;

  if (!commentId) return next(makeError(400, "Comment ID required"));

  const comment = await CommentModel.findById(commentId);

  res.status(200).json({
    success: true,
    message: "Get a comment of a post",
    data: comment
  });
};

// @desc Chek if  user liked a comment
// @route GET comments/:id/like-status
// @access Public Guest
export const getCommentLikeStatus = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.id;
  // const customReq = req as CustomRequest;
  const authHeader = req.headers.authorization;
  let userId;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.NODE_APP_JWT_ACCESS_SECRET as string) as { _id: string}
    userId = decoded._id;
  }
  
  // console.log(userId);

  // console.log("Getting a comment of ID ", commentId, " for user ", userId);

  // Check if current user liked the comment
    const like = await LikeCommentModel.findOne({ commentId, userId });
    const hasLiked = !!like;

    // console.log("User has liked: ", hasLiked);

    const comment = await CommentModel.findById(commentId);

    const likeCount = comment?.likeCount;

    res.status(200).json({ 
      success: true, 
      message: "Comment Like Data",
      data: {  
        commentId,
        // userId,
        hasLiked,
        likeCount 
      } 
    });
}

// @desc Like a comment
// @route PUT /comments/:id
// @access Private User
export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest
  
    const commentId = req.params.id;
    const userId = customReq.user?._id;
    // console.log("hello", commentId)

    if (!Types.ObjectId.isValid(commentId) || (userId && !Types.ObjectId.isValid(userId))) {
      throw makeError(400, "Invalid comment of user ID");
    }
    // if (!commentId) throw makeError(400, "Comment ID required");

    const comment = await CommentModel.findById(commentId);
    if (!comment) throw makeError(404, "The comment with the given ID doesn't exist");

    const  likeComment = await LikeCommentModel.findOne({userId, commentId});

    if (!likeComment) {
      // Like the comment
      const newLike = new LikeCommentModel({userId, commentId});
      await newLike.save();
      comment.likeCount += 1;
      await comment.save();

      res.status(200).json({
        success: true,
        message: "Comment liked",
        data: {
          commentId: comment._id,
          likeCount: comment.likeCount
        }
      })
    } else {
      // Unlike the comment
      await LikeCommentModel.deleteOne({ _id: likeComment._id });
      comment.likeCount = Math.max(comment.likeCount - 1, 0);
      await comment.save();

      res.status(200).json({ 
        success: true, 
        message: "Comment unliked",
        data: {
          commentId: comment._id,
          likeCount: comment.likeCount
        }
      });
    }
}

// // @desc Create a comment
// // @route UPDATE /comments/:id
// // @access Private Admin
// export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
//   const commentId = req.params.id;

//   if (!commentId) return next(makeError(400, "Comment ID required"));

//   const { error } = validateUpdateComment(req.body);
//     if (error) return next(makeError(400, error.details[0].message));
    
//     const { text, userId, parentCommentId } = req.body;

//     const comment = await CommentModel.findByIdAndUpdate(
//       commentId,
//       {
//         text, userId, parentCommentId
//       },
//       { new: true}
//     );
      
//     if (!comment) return next(makeError(404, "The comment with given ID doesn't exist"));
      
//     res.json({
//       success: true,
//       message: `The comment with ID ${comment._id} is updated`
//     });
// };

// // @desc Create a comment
// // @route UPDATE /posts/:id/comments/:cid/:uid
// // @access Private
// export const updateUserComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   // const commentId = req.params.cid;

//   const commentOwnerId = req.params.uid
//   const writerId = req.user?._id
//   // console.log("writer", writerId)
//   // console.log("commentowner", commentOwnerId)
//   // console.log(req.user.isAdmin)

//   if (!(req.user?.isAdmin || writerId === commentOwnerId))
//     return next(makeError(401, "You are not authorized to make this request"));

//   if (!commentId) return next(makeError(400, "Comment ID required"));

//   const { error } = validateUpdateComment(req.body);
//     if (error) return next(makeError(400, error.details[0].message));
    
//     const { text, userId, parentCommentId } = req.body;

//     const comment = await CommentModel.findByIdAndUpdate(
//       commentId,
//       { $set: { text } },
//       { new: true}
//     );
      
//     if (!comment) return next(makeError(404, "The comment with given ID doesn't exist"));
      
//     res.json({
//       success: true,
//       message: `The comment with ID ${comment._id} is updated`
//     });
// };

// // @desc Create a comment
// // @route DELETE /posts/:id/comments/:cid
// // @access Private Admin
// export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
//   const commentId = req.params.cid;

//   if (!commentId) return next(makeError(400, "Comment ID required"));

//   try {
//     const comment = await CommentModel.findById(commentId);
    
//     if(!comment) return next(makeError(404, "The comment with given ID is not found"));
//     // console.log(comment, "deleting replies")
    
//     const parentPost = await PostModel.findById(comment.post);

//     if (parentPost) {
//       await deleteReplies(comment.replies, parentPost);
  
//       if (comment.parentComment) {
//         const parentComment = await CommentModel.findById(comment.parentComment);
//         if (parentComment) {
//           parentComment.replies = parentComment.replies.filter(replyId => (
//             replyId.toString() !== commentId)
//           )
//           await parentComment.save();
//         }
//       } else {
//           parentPost.comments = parentPost.comments.filter(postCommentId => (
//             postCommentId.toString() !== commentId)
//           );
//           // await parentPost.save(); 
//         }
         
//       await CommentModel.findByIdAndDelete(commentId);

//       parentPost.totalCommentsCount -= 1;
//       await parentPost.save(); 
//     }

//     res.status(200).json({
//       success: true,
//       message: "Comment and replies deleted"
//     });
//   } catch (error) {
//     return next(makeError(500, "Internal server error"));
//   }
// };

// // @desc Create a comment
// // @route DELETE /posts/:id/comments/:cid/!uid
// // @access Private User
// export const deleteUserComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   const commentId = req.params.cid;
//   const commentOwnerId = req.params.uid

//   if (!(req.user?.isAdmin || req.user?._id === commentOwnerId))
//     return next(makeError(401, "You are not authorized to make this request"));

//   if (!commentId) return next(makeError(400, "Comment ID required"));

//   try {
//     const comment = await CommentModel.findById(commentId);
    
//     if(!comment) return next(makeError(404, "The comment with given ID is not found"));
//     // console.log(comment, "deleting replies")
    
//     const parentPost = await PostModel.findById(comment.post);

//     if (parentPost) {
//       await deleteReplies(comment.replies, parentPost);

//       if (comment.parentComment) {
//         const parentComment = await CommentModel.findById(comment.parentComment);
//         if (parentComment) {
//           parentComment.replies = parentComment.replies.filter(replyId => (
//             replyId.toString() !== commentId)
//           )
//           await parentComment.save();
//         }
//       } else {
//           parentPost.comments = parentPost.comments.filter(postCommentId => (
//             postCommentId.toString() !== commentId)
//           );
//           // await parentPost.save(); 
//         }
//     }
       
//       await CommentModel.findByIdAndDelete(commentId);

//       if (parentPost) {
//         parentPost.totalCommentsCount -= 1;
//         await parentPost.save(); 
//       }

//     res.status(200).json({
//       success: true,
//       message: "Comment and replies deleted"
//     });
//   } catch (error) {
//     return next(makeError(500, "Internal server error"));
//   }
// };


// const deleteReplies = async (replyIds: Types.ObjectId[], parentPost: IPost) => {
//   if (!replyIds || replyIds.length === 0) return;

//   // Delete each reply
//   for (const replyId of replyIds) {
//     const replyToDelete = await CommentModel.findById(replyId);
//     if (replyToDelete) {
//       await deleteReplies(replyToDelete.replies, parentPost);
      
//       // Remove the reply from its parent comment's replies
//       if (replyToDelete.parentComment) {
//         const parentComment = await CommentModel.findById(replyToDelete.parentComment);
//         if (parentComment) {
//           parentComment.replies = parentComment.replies.filter(replyId => (
//             replyId.toString() !== replyToDelete._id.toString())
//             );
//             await parentComment.save();
//           }
//         }
//         // await parentPost.save();
//         // Delete the reply
//         await CommentModel.findByIdAndDelete(replyId);
//         parentPost.totalCommentsCount -= 1;
//     }
//   }
// };


// export const getCommentsForPost = async (postId) => {
//   // Fetch comments for the post with hierarchical structure
//   const comments = await Comment.find({ post: postId })
//     .sort({ createdAt: -1 }) // Sort in ascending order by creation date
//     .populate('user') // Populate user data as needed
//     .populate('replies.user') // Populate user data for reply comments

//   // Organize comments in a hierarchical structure
//   const commentMap = new Map();
//   const topLevelComments = [];

//   comments.forEach((comment) => {
//     const parentId = comment.parentComment;

//     if (!parentId) {
//       // Top-level comment
//       topLevelComments.push(comment);
//     } else {
//       // Reply comment
//       const parentComment = commentMap.get(parentId);
//       if (parentComment) {
//         if (!parentComment.replies) {
//           parentComment.replies = [];
//         }
//         parentComment.replies.push(comment);
//       }
//     }

//     // Store the comment in the map for future reference
//     commentMap.set(comment._id, comment);
//   });

//   // Flatten the comments into a single array with the desired order
//   const flattenedComments = [];

//   const flattenComment = (comment) => {
//     flattenedComments.push(comment);
//     if (comment.replies) {
//       comment.replies.forEach((reply) => {
//         flattenComment(reply);
//       });
//     }
//   };

//   topLevelComments.forEach((comment) => {
//     flattenComment(comment);
//   });

//   return flattenedComments;
// };