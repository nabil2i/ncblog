import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import _ from "lodash";
import { Types } from "mongoose";
import checkRole from "../middleware/checkRole.js";
import CommentModel, { IComment, validateComment, validateUpdateComment } from "../models/comment.js";
import LikePostModel from "../models/likepost.js";
import PostModel, { validatePost, validateUpdatePost } from "../models/post.js";
import User, { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";
import { makeSlug } from './../utils/strings.js';

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
  topParentCommentId: Types.ObjectId;
  realParentCommentId: Types.ObjectId;
  postId: Types.ObjectId;
}

// @desc Get all posts
// @route GET /posts
// @access Public Guest
export const getAllPosts = async (req: Request, res: CustomResponse) => {
  res.status(200).json({ success: true, data: res.paginatedResults});
};

// @desc Create a post
// @route POST /posts
// @access Private Blog Author
export const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
  
    const { error } = validatePost(req.body);
    if (error) throw makeError(400, error.details[0].message);

    // console.log(req.body);
    const { title, body, authorId, img, category, tags } = req.body;

    const author = await User.findById(authorId);
    if (!author) throw makeError(400, "Invalid author");
    
    const slug = makeSlug(title);

    let newPost = new PostModel({
      slug,
      postAuthorId: authorId,
      title,
      body,
      img,
      category,
      tags
    })
    // let newPost = new Post({
    //   user: {
    //     _id: user._id,
    //     firstname: user.firstname,
    //     lastname: user.lastname,
    //   },
    //   title,
    //   body
    // })
    newPost = await newPost.save();

    if (!newPost) throw makeError(400, "An error occured");

    const pickedPost: PickedPost = _.pick(newPost.toObject(), ['_id', 'title', 'author']);
    res.status(201).json({success: true, data: pickedPost});
};

// @desc Get a post
// @route GET /posts/:id
// @access Public Guest
export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest
  const postId = req.params.id;
  // const userId = customReq.user?._id;

  // console.log("Getting a post of ID ", postId, " for user ", userId);

  // console.log (customReq.postQuery);

  const post = await PostModel.findOne(customReq.postQuery)
  // const post = await PostModel.findOne(postQuery)
    .populate([
      {
        path: 'postAuthorId',
        select: 'firstname lastname',
      },
      // {
      //   path: 'comments',
      //   options: { sort: { createdAt: -1 } },
      //   populate: [
      //     {
      //       path: 'authorId',
      //       select: 'firstname lastname img',
      //     },
      //     {
      //       path: 'replies',
      //       options: { sort: { createdAt: -1 } },
      //       populate: {
      //         path: 'user',
      //         select: 'firstname lastname img'
      //       }
      //     }
      //   ]
      // }   
    ])
    .exec();
  
  if (!post) throw makeError(404, "The post with the given ID was not found");
  
  // // Check if current user liked the post
  //   const like = await LikePostModel.findOne({ postId, userId });
  //   const hasLiked = !!like;

  //   console.log("User has liked: ", hasLiked);

  //   res.status(200).json({ 
  //     success: true, 
  //     data: { 
  //       ...post.toObject(), 
  //       hasLiked 
  //     } 
  //   });
  res.status(200).json({ success: true, data: post});
  // res.status(200).json({ success: true, data: { ...post, hasLiked: !!like }});
};

// @desc Chek if  user liked a post
// @route GET posts/:id/like-status
// @access Public Guest
export const getPostLikeStatus = async (req: Request, res: Response, next: NextFunction) => {
  // const customReq = req as CustomRequest;

  const postId = req.params.id;
  const authHeader = req.headers.authorization;
  let userId;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.NODE_APP_JWT_ACCESS_SECRET as string) as { _id: string}
    userId = decoded._id;
  }

  // console.log("Getting a post of ID ", postId, " for user ", userId);

  // Check if current user liked the post
    const like = await LikePostModel.findOne({ postId, userId });
    const hasLiked = !!like;

    // console.log("User has liked: ", hasLiked);

    const post = await PostModel.findById(postId);

    const likeCount = post?.likeCount;

    res.status(200).json({ 
      success: true, 
      message: 'Post Like Data',
      data: {  
        postId,
        // userId,
        hasLiked,
        likeCount 
      } 
    });
}

// @desc Like/Unlike a post
// @route PUT posts/:id/like
// @access Private User
export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest
  
    // cconst postQuery = req.postQuery;
    const postId = req.params.id;
    const userId = customReq.user?._id;
    // console.log("hello", postId)

    if (!Types.ObjectId.isValid(postId) || (userId && !Types.ObjectId.isValid(userId))) {
      throw makeError(400, "Invalid post of user ID");
    }
    // if (!postId) throw makeError(400, "Post ID required");

    const post = await PostModel.findById(postId);
    if (!post) throw makeError(404, "The post with the given ID doesn't exist");

    const  likePost = await LikePostModel.findOne({userId, postId});

    if (!likePost) {
      // Like the post
      const newLike = new LikePostModel({userId, postId});
      await newLike.save();
      post.likeCount += 1;
      await post.save();

      res.status(200).json({
        success: true,
        message: "Post liked",
        data: {
          postId: post._id,
          likeCount: post.likeCount
        }
      })
    } else {
      // Unlike the post
      await LikePostModel.deleteOne({ _id: likePost._id });
      post.likeCount = Math.max(post.likeCount - 1, 0);
      await post.save();

      res.status(200).json({ 
        success: true, 
        message: "Post unliked",
        data: {
          postId: post._id,
          likeCount: post.likeCount
        }
      });
    }
};

// LIKE A POST: VERSION 1
// // @desc Like/Unlike a post
// // @route PUT posts/:id/like
// // @access Private User
// export const likePost = async (req: Request, res: Response, next: NextFunction) => {
//   const customReq = req as CustomRequest
  
//     // cconst postQuery = req.postQuery;
//     const postId = req.params.id;
//     const userId = customReq.user?._id;
//     // console.log("hello", postId)
//     if (!postId) throw makeError(400, "Post ID required");

//     const post = await PostModel.findById(postId);
//     if (!post) throw makeError(404, "The post with the given ID doesn't exist");

//     let likePost = await LikePost.findOne({userId, postId});

//     if (!likePost) {
//       likePost = new LikePost({userId, postId});
//       await likePost.save();
//       post.likeCount++;
//     } else {
//       await LikePost.findOneAndDelete({ userId, postId });
//       post.likeCount--;
//     }
    
//     await post.save();
//     res.json({ success: true, data: likePost});
// };

// @desc Update a post
// @route PUT /posts/:id
// @access Private superadmin or Blog Post Author
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest

  
  const { error } = validateUpdatePost(req.body);
  if (error) throw makeError(400, error.details[0].message);
  
  const { title, body, img, category, tags } = req.body;

  const postId = req.params.id;
  const userId = customReq.user?._id;

  if (!postId) throw makeError(400, "Post ID required");

  const post = await PostModel.findById(postId)
  if(!post) throw makeError(404, "The post with the given ID is not found");

  if (!checkRole(['superadmin']) && post?.postAuthorId.toString() !== userId?.toString()) {
    throw makeError(403, "Operation not allowed");
  }

  let updatedSlug = post.slug;
  if (title && post.title !== title)
    updatedSlug = makeSlug(title);

  const updatedPost = await PostModel.findByIdAndUpdate(
    postId,
    {
      $set: {
        title,
        body,
        slug: updatedSlug,
        img,
        category,
        tags
      }
    },
    { new: true }
  );
    
  if (!updatedPost) throw makeError(404, "The post with the given ID doesn't exist");
    
  res.json({ success: true, message: `The post with ID ${updatedPost._id} is updated`});
};

// @desc Delete a post
// @route DELETE /posts/:id
// @access Private Admin or Blog Post Author
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest

  const postId = req.params.id;
  const userId = customReq.user?._id

  if (!postId) throw makeError(400, "Post ID required");

  const post = await PostModel.findById(postId)
  if(!post) throw makeError(404, "The post with the given ID is not found");

  if (!checkRole(['admin']) && post?.postAuthorId.toString() !== userId?.toString()) throw makeError(403, "Operation not allowed");

  await post.deleteOne();
  
  res.status(200).json({
    success: true,
    message: `The post with ID ${post._id} was deleted`,
    data: {
      id: postId
    }
  });
};

// // @desc Update a post
// // @route PUT /posts/:id
// // @access Private Blog Author
// export const updateCurrentUserPost = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   const postId = req.params.id;
//   const userId = req.params.userId;
//   if (!postId) throw makeError(400, "Post ID required"));

//   if (req.user?._id !== userId) throw makeError(403, "Operation not allowed"))

//   
//     const { error } = validateUpdatePost(req.body);
//     if (error) throw makeError(400, error.details[0].message));
    
//     const { title, body, img, category, tags } = req.body;

//     const post = await PostModel.findByIdAndUpdate(
//       postId,
//       {
//         $set: {
//           title,
//           body,
//           category,
//           img,
//           tags
//         }
//       },
//       { new: true}
//     );
      
//     if (!post) throw makeError(404, "The post with given ID doesn't exist"));
      
//     res.json({ success: true, message: `The post with ID ${post._id} is updated`});
//   } catch(err) {
//     console.log(err)
//     if ((err as Error).name === 'CastError') {
//       throw makeError(400, "Invalid post ID"));
//     }
//     throw makeError(500, "Internal Server Error"));
//   }
// };

// // @desc Delete a post
// // @route DELETE /posts/:id/:userId
// // @access Private Blog Author
// export const deleteCurrentUserPost = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   
//     const postId = req.params.id;
//     const userId = req.params.userId;

//     if (!postId) throw makeError(400, "Post ID required"));

//     if (req.user?._id !== userId) throw makeError(403, "Operation not allowed"))
    
//     const post = await PostModel.findByIdAndDelete(postId);
  
//     if(!post) throw makeError(404, "The post with given ID is not found"));
  
//     res.status(200).json({
//       success: true,
//       message: `The post with ID ${post._id} was deleted`,
//       data: {
//         id: postId
//       }
//     });

//   } catch(err) {
//     console.log(err)
//     if ((err as Error).name === 'CastError') {
//       throw makeError(400, "Invalid post ID"));
//     }
//     throw makeError(500, "Internal Server Error"));
//   }
// };

// RELATED TO COMMENTS OF A POST
// @desc Get all posts
// @route GET /posts/:id/comments
// @access Private User
export const getPostComments = async (req: Request, res: Response, next: NextFunction) => {
  const customRes = res as CustomResponse;
  const postId = req.params.id;

  // // Fetch top level comments
  // const comments = await CommentModel.find({ ...customReq.postQuery, topParentCommentId: null})
  //   .sort({ createdAt: -1 })
  //   .populate([
  //     {
  //       path: 'userId',
  //       select: 'username firstname lastname img',
  //     },
  //     {
  //       path: 'replies',
  //       options: { sort: { createdAt: 1 } },
  //       populate: {
  //         path: 'userId',
  //         select: 'username firstname lastname img'
  //       }
  //     }
  //   ])
  //   .exec();

  const post = await PostModel.findById(postId).lean()
  // if (!post) throw makeError(404, "Post not found");
  // // .populate([
  // //   {
  // //     path: 'comments',
  // //     options: { sort: { createdAt: -1 } },
  // //     populate: [
  // //       {
  // //         path: 'userId',
  // //         select: 'username firstname lastname img',
  // //       },
  // //       {
  // //         path: 'replies',
  // //         options: { sort: { createdAt: 1 } },
  // //         populate: {
  // //           path: 'userId',
  // //           select: 'username firstname lastname img'
  // //         }
  // //       }
  // //     ]
  // //   }   
  // // ]).exec();
  // // console.log(post)

  // const data = {
  //   comments,
  //   commentCount: post.commentCount,
  //   postId: post._id,
  //   postTitle: post.title,
  // };

  // const comments = await Comment.find().sort("-createdAt");
  const data = customRes.paginatedResults;

  res.status(200).json({ success: true, message: `Comments of the post '${post?.title}'`, data });
};

// @desc Get all coreplies for a comment
// @route GET /posts/:id/comments/:cid/replies
// @access Private Guest
export const getCommentReplies = async (req: Request, res: Response, next: NextFunction) => {
  // const commentId = req.params.cid;
  const customRes = res as CustomResponse;

  const comment = await CommentModel.findById(req.query.topParentCommentId).lean();

  const data = customRes.paginatedResults;
  // data.data.replyCount = comment?.replyCount || 0;

  res.status(200).json({ success: true, message: `Replies of the comment '${comment?._id}'`, data});
}

// // @desc Get all posts
// // @route GET /posts/:id/comments
// // @access Private User
// export const getPostCommentsWithLike = async (req: Request, res: Response, next: NextFunction) => {
//   const customReq = req as CustomRequest;
//   const userId = customReq.user?._id;
//   const postId = req.params.id;

//   const comments = await CommentModel.find({postId})
//   .populate([
//         {
//           path: 'replies',
//           options: { sort: { createdAt: 1 } },
//           populate: {
//             path: 'userId',
//             select: 'username firstname lastname img'
//           }
      
//     }   
//   ]).exec();

//   const likeStatuses = await LikeCommentModel.find({
//     userId,
//     commentId: {$in: comments.map(comment => comment._id)}
//   });

//   const likeStatusMap = {};
//   likeStatuses.forEach(likeStatus => {
//     likeStatusMap[likeStatus.commentId] = true;
//   })
  
//   const commentsWithStatus = comments.map(comment => {
//     ...comment.toObject(),
//     hasLiked: likeStatuses
//   })

//   const data = {
//     comments: post.comments,
//     commentCount: post.commentCount
//   };

//   // const comments = await Comment.find().sort("-createdAt");
//   res.status(200).json({ success: true, message: `Comments of the post '${post.title}'`, data });
// };

// @desc Create a comment
// @route POST /posts/:id/comments
// @access Private User
export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("Received request to create a comment:", req.body);

  // Validate the request body
  const { error } = validateComment(req.body);
  if (error) {
    throw makeError(400, error.message);
  }
  
  const postId = req.params.id;
  const { text, userId, userRepliedToId, topParentCommentId, realParentCommentId } = req.body;
  // console.log(req.body);

  const post = await PostModel.findById(postId);
  if (!post) throw makeError(400, "Invalid post");
  
  let newComment = new CommentModel({
    text,
    userId,
    postId
  })

  if (userRepliedToId) {
    newComment.userRepliedToId  = userRepliedToId
  }

  if (realParentCommentId) {
    newComment.realParentCommentId = realParentCommentId;
  }

  if (topParentCommentId) {
    const topParentComment = await CommentModel.findById(topParentCommentId);
    if (!topParentComment)  throw makeError(400, "Invalid parent comment ID");

    newComment.topParentCommentId = topParentCommentId
    
    topParentComment.replies.push(newComment._id);
    topParentComment.replyCount++;
    await topParentComment.save();
  } else {
    post.comments.push(newComment._id);
  }
  newComment = await newComment.save();
  post.commentCount++;
  await post.save();
  
  const savedComment = newComment.toObject() as Required<IComment>;
  const pickedComment: PickedComment = _.pick(savedComment, [
    '_id', 'text', 'userId', 'postId', 'topParentCommentId', 'realParentCommentId', 'userRepliedToId'
  ]);
  res.status(201).json({success: true, data: pickedComment});
};

// original createComment method
// @desc Create a comment
// // @route POST /posts/:id/comments
// // @access Private Auth
// export const createComment = async (req, res, next) => {
//   
//     const { error } = validateComment(req.body);
//     if (error) throw makeError(400, error.details[0].message));

//     // console.log(req.body);
    
//     const postId = req.params.id;
//     const { text, userId, parentCommentId } = req.body;

//     const post = await Post.findById(postId);
//     if (!post) throw makeError(400, "Invalid post"));
    
//     let newComment = new Comment({
//       text,
//       user: userId,
//       post: postId,
//     })
  
//     if (parentCommentId) {
//       newComment.parentComment = parentCommentId
//     }
    
//     newComment = await newComment.save();

//     if (parentCommentId) {
//       const parentComment = await Comment.findById(parentCommentId);
//       if (!parentComment)  throw makeError(400, "Invalid parent comment ID"));

//       parentComment.replies.push(newComment);
//       await parentComment.save();
//     } else {
//       post.comments.push(newComment);
//     }
//     post.totalCommentsCount++;
//     await post.save();

//     newComment = _.pick(newComment, ['_id', 'text']);
//     res.status(201).json({success: true, data: newComment});
//   } catch(err) {
//     console.log(err)
//     throw makeError(500, "Internal Server Error"));
//   }
// };

// @desc Create a comment
// @route GET /posts/:id/comments/:cid
// @access Public
export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.cid;

  if (!commentId) throw makeError(400, "Comment ID required");

  const comment = await CommentModel.findById(commentId);

  res.status(200).json({
    success: true,
    message: "Get a comment of a post",
    data: comment
  });
};

// @desc Create a comment
// @route UPDATE /posts/:id/comments/:cid
// @access Private Admin + Comment Owner
export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.cid;

  if (!commentId) throw makeError(400, "Comment ID required");

  const { error } = validateUpdateComment(req.body);
    if (error) throw makeError(400, error.details[0].message);

    const customReq = req as CustomRequest
    const userId = customReq?.user?._id

    const { text } = req.body;

    let comment = await CommentModel.findById(commentId)

    if (!comment) throw makeError(404, "The comment with the given ID doesn't exist");

    const commentOwner = comment?.userId
    
    if (!checkRole(['admin']) && commentOwner.toString() !== userId?.toString())
      throw makeError(403, "Operation not allowed");
    
    // const updatedComment = await comment.updateOne({$set: { text }}, { new: true});
    comment = await CommentModel.findByIdAndUpdate(
      commentId,
      {$set: { text }},
      { new: true}
    );
      
    if (!comment) throw makeError(404, "The comment with the given ID doesn't exist");
      
    res.json({
      success: true,
      message: `The comment with ID ${comment._id} is updated`,
      data: comment
    });
};

// // @desc Create a comment
// // @route UPDATE /posts/:id/comments/:cid/:uid
// // @access Private
// export const updateUserComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   const commentId = req.params.cid;

//   const commentOwnerId = req.params.uid
//   const writerId = req.user?._id
//   // console.log("writer", writerId)
//   // console.log("commentowner", commentOwnerId)
//   // console.log(req.user.isAdmin)

//   if (!(req.user?.isAdmin || writerId === commentOwnerId))
//     throw makeError(401, "You are not authorized to make this request"));

//   if (!commentId) throw makeError(400, "Comment ID required"));

//   const { error } = validateUpdateComment(req.body);
//     if (error) throw makeError(400, error.details[0].message));
    
//     const { text, userId, parentCommentId } = req.body;

//     const comment = await CommentModel.findByIdAndUpdate(
//       commentId,
//       { $set: { text } },
//       { new: true}
//     );
      
//     if (!comment) throw makeError(404, "The comment with given ID doesn't exist"));
      
//     res.json({
//       success: true,
//       message: `The comment with ID ${comment._id} is updated`
//     });
// };

// @desc Create a comment
// @route DELETE /posts/:id/comments/:cid
// @access Private Admin + Comment Owner
export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = req.params.cid;

  if (!commentId) throw makeError(400, "Comment ID required");


  const customReq = req as CustomRequest
  const userId = customReq?.user?._id
  const comment = await CommentModel.findById(commentId)
  
  if (!comment) throw makeError(404, "The comment with the given ID doesn't exist");
  
  const commentOwner = comment?.userId
  
  if (!checkRole(['admin']) && commentOwner.toString() !== userId?.toString())
    throw makeError(403, "Operation not allowed")

  // console.log(" we can delete the comment")
  
  const topParentComment = await CommentModel.findById(comment?.topParentCommentId);
  const post = await PostModel.findById(comment.postId);

  // console.log("topParentComment", topParentComment);
  // console.log("post", post);

  //if it is a second level comment
  if (post && topParentComment) {
    // delete only the second level comment
    await CommentModel.findByIdAndDelete(comment._id);

    // delete the id in the replies of the parent comment
    topParentComment.replies = topParentComment.replies.filter(id => (
      id.toString() !== commentId.toString()
    ));
    topParentComment.replyCount = Math.max(topParentComment.replyCount - 1, 0);
    await topParentComment.save();
    
    post.commentCount = Math.max(post.commentCount -1, 0);
    await post.save();
  } else if (post && !topParentComment) {
    // if it's a first level comment
    //delete all its replies
    const replyDeletedCount = await deleteReplies(comment);
    if (replyDeletedCount && replyDeletedCount === comment.replyCount) {
      post.comments = post.comments.filter(id => (
        id.toString() !== commentId.toString()
      ));
    }
    
    post.commentCount = Math.max(post.commentCount - replyDeletedCount - 1, 0);
    await post.save();
    // then delete it
    await CommentModel.findByIdAndDelete(comment._id);
  }

  res.status(200).json({
    success: true,
    message: "Comment and replies deleted"
  });
};

// // @desc Create a comment
// // @route DELETE /posts/:id/comments/:cid/!uid
// // @access Private User
// export const deleteUserComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
//   const commentId = req.params.cid;
//   const commentOwnerId = req.params.uid

//   if (!(req.user?.isAdmin || req.user?._id === commentOwnerId))
//     throw makeError(401, "You are not authorized to make this request"));

//   if (!commentId) throw makeError(400, "Comment ID required"));

//   
//     const comment = await CommentModel.findById(commentId);
    
//     if(!comment) throw makeError(404, "The comment with given ID is not found"));
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
//     throw makeError(500, "Internal server error"));
//   }
// };


const deleteReplies = async (comment: IComment) => {
  const repliesId = comment.replies;

  let replyDeletedCount = 0;

  if (!repliesId || repliesId.length === 0)
    replyDeletedCount = 0 ;

  // Delete each reply
  for (const replyId of repliesId) {
    const replyToDelete = await CommentModel.findById(replyId);
    if (replyToDelete) {
      // Delete the reply
      await CommentModel.findByIdAndDelete(replyId);
      replyDeletedCount += 1;

      // await deleteReplies(replyToDelete.replies);
      
      // Remove the reply from its parent comment's replies
      // if (replyToDelete.parentCommentId) {
      //   const parentComment = await CommentModel.findById(replyToDelete.parentCommentId);
      //   if (parentComment) {
      //     parentComment.replies = parentComment.replies.filter(replyId => (
      //       replyId.toString() !== replyToDelete._id.toString())
      //       );
      //       await parentComment.save();
      //     }
      //   }

        // await parentPost.save();   
    }
  }

  return replyDeletedCount;
};

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
