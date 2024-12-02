import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import _ from "lodash";
import { Types } from "mongoose";
import checkRole from "../middleware/checkRole.js";
import CommentModel, { IComment, validateComment, validateUpdateComment } from "../models/comment.js";
import DraftPostModel, { validateDraftPost, validateUpdateDraftPost } from "../models/draftpost.js";
import LikePostModel from "../models/likepost.js";
import PostModel, { validateUpdatePost } from "../models/post.js";
import User, { IUser } from "../models/user.js";
import { makeError } from "../utils/error.js";
import { makeSlug } from './../utils/strings.js';
;

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
  postAuthorId: IUser
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
// @route GET /posts/all
// @access Public Guest
export const getAllPosts = async (req: Request, res: Response) => {
  const customRes = res as CustomResponse;
  res.status(200).json({ success: true, data: customRes.paginatedResults});
};

// @desc Get all published posts
// @route GET /posts
// @access Public
export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const customRes = res as CustomResponse;
  res.status(200).json({ success: true, data: customRes.paginatedResults});
};

// @desc Create a new draft post
// @route POST /posts/draft
// @access Private Blog Author
export const createDraftPost = async (req: Request, res: Response, next: NextFunction) => {
  
    const { error } = validateDraftPost(req.body);
    if (error) throw makeError(400, error.details[0].message);

    // console.log(req.body);
    const { title, body, postAuthorId, img, category, tags } = req.body;

    const author = await User.findById(postAuthorId);
    if (!author) throw makeError(400, "Invalid author");
    
    const slug = makeSlug(title);

    let newDraftPost = new DraftPostModel({
      slug,
      postAuthorId,
      title,
      body,
      img,
      category,
      tags,
      status: 'draft',
    })

    newDraftPost = await newDraftPost.save();

    if (!newDraftPost) throw makeError(400, "An error occured");

    // const pickedDraftPost: PickedPost = _.pick(newDraftPost.toObject(), ['_id', 'title', 'postAuthorId']);
    res.status(201).json({
      success: true, 
      message: "Draft created", 
      data: newDraftPost
    });
};

// @desc Create a new draft post
// @route POST /posts/:id/draft
// @access Private Blog Author
export const createDraftFromPost = async (req: Request, res: Response, next: NextFunction) => {

  const postId = req.params.id;
  // console.log("postId: ", postId);
  const post = await PostModel.findById(postId);
  if (!post) throw makeError(404, "The post with the given ID was not found");
  
  if (post.currentDraftId) {
    const draft = await DraftPostModel.findById(post.currentDraftId);
    if (draft) throw makeError(400, "A draft already exists for this post");
  }

  const newDraftPost = new DraftPostModel({
    title: post.title,
    slug: post.slug,
    body: post.body,
    img: post.img,
    category: post.category,
    tags: post.tags,
    postAuthorId: post.postAuthorId,
    status: 'draft',
    lastEditedAt: new Date(),
    publishedPostId: new Types.ObjectId(postId)
  });

  await newDraftPost.save();

  post.currentDraftId = newDraftPost._id;
  await post.save();

  // const pickedDraftPost: PickedPost = _.pick(newDraftPost.toObject(), ['_id', 'title', 'postAuthorId']);
  res.status(201).json({
    success: true, 
    message: "Draft created", 
    data: newDraftPost
  });
};

// @desc Get all draft posts
// @route GET /posts/draft
// @access Private Blog Author
export const getDraftPosts = async (req: Request, res: Response) => {
  const customRes = res as CustomResponse;
  res.status(200).json({ success: true, data: customRes.paginatedResults});
};

// @desc Get a draft post
// @route GET /posts/draft/:id
// @access Private Blog Author
export const getDraftPost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest

  const draftpost = await DraftPostModel.findOne(customReq.postQuery)
  // const post = await PostModel.findOne(postQuery)
    .populate([
      {
        path: 'postAuthorId',
        select: 'firstname lastname',
      },
    ])
    .exec();
  
  if (!draftpost) throw makeError(404, "The draft post with the given ID was not found");

  if (draftpost.status === 'draft') {
    if (!checkRole(['admin']) && draftpost.postAuthorId.toString() !== customReq.user?._id.toString()) {
      throw makeError(403, "Operation not allowed");
    }
  }
  
  res.status(200).json({ success: true, data: draftpost});
};

// @desc Get the current draft post of a post
// @route GET /posts/:id/draft
// @access Private Blog Author
export const getCurrentDraftPost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest

  const publishedPostId = req.params.id;
  const publishedPost = await PostModel.findById(publishedPostId).populate([
    { 
      path: 'currentDraftId',
    }
  ]).exec();

  if (!publishedPost) throw makeError(404, "The draft post with the given ID was not found");
  
  res.status(200).json({ success: true, data: publishedPost.currentDraftId || { message: "No active draft found" }});
};

// @desc Update a draft for a post that is not published
// @route PATCH /posts/draft/:id
// @access Private superadmin or Blog Post Author
export const updateDraftPost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest
  
  const { error } = validateUpdateDraftPost(req.body);
  if (error) throw makeError(400, error.details[0].message);
  
  const { title, body, img, category, tags } = req.body;
  
  const draftId = req.params.id;
  if (!draftId) throw makeError(400, "Draft post ID required");

  const draftpost = await DraftPostModel.findOne(customReq.postQuery);
  // const draftpost = await DraftPostModel.findOne(customReq.postQuery)
  
  if(!draftpost) throw makeError(404, "The draft post with the given ID is not found");
  
  // console.log("draft: ", draftpost)
  const userId = customReq.user?._id;
  if (!checkRole(['superadmin']) && draftpost?.postAuthorId.toString() !== userId?.toString()) {
    throw makeError(403, "Operation not allowed");
  }

  let slug = draftpost.slug;
  if (title && draftpost.title !== title)
    slug = makeSlug(title);

  const updateddraftpost = await DraftPostModel.findByIdAndUpdate(
    draftId,
    {
      $set: {
        title,
        body,
        slug,
        img,
        category,
        tags,
        lastEditedAt: new Date()
      }
    },
    { new: true }
  );
    
  if (!updateddraftpost) throw makeError(404, "The draft with the given ID doesn't exist");

  // console.log("updated draft: ", updateddraftpost)
    
  res.json({ 
    success: true, 
    message: `The draft with ID ${updateddraftpost._id} is updated`,
    data: updateddraftpost
  });
};

// @desc Delete a draft post
// @route DELETE /posts/draft/:id
// @access Private superAdmin or Blog Post Author
export const deleteDraftPost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest
  const userId = customReq.user?._id
  // const postId = req.params.id;

  if (!customReq.postQuery) throw makeError(400, "Draft post ID required");

  const draftpost = await DraftPostModel.findOne(customReq.postQuery)
  if(!draftpost) throw makeError(404, "The draft post with the given ID is not found");

  if (!checkRole(['admin']) && draftpost?.postAuthorId.toString() !== userId?.toString())
    throw makeError(403, "Operation not allowed");

  // remove reference from the published post
  if (draftpost.publishedPostId) {
    const publishedPost = await PostModel.findByIdAndUpdate(
      draftpost.publishedPostId,
      {
        currentDraftId: null  
      } 
    );
  }

  await draftpost.deleteOne();
  
  res.status(200).json({
    success: true,
    message: `The draft post with ID ${draftpost._id} was deleted`,
    data: {
      id: draftpost._id
    }
  });
};

// @desc Publish a draft post
// @route POST /posts/draft/:id/publish
// @access Private superAdmin or Blog Post Author
export const publishDraftPost = async (req: Request, res: Response, next: NextFunction) => {
  // const customReq = req as CustomRequest

  const draftId = req.params.id;
  if (!draftId) throw makeError(400, "Draft Post ID required");

  const draftPost = await DraftPostModel.findById(draftId);
  if (!draftPost) throw makeError(404, "Draft Post not found");

  let publishedPost;

  if (draftPost.publishedPostId)  {
    publishedPost = await PostModel.findByIdAndUpdate(
      draftPost.publishedPostId,
      {
        $set: {
          title: draftPost.title,
          slug: draftPost.slug,
          body: draftPost.body,
          img: draftPost.img,
          category: draftPost.category,
          tags: draftPost.tags,
          currentDraftId: null
        }
      },
      { new: true }
    );
  } else { // if there is no published post
    publishedPost = new PostModel({
      title: draftPost.title,
      slug: draftPost.slug,
      body: draftPost.body,
      img: draftPost.img,
      category: draftPost.category,
      tags: draftPost.tags,
      postAuthorId: draftPost.postAuthorId,
      status: 'published',
      publishedAt: new Date()
    });

    await publishedPost.save();
  }

  // Delete the draft after publishing
  await DraftPostModel.findByIdAndDelete(draftId);

  res.status(200).json({ 
    success: true, 
    message: "Post published successfully", 
    data: publishedPost
  });

}

// @desc Get a post
// @route GET /posts/:id
// @access Public Guest
export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  const customReq = req as CustomRequest

  const post = await PostModel.findOne(customReq.postQuery)
  // const post = await PostModel.findOne(postQuery)
    .populate([
      {
        path: 'postAuthorId',
        select: 'firstname lastname',
      },
    ])
    .exec();
  
  if (!post) throw makeError(404, "The post with the given ID was not found");

  if (post.status === 'draft') {
    if (!checkRole(['admin']) && post.postAuthorId.toString() !== customReq.user?._id.toString()) {
      throw makeError(403, "Operation not allowed");
    }
  }
  
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

// @desc publish a published post from a draft
// @route PATCH /posts/:id/edit
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

  let slug = post.slug;
  if (title && post.title !== title)
    slug = makeSlug(title);

  let updateddraftpost;

  //if there was a previous draft, updated it
  if (post.currentDraftId) {
    updateddraftpost = await DraftPostModel.findByIdAndUpdate(
      post.currentDraftId, 
      {
        $set: {
          title,
          slug,
          body,
          img,
          category,
          tags,
          lastEditedAt: new Date(),
          publishedPostId: post._id
        }
      },
      { new: true }
    ); 
  } else { // if there was not any draft, create a new one
    updateddraftpost = new DraftPostModel({
      slug,
      postAuthorId: post.postAuthorId,
      title,
      body,
      img,
      category,
      tags,
      status: 'draft',
      lastEditedAt: new Date(),
      publishedPostId: post._id
    });

    updateddraftpost = await updateddraftpost.save();
    
    // link post with new draft
    post.currentDraftId = updateddraftpost._id;
    await post.save();
  }
  
  if (!updateddraftpost) throw makeError(404, "The draft couldn't be saved");

  res.json({ 
    success: true, 
    message: `The draft ${updateddraftpost._id} has been saved`,
    data: updateddraftpost
  });
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

  // delete all comments of the post
  
  await post.deleteOne();
  
  res.status(200).json({
    success: true,
    message: `The post with ID ${post._id} was deleted`,
    data: {
      id: postId
    }
  });
};

// RELATED TO COMMENTS OF A POST
// @desc Get all posts
// @route GET /posts/:id/comments
// @access Private User
export const getPostComments = async (req: Request, res: Response, next: NextFunction) => {
  const customRes = res as CustomResponse;
  const postId = req.params.id;

  const post = await PostModel.findById(postId).lean()

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
    }
  }

  return replyDeletedCount;
};
